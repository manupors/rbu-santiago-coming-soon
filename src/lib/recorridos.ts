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
type RawRouteDirection = { destino?: string; path?: number[][] } | null | undefined;
type RawRouteShape = { color?: string; ida?: RawRouteDirection; regreso?: RawRouteDirection };
type RawShapesMap = Record<string, RawRouteShape>;

const pick = (d: RawRouteDirection): RouteDirection | null => {
  if (!d || !Array.isArray(d.path) || d.path.length === 0) return null;
  const path: [number, number][] = d.path
    .filter((point): point is [number, number] =>
      Array.isArray(point) &&
      point.length >= 2 &&
      Number.isFinite(point[0]) &&
      Number.isFinite(point[1]),
    )
    .map(([lat, lng]) => [lat, lng]);

  return path.length > 0 ? { destino: d.destino ?? "", path } : null;
};

const normalizeShape = (raw: RawRouteShape): RouteShape | null => {
  const shape = {
    color: raw.color ?? "#F42534",
    ida: pick(raw.ida),
    regreso: pick(raw.regreso),
  };

  return shape.ida || shape.regreso ? shape : null;
};

const cache = new Map<string, RouteShape>();

export async function getRouteShape(code: string): Promise<RouteShape> {
  const key = code.toUpperCase();
  if (cache.has(key)) return cache.get(key)!;

  const local = normalizeShape((shapes as unknown as RawShapesMap)[key]);
  if (local) {
    cache.set(key, local);
    return local;
  }

  throw new Error(`Mapa del recorrido ${key} no disponible por ahora.`);
}
