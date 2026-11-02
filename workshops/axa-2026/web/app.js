const $ = selector => document.querySelector(selector);
const node = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
};
async function api(path, body) {
  const response = await fetch(path, body ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  } : {});
  const value = await response.json();
  if (!response.ok) throw new Error(value.error);
  return value;
}
const { courses, live } = await api('/api/courses');
let selected = courses[0], current;
$('#mode').textContent = live ? 'Live providers enabled' : 'Offline exploration';

function select(course) {
  selected = course;
  current = undefined;
  $('#result').replaceChildren();
  $('#review').hidden = true;
  $('#status').textContent = '';
  $('#variant-control').hidden = course.id !== 'improve';
  $('#threshold-control').hidden = course.id !== 'reviewer';
  for (const button of $('#courses').children) button.setAttribute('aria-pressed', String(button.dataset.id === course.id));
  const pieces = node('div', undefined, 'pieces');
  pieces.append(...course.pieces.map(piece => node('span', piece, 'pill')));
  const agenda = node('ol', undefined, 'agenda');
  for (const [minutes, title] of course.agenda) {
    const item = node('li'); item.append(node('strong', `${minutes} min`), document.createTextNode(title)); agenda.append(item);
  }
  $('#course').replaceChildren(node('span', course.tag, 'eyebrow'), node('h2',course.title),
    node('p',course.promise,'promise'), pieces, node('h3',course.question), node('p',course.exercise),
    agenda, node('p',`Stretch: ${course.extension}`));
}
for (const [index, course] of courses.entries()) {
  const button = node('button'); button.type = 'button'; button.dataset.id = course.id;
  button.append(node('small',`0${index + 1} / COURSE IDEA`),document.createTextNode(course.title));
  button.addEventListener('click',() => select(course)); $('#courses').append(button);
}
select(selected);
$('#threshold').addEventListener('input', () => { $('#threshold-value').value = Number($('#threshold').value).toFixed(2); });

function detail(title, value) {
  const wrapper = node('details');
  wrapper.append(node('summary',title),node('pre',typeof value === 'string' ? value : JSON.stringify(value,null,2)));
  return wrapper;
}
function render(result) {
  const target = $('#result'); target.replaceChildren(node('p',result.mode,'pill'));
  const checks = node('ul',undefined,'checks');
  checks.append(...result.checks.map(check => node('li',`${check.pass ? '✓' : '×'} ${check.name}`,check.pass ? '' : 'fail')));
  target.append(checks);
  if (result.before) {
    const pair = node('div',undefined,'pair');
    for (const [title,code] of [['Before',result.before],['After',result.after]]) {
      const panel = node('div'); panel.append(node('h3',title),node('pre',code)); pair.append(panel);
    }
    target.append(pair);
  }
  if (result.rawBytes) {
    target.append(node('div',`${(result.rawBytes / result.outputBytes).toFixed(0)}× smaller`, 'metric'),
      node('p','Measured JSON bytes, not model tokens. This does not measure answer quality.'));
    for (const [label,bytes] of [['Raw tool data',result.rawBytes],['Returned summary',result.outputBytes]]) {
      const row = node('div',undefined,'bar-row'), bar = node('div',undefined,'bar');
      bar.style.width = `${bytes / result.rawBytes * 100}%`;
      row.append(node('p',`${label}: ${bytes.toLocaleString()} bytes`),bar); target.append(row);
    }
  }
  if (result.rows) {
    target.append(node('p','Make your own judgment first. These tiny examples teach the method; they do not validate a reviewer.'));
    const rows = node('div',undefined,'rows');
    for (const sample of result.rows) {
      const card = node('div',undefined,'sample');
      card.append(node('p',sample.text));
      for (const label of ['Sound reasoning','Failure']) {
        const button = node('button',label,'quiet');
        button.dataset.label = label;
        button.onclick = () => { for (const b of card.querySelectorAll('button')) {
          b.setAttribute('aria-pressed',String(b === button));
          b.textContent = `${b === button ? '✓ ' : ''}${b.dataset.label}`;
        } };
        card.append(button);
      }
      const reference = node('p',`${sample.split} · reference: ${sample.expected ? 'sound' : 'failure'} · score ${sample.probability.toFixed(2)} · predicted: ${sample.predicted ? 'sound' : 'failure'}`,'reference');
      reference.hidden = true; card.append(reference); rows.append(card);
    }
    const reveal = node('button','Reveal reference labels and reviewer decisions','quiet');
    reveal.onclick = () => { for (const item of rows.querySelectorAll('.reference')) item.hidden = false; reveal.disabled = true;
      target.append(detail('Practice confusion counts',result.practice),detail('Holdout confusion counts',result.holdout)); };
    target.append(rows,reveal);
  }
  if (result.timeline) {
    const list = node('ol'); list.append(...result.timeline.map(item => node('li',item))); target.append(list);
    target.append(node('p','This verifies reuse of a completed call. It does not make arbitrary external side effects exactly-once.'));
  }
  if (result.answer) target.append(node('h3','Agent answer'),node('pre',result.answer));
  if (result.script) target.append(detail('Inspect the Code Mode script',result.script));
  if (result.result) target.append(detail('Inspect the result',result.result));
  target.append(detail('Inspect the full trace',result.trace));
  $('#review').hidden = false; $('#saved').textContent = ''; $('#notes').value = result.review?.notes ?? '';
  $('#verdict').value = result.review?.verdict ?? 'defer';
}
$('#controls').addEventListener('submit',async event => {
  event.preventDefault(); $('#run').disabled = true; $('#status').textContent = 'Running in a fresh workspace…';
  try {
    current = await api('/api/run',{ lab: selected.id, variant: $('#variant').value, threshold: Number($('#threshold').value) });
    render(current); $('#status').textContent = 'Run saved. Inspect the result and leave an observation.'; await history();
  } catch (error) { $('#status').textContent = error.message; }
  finally { $('#run').disabled = false; }
});
$('#review').addEventListener('submit',async event => {
  event.preventDefault();
  try { await api('/api/review',{ id: current.id, notes: $('#notes').value, verdict: $('#verdict').value }); $('#saved').textContent = 'Saved'; await history(); }
  catch (error) { $('#saved').textContent = error.message; }
});
async function history() {
  const runs = await api('/api/runs'); $('#history').replaceChildren();
  if (!runs.length) $('#history').append(node('p','Your first run starts the comparison.'));
  for (const run of runs.sort((a,b) => b.at.localeCompare(a.at))) {
    const row = node('div',undefined,'history-run');
    const button = node('button',`${run.title}${run.variant ? ` · ${run.variant}` : ''}`,'quiet');
    button.onclick = () => { select(courses.find(course => course.id === run.lab)); current = run; render(run); };
    row.append(button,node('span',run.review ? `Reviewed: ${run.review.verdict}` : 'Awaiting review')); $('#history').append(row);
  }
}
$('#refresh').onclick = history;
await history();
