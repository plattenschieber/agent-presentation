import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startServer } from '../server.mjs';

await mkdir('.local',{recursive:true});
await mkdir('evidence',{recursive:true});
const server = await startServer({ port:0,data:await mkdtemp(resolve('.local/browser-')) });
const browser = await chromium.launch({ headless:true,args:['--no-sandbox'],
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {}) });
const page = await browser.newPage({ viewport:{width:1280,height:1000} });
const errors = [];
page.on('pageerror',error => errors.push(error.message));
const results = [];
try {
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.locator('#courses button').first().waitFor();
  for (const [index,id] of ['coding','context','reviewer','crash','improve'].entries()) {
    await page.locator('#courses button').nth(index).click();
    await page.locator('#run').click();
    await page.getByText('Run saved. Inspect the result and leave an observation.').waitFor({timeout:30000});
    assert.ok(await page.locator('#result .checks li').count());
    if (id === 'reviewer') {
      await page.getByRole('button',{name:'Reveal reference labels and reviewer decisions'}).click();
      assert.equal(await page.locator('.reference:visible').count(),6);
    }
    if (id === 'improve') {
      assert.equal(await page.locator('#result .checks li.fail').count(),2);
      await page.locator('#notes').fill('Zero was excluded from the denominator.');
      await page.locator('#verdict').selectOption('fail');
      await page.getByRole('button',{name:'Save review',exact:true}).click();
      await page.getByText('Saved',{exact:true}).waitFor();
      await page.locator('#variant').selectOption('candidate');
      await page.locator('#run').click();
      await page.getByText('Run saved. Inspect the result and leave an observation.').waitFor();
      assert.equal(await page.locator('#result .checks li.fail').count(),0);
    }
    await page.screenshot({path:`evidence/${id}.png`,fullPage:true});
    results.push({lab:id,status:'passed'});
  }
  await page.reload();
  await page.getByText('Reviewed: fail',{exact:true}).waitFor();
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({path:'evidence/mobile.png',fullPage:true});
  assert.deepEqual(errors,[]);
  await writeFile('evidence/browser.json',JSON.stringify({at:new Date().toISOString(),browser:await browser.version(),results,reviewSurvivesReload:true,mobileOverflow:false,errors},null,2));
  console.log('Browser E2E passed: five labs, saved review, reload, mobile layout, no page errors.');
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
