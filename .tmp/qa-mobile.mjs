import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
const warnings = [];
const failed = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text().slice(0, 200));
  if (m.type() === "warning") warnings.push(m.text().slice(0, 200));
});
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
page.on("requestfailed", (r) => failed.push(r.url().slice(0, 100)));

await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
await page.waitForFunction(() => {
  const img = document.querySelector('img[alt="Firma de Joseph"]');
  return img && Number(getComputedStyle(img.parentElement).opacity) > 0.99;
}, { timeout: 25000 }).catch(() => {});
await page.screenshot({ path: ".tmp/qa/m-load.png" });
await page.waitForFunction(() => !document.querySelector('img[alt="Firma de Joseph"]'), { timeout: 20000 });
await page.waitForTimeout(2200);
await page.screenshot({ path: ".tmp/qa/m-hero.png" });

const sections = ["sobre-mi", "stack", "proyectos", "trayectoria", "laboratorio", "contacto"];
for (const id of sections) {
  await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64);
  }, id);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `.tmp/qa/m-${id}.png` });
}

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);

// Menú móvil
await page.getByRole("button", { name: /menú|menu/i }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: ".tmp/qa/m-menu.png" });
const menuState = await page.evaluate(() => ({
  open: !!document.querySelector('[aria-expanded="true"]'),
  scrollY: Math.round(window.scrollY),
  bodyOverflow: getComputedStyle(document.body).overflow,
}));

await page.getByRole("button", { name: /Cerrar/i }).click();
await page.waitForTimeout(700);

// Menú a una sección
await page.getByRole("button", { name: /menú|menu/i }).click();
await page.waitForTimeout(700);
await page.getByRole("link", { name: /Proyectos/i }).first().click();
await page.waitForTimeout(1600);
await page.screenshot({ path: ".tmp/qa/m-after-nav.png" });
const navState = await page.evaluate(() => {
  const el = document.getElementById("proyectos");
  return { top: Math.round(el.getBoundingClientRect().top), scrollY: Math.round(window.scrollY), menuOpen: !!document.querySelector('[aria-expanded="true"]') };
});

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({ path: ".tmp/qa/m-footer.png" });

const facts = await page.evaluate(() => ({
  overflowX: document.documentElement.scrollWidth > window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  broken: [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).length,
}));

console.log("menu:", JSON.stringify(menuState));
console.log("nav:", JSON.stringify(navState));
console.log("facts:", JSON.stringify(facts));
console.log("errores:", JSON.stringify(errors));
console.log("warnings:", JSON.stringify(warnings));
console.log("red:", JSON.stringify(failed));
await browser.close();
