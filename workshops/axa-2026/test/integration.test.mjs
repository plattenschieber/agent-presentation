import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { startServer } from '../server.mjs';
import { openAgent } from '../agent.mjs';

test('Five exercises through HTTP, saved review, and reload', async () => {
  await mkdir('.local', { recursive: true });
  const data = await mkdtemp(resolve('.local/http-'));
  let server = await startServer({ port: 0, data });
  const request = async (path, body) => {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, body ? {
      method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(body),
    } : {});
    assert.equal(response.status,200);
    return response.json();
  };
  try {
    const { courses } = await request('/api/courses');
    assert.equal(courses.length,5);
    for (const course of courses) assert.equal(course.agenda.reduce((n,[minutes]) => n + minutes,0),120);
    for (const lab of ['coding','context','reviewer','crash']) {
      const result = await request('/api/run',{ lab });
      assert.ok(result.checks.every(check => check.pass),JSON.stringify(result));
      if (lab === 'reviewer') assert.deepEqual(result.holdout,{tp:1,tn:2,fp:0,fn:0});
    }
    const baseline = await request('/api/run',{ lab:'improve',variant:'baseline' });
    assert.ok(baseline.checks.every(check => !check.pass));
    const candidate = await request('/api/run',{ lab:'improve',variant:'candidate' });
    assert.ok(candidate.checks.every(check => check.pass));
    assert.ok(candidate.trace.some(entry => entry.kind === 'pi.tool-result'));
    await request('/api/review',{ id:baseline.id,verdict:'fail',notes:'Zero was dropped.' });
    assert.equal(JSON.parse(await readFile(join(data,baseline.id,'result.json'),'utf8')).review.notes,'Zero was dropped.');
    await new Promise(resolve => server.close(resolve));
    server = await startServer({ port:0,data });
    const history = await request('/api/runs');
    assert.equal(history.length,6);
    assert.equal(history.find(run => run.id === baseline.id).review.verdict,'fail');
    const invalid = await fetch(`http://127.0.0.1:${server.address().port}/api/run`, {
      method:'POST',headers:{'Content-Type':'application/json','Origin':'https://unrelated.example'},body:'{}',
    });
    assert.equal(invalid.status,403);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('Durable reopen preserves transcript and deduplicates the same submission',async () => {
  const directory = await mkdtemp(resolve('.local/reopen-'));
  const path = join(directory,'state.sqlite');
  let agent = await openAgent(path);
  let original, count;
  try { original = await agent.submit('candidate','same-request'); await agent.wait(original); count = (await agent.entries()).length; }
  finally { await agent.close(); }
  agent = await openAgent(path);
  try {
    const duplicate = await agent.submit('candidate','same-request');
    assert.equal(duplicate.id,original.id);
    assert.equal((await agent.wait(duplicate)).status,'done');
    assert.equal((await agent.entries()).length,count);
  } finally { await agent.close(); }
});
