import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });

// Escritorio: carga del laboratorio y firma de "Sobre mí"
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
await page.waitForTimeout(7000);

await page.evaluate(() => {
  const el = document.getElementById("laboratorio");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
});
await page.waitForTimeout(600);
await page.screenshot({ path: ".tmp/qa/lab-cargando.png" });
await page.waitForTimeout(4000);
await page.screenshot({ path: ".tmp/qa/lab-listo.png" });

await page.evaluate(() => {
  const el = document.getElementById("sobre-mi");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - 900);
});
await page.waitForTimeout(1500);
await page.screenshot({ path: ".tmp/qa/about-final.png" });

const sig = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img[alt*="Firma"]')];
  return imgs.map((i) => {
    const r = i.getBoundingClientRect();
    return { alt: i.alt, w: Math.round(r.width), h: Math.round(r.height), nat: i.naturalWidth, top: Math.round(r.top) };
  });
});
console.log("firmas:", JSON.stringify(sig));
console.log("errores:", JSON.stringify(errors));
await page.close();
await browser.close();
