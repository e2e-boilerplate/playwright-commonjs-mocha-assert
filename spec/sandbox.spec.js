const { chromium } = require("playwright");
const { strictEqual } = require("assert");

let page;
let browser;

describe("Sandbox", () => {
  before(async function fn() {
    this.timeout(20000);
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });

    const context = await browser.newContext();
    page = await context.newPage();

    await page
      .goto("https://e2e-boilerplates.github.io/sandbox/", {
        waitUntil: "networkidle0"
      })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on the sandbox", async () => {
    await page.waitFor("h1");
    const title = await page.$eval("h1", el => el.textContent);

    strictEqual(await page.title(), "Sandbox");
    strictEqual(title, "Sandbox");
  });
});
