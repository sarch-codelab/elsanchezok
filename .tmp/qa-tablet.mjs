import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
await page.waitForTimeout(7000);
for (const id of ["sobre-mi", "laboratorio", "contacto"]) {
  await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
  }, id);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `.tmp/qa/t-${id}.png` });
}
console.log("overflow:", await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth));
console.log("errores:", JSON.stringify(errors));
await browser.close();
