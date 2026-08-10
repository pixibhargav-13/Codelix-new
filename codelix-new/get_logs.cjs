const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.text().includes('LAYOUT_DEBUG')) {
      console.log('PAGE LOG:', msg.text());
      process.exit(0);
    }
  });

  await page.goto('http://localhost:5173/faq-v2');
  
  setTimeout(() => {
    console.log("Timeout reached.");
    process.exit(1);
  }, 5000);
})();
