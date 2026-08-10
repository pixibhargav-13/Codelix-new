const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:5173/faq-v2', { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: 'c:/Websites/Codelix_new/screenshot_mobile.png', fullPage: true });
  
  console.log("Screenshot saved.");
  await browser.close();
})();
