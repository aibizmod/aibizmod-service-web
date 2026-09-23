const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function htmlToImage() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
    });

    // Convert Meta Ad (1080x1080)
    console.log('Converting Meta Ad (1080x1080)...');
    const metaPage = await browser.newPage();
    await metaPage.setViewport({ width: 1080, height: 1080 });
    
    const metaPath = path.join(__dirname, 'public/ad-designs/meta-ad-1080x1080.html');
    const metaFileUrl = `file://${metaPath.replace(/\\/g, '/')}`;
    
    await metaPage.goto(metaFileUrl, { waitUntil: 'networkidle2' });
    await metaPage.screenshot({
      path: path.join(__dirname, 'public/ad-designs/meta-ad-1080x1080.jpg'),
      type: 'jpeg',
      quality: 95
    });
    console.log('✓ Meta Ad saved: public/ad-designs/meta-ad-1080x1080.jpg');
    await metaPage.close();

    // Convert LinkedIn Ad (1200x627)
    console.log('Converting LinkedIn Ad (1200x627)...');
    const linkedinPage = await browser.newPage();
    await linkedinPage.setViewport({ width: 1200, height: 627 });
    
    const linkedinPath = path.join(__dirname, 'public/ad-designs/linkedin-ad-1200x627.html');
    const linkedinFileUrl = `file://${linkedinPath.replace(/\\/g, '/')}`;
    
    await linkedinPage.goto(linkedinFileUrl, { waitUntil: 'networkidle2' });
    await linkedinPage.screenshot({
      path: path.join(__dirname, 'public/ad-designs/linkedin-ad-1200x627.jpg'),
      type: 'jpeg',
      quality: 95
    });
    console.log('✓ LinkedIn Ad saved: public/ad-designs/linkedin-ad-1200x627.jpg');
    await linkedinPage.close();

    console.log('\n✅ All images converted successfully!');
    
  } catch (error) {
    console.error('Error converting HTML to image:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

htmlToImage();
