import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Layer, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getRouteShape, type RouteShape } from "@/lib/recorridos";

interface Props {
  code: string | null;
}

const DEFAULT_CENTER: [number, number] = [-33.45, -70.66];
const DEFAULT_ZOOM = 11;

function makeDivIcon(L: typeof import("leaflet"), text: string, color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};color:#fff;font-weight:700;font-size:12px;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25);">${text}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

export function RouteMap({ code }: Props) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);
  const overlaysRef = useRef<Layer[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Initialize the map once (client-only).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapDivRef.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(mapDivRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: true,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;
    })().catch((err: Error) => {
      if (!cancelled) {
        setStatus("error");
        setErrorMsg(err.message);
      }
    });
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Draw shape when code changes.
  useEffect(() => {
    let cancelled = false;
    const clearOverlays = () => {
      const map = mapRef.current;
      if (!map) return;
      overlaysRef.current.forEach((o) => map.removeLayer(o));
      overlaysRef.current = [];
    };

    if (!code) {
      clearOverlays();
      if (mapRef.current) {
        mapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      }
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    (async () => {
      try {
        // Ensure Leaflet is ready.
        const L = LRef.current ?? (await import("leaflet")).default;
        LRef.current = L;

        const shape: RouteShape = await getRouteShape(code);
        if (cancelled || !mapRef.current) return;

        clearOverlays();
        const map = mapRef.current;
        const allPoints: [number, number][] = [];

        const drawDir = (
          dir: RouteShape["ida"],
          color: string,
          label: string,
        ) => {
          if (!dir) return;
          const path: [number, number][] = dir.path.map(([lat, lng]) => [lat, lng]);
          if (path.length === 0) return;
          const poly = L.polyline(path, {
            color,
            weight: 5,
            opacity: 0.9,
          }).addTo(map);
          overlaysRef.current.push(poly);
          allPoints.push(...path);

          const start = path[0];
          const end = path[path.length - 1];
          const startMarker = L.marker(start, {
            icon: makeDivIcon(L, "A", color),
            title: `${label} — Inicio`,
          }).addTo(map);
          const endMarker = L.marker(end, {
            icon: makeDivIcon(L, "B", color),
            title: `${label} — ${dir.destino || "Fin"}`,
          }).addTo(map);
          overlaysRef.current.push(startMarker, endMarker);
        };

        drawDir(shape.ida, "#0047BA", "Ida");
        drawDir(shape.regreso, "#F42534", "Regreso");

        if (allPoints.length > 0) {
          const bounds: LatLngBoundsExpression = allPoints;
          map.fitBounds(bounds, { padding: [30, 30] });
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
  }, [code]);

  return (
    <div className="relative">
      <div ref={mapDivRef} className="h-[480px] w-full bg-[color:var(--muted)]" />
      {status === "loading" && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-[1000] -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
          Cargando recorrido…
        </div>
      )}
      {status === "error" && (
        <div className="absolute left-1/2 top-4 z-[1000] -translate-x-1/2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground shadow-lg">
          {errorMsg || "Error cargando el mapa"}
        </div>
      )}
      {code && status === "idle" && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] flex flex-col gap-1 rounded-lg bg-white/95 px-3 py-2 text-xs shadow-md">
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
