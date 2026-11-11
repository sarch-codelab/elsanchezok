import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
for (const w of [700, 800, 900, 1000, 1200]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  const warns = [];
  page.on("console", (m) => { if (m.type() === "warning") warns.push(m.text().slice(0, 130)); });
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.waitForTimeout(4000);
  const used = await page.evaluate(() => document.querySelector('img[alt^="Retrato"]')?.currentSrc.split("w=")[1]);
  console.log(w, "usada:", used, "warns:", JSON.stringify(warns));
  await page.close();
}
await browser.close();
