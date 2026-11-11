import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const warns = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text().slice(0, 160));
  if (m.type() === "warning") warns.push(m.text().slice(0, 160));
});
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 160)));
await page.goto("http://localhost:3000", { waitUntil: "commit" });
await page.waitForTimeout(7000);
await page.evaluate(() => {
  const lab = document.getElementById("laboratorio");
  window.scrollTo(0, lab.getBoundingClientRect().top + window.scrollY - 100);
});
await page.waitForTimeout(5000);
console.log("canvas:", await page.evaluate(() => {
  const c = document.querySelector("#laboratorio canvas");
  return c ? { w: c.clientWidth, h: c.clientHeight } : null;
}));
console.log("badge:", await page.evaluate(() => document.getElementById("laboratorio").innerText.match(/ESTÁTICO|EN VIVO|CARGANDO/)?.[0]));
// ir y volver a la sección para comprobar que no se reinicia mal
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.evaluate(() => {
  const lab = document.getElementById("laboratorio");
  window.scrollTo(0, lab.getBoundingClientRect().top + window.scrollY - 100);
});
await page.waitForTimeout(1500);
console.log("canvas tras volver:", await page.evaluate(() => !!document.querySelector("#laboratorio canvas")));
console.log("errores:", JSON.stringify(errors));
console.log("warnings:", JSON.stringify(warns));
await browser.close();
