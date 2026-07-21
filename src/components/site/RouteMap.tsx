import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRouteShape, type RouteShape } from "@/lib/recorridos.functions";
import type {} from "google.maps";

declare global {
  interface Window {
    google?: typeof google;
    __rbuInitMap?: () => void;
    __rbuMapsPromise?: Promise<void>;
  }
}

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve();
  if (window.__rbuMapsPromise) return window.__rbuMapsPromise;
  window.__rbuMapsPromise = new Promise<void>((resolve, reject) => {
    if (!BROWSER_KEY) {
      reject(new Error("Google Maps API key not configured"));
      return;
    }
    window.__rbuInitMap = () => resolve();
    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      loading: "async",
      callback: "__rbuInitMap",
      libraries: "maps",
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return window.__rbuMapsPromise;
}

interface Props {
  code: string | null;
}

export function RouteMap({ code }: Props) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const overlaysRef = useRef<Array<google.maps.Polyline | google.maps.Marker>>([]);
  const fetchShape = useServerFn(getRouteShape);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Initialize the map once.
  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapDivRef.current || mapRef.current) return;
        mapRef.current = new window.google!.maps.Map(mapDivRef.current, {
          center: { lat: -33.42, lng: -70.6 },
          zoom: 11,
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        });
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setStatus("error");
          setErrorMsg(err.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Draw shape when code changes.
  useEffect(() => {
    let cancelled = false;
    const clearOverlays = () => {
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
    };

    if (!code) {
      clearOverlays();
      if (mapRef.current) {
        mapRef.current.setCenter({ lat: -33.42, lng: -70.6 });
        mapRef.current.setZoom(11);
      }
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    (async () => {
      try {
        await loadGoogleMaps();
        const shape: RouteShape = await fetchShape({ data: { code } });
        if (cancelled || !mapRef.current || !window.google) return;

        clearOverlays();
        const g = window.google.maps;
        const bounds = new g.LatLngBounds();

        const drawDir = (
          dir: RouteShape["ida"],
          color: string,
          label: string,
        ) => {
          if (!dir) return;
          const path = dir.path.map(([lat, lng]) => ({ lat, lng }));
          const poly = new g.Polyline({
            path,
            geodesic: false,
            strokeColor: color,
            strokeOpacity: 0.9,
            strokeWeight: 5,
            map: mapRef.current!,
          });
          overlaysRef.current.push(poly);
          path.forEach((p) => bounds.extend(p));

          if (path.length > 0) {
            const start = path[0];
            const end = path[path.length - 1];
            const startMarker = new g.Marker({
              position: start,
              map: mapRef.current!,
              title: `${label} — Inicio`,
              label: { text: "A", color: "#ffffff", fontWeight: "700" },
            });
            const endMarker = new g.Marker({
              position: end,
              map: mapRef.current!,
              title: `${label} — ${dir.destino || "Fin"}`,
              label: { text: "B", color: "#ffffff", fontWeight: "700" },
            });
            overlaysRef.current.push(startMarker, endMarker);
          }
        };

        drawDir(shape.ida, "#0047BA", "Ida");
        drawDir(shape.regreso, "#F42534", "Regreso");

        if (!bounds.isEmpty()) {
          mapRef.current.fitBounds(bounds, 40);
        }
        setStatus("idle");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Error cargando recorrido");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, fetchShape]);

  return (
    <div className="relative">
      <div ref={mapDivRef} className="h-[480px] w-full bg-[color:var(--muted)]" />
      {status === "loading" && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
          Cargando recorrido…
        </div>
      )}
      {status === "error" && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground shadow-lg">
          {errorMsg || "Error cargando el mapa"}
        </div>
      )}
      {code && status === "idle" && (
        <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-1 rounded-lg bg-white/95 px-3 py-2 text-xs shadow-md">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-6 rounded" style={{ background: "#0047BA" }} />
            Ida
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-6 rounded" style={{ background: "#F42534" }} />
            Regreso
          </span>
        </div>
      )}
    </div>
  );
}
