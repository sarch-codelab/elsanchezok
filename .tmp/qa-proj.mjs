import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });
await page.waitForTimeout(7000);
await page.evaluate(() => {
  const el = document.getElementById("proyectos");
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64);
});
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /NEXO/i }).first().click().catch(async () => {
  await page.locator("#proyectos").getByText("NEXO").first().click();
});
await page.waitForTimeout(900);
await page.screenshot({ path: ".tmp/qa/m-proyecto-abierto.png" });
const state = await page.evaluate(() => {
  const p = document.getElementById("proyectos");
  return { expanded: p.innerText.includes("Sistema de gestión escolar") && p.innerText.length > 800, textLen: p.innerText.length };
});
console.log("proyecto:", JSON.stringify(state));
console.log("errores:", JSON.stringify(errors));
await browser.close();
