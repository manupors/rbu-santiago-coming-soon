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

  throw new Error(`Mapa del recorrido ${key} no disponible por ahora.`);
}
