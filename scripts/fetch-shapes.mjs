#!/usr/bin/env node
// Descarga los shapes desde una fuente GTFS pública y los guarda
// en src/data/route-shapes.json:
//   node scripts/fetch-shapes.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/route-shapes.json");

const unidad6 = [
  "401c","402","403","404","404c","412","414e","415e","418","421",
  "422c","425","428","428e","429","429C","430","430y","435","486",
];
const unidad4 = [
  "B05","B06","B11","B12","B12C","B15","B21","B22","B27","B31N",
  "C02c","C03","C03c","C05","C06","C06c","C07","C09","C10e","C11",
  "C13","C14","C15","C16","C17","C19","C20","C22","C27","C28","C37","C37y",
];
const codes = [...unidad6, ...unidad4];

const SOURCE = "https://raw.githubusercontent.com/benjamintaito/red-santiago-routes/master/public/data/routes.json";

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`No se pudo descargar la fuente GTFS (HTTP ${res.status})`);
const data = await res.json();
const byCode = new Map(
  (data.routes ?? [])
    .filter((route) => route.shortName && Array.isArray(route.coordinates) && route.coordinates.length > 0)
    .map((route) => [String(route.shortName).toUpperCase(), route]),
);

const out = {};
for (const code of codes) {
  const key = code.toUpperCase();
  const route = byCode.get(key);
  if (!route) {
    console.log(`→ ${key} ... sin shape`);
    continue;
  }
  out[key] = {
    color: "#F42534",
    ida: {
      destino: route.longName ?? key,
      path: route.coordinates.map(([lat, lng]) => [Number(lat.toFixed(6)), Number(lng.toFixed(6))]),
    },
    regreso: null,
  };
  console.log(`→ ${key} ... ok`);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 0));
console.log(`\nGuardado ${Object.keys(out).length} recorridos en ${OUT}`);
