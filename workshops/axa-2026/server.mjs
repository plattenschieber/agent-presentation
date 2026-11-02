import { createServer } from 'node:http';
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { courses } from './catalog.mjs';
import { codingLab } from './labs/coding.mjs';
import { contextLab } from './labs/context.mjs';
import { reviewerLab } from './labs/reviewer.mjs';
import { crashLab } from './labs/crash.mjs';
import { improvementLab } from './labs/improve.mjs';

export async function startServer({ port = 4173, data = resolve('runs'), live = false } = {}) {
  await mkdir(data, { recursive: true });
  const server = createServer(async (req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(body));
    };
    try {
      const address = `http://127.0.0.1:${server.address().port}`;
      if (![new URL(address).host, `localhost:${server.address().port}`].includes(req.headers.host)) return send(403, { error: 'Local requests only' });
      if (req.method === 'POST' && req.headers.origin && ![address, address.replace('127.0.0.1','localhost')].includes(req.headers.origin)) return send(403, { error: 'Origin rejected' });
      if (req.method === 'GET' && ['/', '/app.js', '/style.css'].includes(req.url)) {
        const file = req.url === '/' ? 'index.html' : req.url.slice(1);
        res.writeHead(200, { 'Content-Type': { 'index.html':'text/html', 'app.js':'text/javascript', 'style.css':'text/css' }[file],
          'Content-Security-Policy': "default-src 'self'; object-src 'none'; frame-ancestors 'none'" });
        return res.end(await readFile(new URL(`./web/${file}`, import.meta.url)));
      }
      if (req.method === 'GET' && req.url === '/api/courses') return send(200, { courses, live });
      if (req.method === 'GET' && req.url === '/api/runs') {
        const records = [];
        for (const id of await readdir(data)) {
          try { records.push(JSON.parse(await readFile(join(data,id,'result.json'),'utf8'))); } catch { /* incomplete run */ }
        }
        return send(200, records);
      }
      if (req.method !== 'POST') return send(404, { error: 'Not found' });
      if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'Use JSON' });
      let body = '';
      for await (const chunk of req) { body += chunk; if (body.length > 16000) return send(413, { error: 'Request too large' }); }
      const input = JSON.parse(body);
      if (req.url === '/api/review') {
        if (!/^[0-9a-f-]{36}$/.test(input.id) || !['pass','fail','defer'].includes(input.verdict) || typeof input.notes !== 'string') return send(400, { error: 'Invalid review' });
        const path = join(data,input.id,'result.json');
        const result = JSON.parse(await readFile(path,'utf8'));
        result.review = { verdict: input.verdict, notes: input.notes, at: new Date().toISOString() };
        await writeFile(path,JSON.stringify(result,null,2));
        return send(200, result.review);
      }
      if (req.url !== '/api/run' || !courses.some(course => course.id === input.lab)) return send(400, { error: 'Unknown lab' });
      const threshold = input.threshold ?? 0.8;
      const variant = input.variant ?? 'baseline';
      if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1 || !['baseline','candidate'].includes(variant)) return send(400, { error: 'Invalid parameters' });
      const id = randomUUID();
      const directory = join(data,id);
      await mkdir(directory);
      const runners = { coding: () => codingLab(directory), context: contextLab,
        reviewer: () => reviewerLab(threshold, live), crash: () => crashLab(directory),
        improve: () => improvementLab(directory,variant,live) };
      const result = { id, lab: input.lab, at: new Date().toISOString(), ...await runners[input.lab]() };
      await writeFile(join(directory,'result.json'),JSON.stringify(result,null,2));
      send(200,result);
    } catch (error) { send(500, { error: error.message }); }
  });
  await new Promise(resolve => server.listen(port,'127.0.0.1',resolve));
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await startServer({ port: Number(process.env.PORT || 4173), data: resolve(process.env.WORKSHOP_DATA || 'runs'), live: process.argv.includes('--live') });
  console.log(`Workshop: http://127.0.0.1:${server.address().port}`);
}
