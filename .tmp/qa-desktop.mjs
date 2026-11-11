import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
const warnings = [];
const failed = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text().slice(0, 220));
  if (m.type() === "warning") warnings.push(m.text().slice(0, 220));
});
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 220)));
page.on("requestfailed", (r) => failed.push(r.url().slice(0, 120) + " " + r.failure()?.errorText));
page.on("response", (r) => {
  if (r.status() >= 400) failed.push(r.status() + " " + r.url().slice(0, 120));
});

await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });

// Preloader en su punto álgido
await page.waitForFunction(() => {
  const img = document.querySelector('img[alt="Firma de Joseph"]');
  return img && Number(getComputedStyle(img.parentElement).opacity) > 0.99;
}, { timeout: 25000 });
await page.screenshot({ path: ".tmp/qa/load-1440.png" });

// Esperar a que termine y quede el hero
await page.waitForFunction(() => !document.querySelector('img[alt="Firma de Joseph"]'), { timeout: 20000 });
await page.waitForTimeout(2200);
await page.screenshot({ path: ".tmp/qa/hero-1440.png" });

const sections = ["sobre-mi", "stack", "proyectos", "trayectoria", "laboratorio", "contacto"];
for (const id of sections) {
  await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
  }, id);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `.tmp/qa/${id}-1440.png` });
}

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({ path: ".tmp/qa/footer-1440.png" });

const facts = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll("img")];
  return {
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    images: imgs.map((i) => ({ alt: i.alt.slice(0, 18), nat: i.naturalWidth })).slice(0, 12),
    canvas: !!document.querySelector("#laboratorio canvas"),
    badge: document.getElementById("laboratorio")?.innerText.match(/ESTÁTICO|EN VIVO|CARGANDO/)?.[0],
    links: [...document.querySelectorAll('a[href^="http"]')].map((a) => a.href).slice(0, 8),
  };
});

console.log(JSON.stringify(facts, null, 1));
console.log("ERRORES:", JSON.stringify(errors, null, 1));
console.log("WARNINGS:", JSON.stringify(warnings, null, 1));
console.log("FALLOS DE RED:", JSON.stringify(failed, null, 1));

await browser.close();
