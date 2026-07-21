// Client-side fetch de shapes desde red.cl. Se ejecuta en el navegador del
// usuario, así que la IP es chilena y evita el bloqueo geográfico.
import shapes from "@/data/route-shapes.json";

export interface RouteDirection {
  destino: string;
  path: [number, number][];
}

export interface RouteShape {
  color: string;
  ida: RouteDirection | null;
  regreso: RouteDirection | null;
}

type ShapesMap = Record<string, RouteShape>;

const pick = (d: { destino?: string; path?: [number, number][] } | null | undefined): RouteDirection | null =>
  d && Array.isArray(d.path) && d.path.length > 0
    ? { destino: d.destino ?? "", path: d.path }
    : null;

const cache = new Map<string, RouteShape>();

export async function getRouteShape(code: string): Promise<RouteShape> {
  const key = code.toUpperCase();
  if (cache.has(key)) return cache.get(key)!;

  const local = (shapes as ShapesMap)[key];
  if (local) {
    cache.set(key, local);
    return local;
  }

  const url = `https://www.red.cl/restservice_v2/rest/conocerecorrido?codsint=${encodeURIComponent(code)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json, text/plain, */*" },
  });
  if (!res.ok) throw new Error(`No se pudo obtener el recorrido (HTTP ${res.status}).`);
  const j = await res.json();
  const shape: RouteShape = {
    color: j?.negocio?.color ?? "#F42534",
    ida: pick(j?.ida),
    regreso: pick(j?.regreso),
  };
  if (!shape.ida && !shape.regreso) {
    throw new Error(`Recorrido ${key} no encontrado.`);
  }
  cache.set(key, shape);
  return shape;
}
