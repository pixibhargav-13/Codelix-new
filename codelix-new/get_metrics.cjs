const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/faq-v2');
  await page.waitForSelector('.sd2-hero-title');
  
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector('.sd2-hero');
    const title = document.querySelector('.sd2-hero-title');
    const titleLine = document.querySelector('.sd2-hero-title .line > span');
    
    return {
      heroPad: getComputedStyle(hero).paddingLeft,
      titleLeft: title.getBoundingClientRect().left,
      titleLineLeft: titleLine.getBoundingClientRect().left,
      titleLineText: titleLine.textContent
    };
  });
  
  console.log("METRICS:", JSON.stringify(metrics));
  process.exit(0);
})();
