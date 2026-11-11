import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });

for (const [name, width, height] of [["load-1440", 1440, 900], ["load-390", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 120)));
  await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
  await page.waitForFunction(() => {
    const img = document.querySelector('img[alt="Firma de Joseph"]');
    return img && Number(getComputedStyle(img.parentElement).opacity) > 0.99;
  }, { timeout: 20000 });
  await page.screenshot({ path: `.tmp/shots/${name}.png` });
  console.log(name, "captured; errores:", JSON.stringify(errors));
  await page.close();
}
await browser.close();
