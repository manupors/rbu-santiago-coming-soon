import { createServerFn } from "@tanstack/react-start";

export interface RouteDirection {
  destino: string;
  path: [number, number][];
}

export interface RouteShape {
  color: string;
  ida: RouteDirection | null;
  regreso: RouteDirection | null;
}

export const getRouteShape = createServerFn({ method: "GET" })
  .inputValidator((data: { code: string }) => {
    if (!data?.code || !/^[A-Za-z0-9]{2,6}$/.test(data.code)) {
      throw new Error("Invalid route code");
    }
    return { code: data.code.toUpperCase() };
  })
  .handler(async ({ data }): Promise<RouteShape> => {
    const url = `https://www.red.cl/restservice_v2/rest/conocerecorrido?codsint=${encodeURIComponent(data.code)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      throw new Error(`Recorrido no disponible (${res.status})`);
    }
    const json = (await res.json()) as {
      negocio?: { color?: string };
      ida?: { destino?: string; path?: [number, number][] };
      regreso?: { destino?: string; path?: [number, number][] };
    };
    const pick = (d: { destino?: string; path?: [number, number][] } | undefined): RouteDirection | null => {
      if (!d?.path || d.path.length === 0) return null;
      return { destino: d.destino ?? "", path: d.path };
    };
    return {
      color: json.negocio?.color ?? "#F42534",
      ida: pick(json.ida),
      regreso: pick(json.regreso),
    };
  });
