import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000", { waitUntil: "commit" });

const samples = [];
for (let i = 0; i < 14; i++) {
  samples.push(
    await page.evaluate(() => {
      const el = document.querySelector('img[alt="Firma de Joseph"]');
      let pre = null;
      if (el) {
        let node = el;
        while (node && node !== document.body) {
          if (getComputedStyle(node).position === "fixed") {
            pre = node;
            break;
          }
          node = node.parentElement;
        }
      }
      return {
        t: Math.round(performance.now()),
        op: el ? getComputedStyle(el.parentElement).opacity : null,
        pre: !!pre,
        counter: pre ? pre.innerText.replace(/\s+/g, " ").slice(0, 40) : null,
      };
    }),
  );
  await page.waitForTimeout(150);
}

console.log(samples.map((s) => `${s.t}ms op=${s.op} pre=${s.pre} txt=${s.counter}`).join("\n"));
await page.screenshot({ path: ".tmp/shots/pre-timeline.png" });
await browser.close();
