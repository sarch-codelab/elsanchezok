import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
await page.waitForTimeout(7000);
await page.evaluate(() => {
  const el = document.getElementById("sobre-mi");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - 900);
});
await page.waitForTimeout(2500);
const probe = await page.evaluate(() => {
  const pts = [[1120, 416], [1160, 474], [1200, 300]];
  return pts.map(([x, y]) => ({
    pt: [x, y],
    els: document.elementsFromPoint(x, y).slice(0, 4).map((e) => e.tagName + "." + String(e.className).slice(0, 70)),
  }));
});
console.log(JSON.stringify(probe, null, 1));
await page.screenshot({ path: ".tmp/qa/about-probe.png" });
await browser.close();
