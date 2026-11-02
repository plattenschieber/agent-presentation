import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('.local',{recursive:true});
await mkdir('evidence',{recursive:true});
await build({stdin:{contents:`import {restore,exportToSvg} from '@excalidraw/excalidraw';
window.checkScene = async data => {
  const restored = restore(data,null,null);
  const svg = await exportToSvg({elements:restored.elements,appState:restored.appState,files:{},exportPadding:20});
  document.body.replaceChildren(svg);
  return {elements:restored.elements.length,frames:restored.elements.filter(e=>e.type==='frame').length,svg:svg.outerHTML};
};`,resolveDir:process.cwd()},bundle:true,format:'iife',outfile:'.local/board-check.js',
  define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'});
const server=createServer(async(req,res)=>{
  if(req.url==='/app.js'){res.setHeader('Content-Type','text/javascript');return res.end(await readFile('.local/board-check.js'));}
  res.setHeader('Content-Type','text/html');res.end('<!doctype html><html><body><script src="/app.js"></script></body></html>');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,args:['--no-sandbox'],
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
try{
  const page=await browser.newPage({viewport:{width:1120,height:730}});
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>typeof window.checkScene==='function');
  const results=[];
  for(const file of (await readdir('course/boards')).filter(file=>file.endsWith('.excalidraw'))){
    const scene=JSON.parse(await readFile(`course/boards/${file}`,'utf8'));
    const result=await page.evaluate(data=>window.checkScene(data),scene);
    assert.equal(result.elements,scene.elements.length);
    assert.equal(result.frames,3);
    assert.ok(result.svg.includes('The model proposes. Tools act.'));
    await writeFile(`course/boards/${file.replace('.excalidraw','.svg')}`,result.svg);
    await page.evaluate(()=>{const svg=document.querySelector('svg');svg.setAttribute('viewBox','1180 0 1080 700');svg.setAttribute('width','1080');svg.setAttribute('height','700');});
    await page.screenshot({path:`evidence/${file.replace('.excalidraw','-board.png')}`});
    results.push({file,elements:result.elements,frames:result.frames,nativeRestoreAndExport:'passed'});
  }
  await writeFile('evidence/boards.json',JSON.stringify({at:new Date().toISOString(),results},null,2));
  console.log('All five boards restored and rendered through native Excalidraw.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
