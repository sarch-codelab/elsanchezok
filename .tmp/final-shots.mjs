import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "commit" });
await page.waitForFunction(() => {
  const img = document.querySelector('img[alt="Firma de Joseph"]');
  return img && Number(getComputedStyle(img.parentElement).opacity) > 0.99;
}, { timeout: 25000 });
await page.screenshot({ path: ".tmp/qa/final-carga.png" });
await page.waitForFunction(() => !document.querySelector('img[alt="Firma de Joseph"]'), { timeout: 20000 });
await page.waitForTimeout(2000);
await page.evaluate(() => {
  const lab = document.getElementById("laboratorio");
  window.scrollTo(0, lab.getBoundingClientRect().top + window.scrollY - 80);
});
await page.waitForTimeout(5000);
await page.screenshot({ path: ".tmp/qa/final-lab.png" });
await browser.close();
