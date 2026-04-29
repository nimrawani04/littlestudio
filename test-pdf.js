import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE UNHANDLED ERROR:', err.toString());
  });

  await page.goto('http://localhost:8080/?mode=calendar', { waitUntil: 'networkidle2' });

  console.log('Clicking Download PDF button...');
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Download PDF'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  
  if (clicked) {
    console.log('Clicked. Waiting for logs...');
    await new Promise(r => setTimeout(r, 10000));
  } else {
    console.log('Button not found');
  }

  await browser.close();
})();
