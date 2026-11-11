import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });

for (const [name, width, height] of [["pre-1440", 1440, 900], ["pre-390", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(650);
  await page.screenshot({ path: `.tmp/shots/${name}.png` });
  const info = await page.evaluate(() => {
    const img = document.querySelector('.fixed.inset-0 img[alt="Firma de Joseph"]');
    if (!img) return null;
    const r = img.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), src: img.currentSrc.split("?")[1] };
  });
  console.log(name, JSON.stringify(info), "errors:", errors.length);
  await page.waitForTimeout(4200);
  console.log(name, "preloader gone:", await page.evaluate(() => !document.querySelector('.fixed.inset-0 img[alt="Firma de Joseph"]')));
  await page.close();
}

await browser.close();
