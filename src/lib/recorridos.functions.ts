import { createServerFn } from "@tanstack/react-start";
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

export const getRouteShape = createServerFn({ method: "GET" })
  .inputValidator((data: { code: string }) => {
    if (!data?.code || !/^[A-Za-z0-9]{2,6}$/.test(data.code)) {
      throw new Error("Invalid route code");
    }
    return { code: data.code.toUpperCase() };
  })
  .handler(async ({ data }): Promise<RouteShape> => {
    const map = shapes as ShapesMap;
    const found = map[data.code];
    if (!found) {
      throw new Error(
        `Recorrido ${data.code} aún no está disponible localmente. Ejecuta "node scripts/fetch-shapes.mjs" desde una conexión en Chile para descargar los trazados.`,
      );
    }
    return found;
  });
