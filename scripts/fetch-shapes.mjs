#!/usr/bin/env node
// Descarga los shapes de todos los recorridos desde red.cl y los guarda
// en src/data/route-shapes.json. Ejecutar desde una IP chilena:
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

const pick = (d) => (d?.path?.length ? { destino: d.destino ?? "", path: d.path } : null);

async function fetchOne(code) {
  const url = `https://www.red.cl/restservice_v2/rest/conocerecorrido?codsint=${encodeURIComponent(code)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0 rbu-shapes-fetcher",
      Referer: "https://www.red.cl/planifica-tu-viaje/cuando-llega/",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const j = await res.json();
  return {
    color: j?.negocio?.color ?? "#F42534",
    ida: pick(j?.ida),
    regreso: pick(j?.regreso),
  };
}

const out = {};
for (const code of codes) {
  const key = code.toUpperCase();
  try {
    process.stdout.write(`→ ${key} ... `);
    out[key] = await fetchOne(code);
    console.log("ok");
  } catch (e) {
    console.log(`FAIL (${e.message})`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 0));
console.log(`\nGuardado ${Object.keys(out).length} recorridos en ${OUT}`);
