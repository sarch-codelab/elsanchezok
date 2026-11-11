import { chromium } from "playwright";

// 1) WebGL desactivado: reproduce el entorno del panel.
const noGl = await chromium.launch({
  args: ["--disable-gpu", "--disable-webgl", "--disable-webgl2", "--disable-software-rasterizer"],
});
const p1 = await noGl.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
p1.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
p1.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
await p1.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
await p1.waitForTimeout(6000);
await p1.evaluate(() => document.getElementById("laboratorio")?.scrollIntoView());
await p1.waitForTimeout(2500);
console.log("sin WebGL → errores:", JSON.stringify(errors));
console.log("canvas creado:", await p1.evaluate(() => !!document.querySelector("#laboratorio canvas")));
console.log("texto fallback:", await p1.evaluate(() => document.querySelector("#laboratorio")?.innerText.includes("Vista estática")));
console.log("badge:", await p1.evaluate(() => document.querySelector("#laboratorio")?.innerText.match(/Estático|En vivo|Cargando/)?.[0]));
await p1.screenshot({ path: ".tmp/shots/lab-sin-webgl.png" });
await noGl.close();

// 2) WebGL disponible: la escultura real sigue montando.
const gl = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const p2 = await gl.newPage({ viewport: { width: 1280, height: 900 } });
await p2.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
await p2.waitForTimeout(6000);
await p2.evaluate(() => document.getElementById("laboratorio")?.scrollIntoView());
await p2.waitForTimeout(4000);
console.log("con WebGL → canvas:", await p2.evaluate(() => {
  const c = document.querySelector("#laboratorio canvas");
  return c ? { w: c.clientWidth, h: c.clientHeight } : null;
}));
console.log("badge:", await p2.evaluate(() => document.querySelector("#laboratorio")?.innerText.match(/Estático|En vivo|Cargando/)?.[0]));
await gl.close();
