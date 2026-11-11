import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--disable-gpu", "--disable-webgl", "--disable-software-rasterizer"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("console", (m) => console.log("[console]", m.type(), m.text().slice(0, 160)));
page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 160)));
await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(7000);
console.log(await page.evaluate(() => ({
  ids: [...document.querySelectorAll("section[id]")].map((s) => s.id),
  hasLab: !!document.getElementById("laboratorio"),
  labText: document.getElementById("laboratorio")?.innerText.slice(0, 120),
  scrollY: window.scrollY,
  docH: document.documentElement.scrollHeight,
})));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
await page.waitForTimeout(2500);
console.log(await page.evaluate(() => ({
  scrollY: window.scrollY,
  canvas: !!document.querySelector("#laboratorio canvas"),
  labText: document.getElementById("laboratorio")?.innerText.slice(0, 200),
})));
await page.screenshot({ path: ".tmp/shots/lab-debug.png", fullPage: false });
await browser.close();
