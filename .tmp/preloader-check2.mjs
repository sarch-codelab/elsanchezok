import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });

for (const [name, width, height] of [["pre2-1440", 1440, 900], ["pre2-390", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 160)));
  await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(950);
  await page.screenshot({ path: `.tmp/shots/${name}.png` });
  const info = await page.evaluate(() => {
    const el = document.querySelector('.fixed.inset-0 img[alt="Firma de Joseph"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), opacity: getComputedStyle(el.parentElement).opacity };
  });
  console.log(name, JSON.stringify(info), "errores:", JSON.stringify(errors));
  await page.close();
}

await browser.close();
