import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
import { createModels } from '@earendil-works/pi-ai/models';
import { fauxProvider, fauxAssistantMessage, fauxToolCall } from '@earendil-works/pi-ai/providers/faux';
import { Harness, createRegistry, defineExtension, defineTool } from '@earendil-works/pi-durable';
import { openNodeSqliteStorage } from '@earendil-works/pi-durable/storage/sqlite/node';
import { createCodemodeExtension } from '@earendil-works/pi-durable/codemode';
import { CodemodeSandbox } from '@earendil-works/pi-codemode';
import { Type } from 'typebox';
import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const [directory, phase] = process.argv.slice(2);
const models = createModels();
const faux = fauxProvider();
const decide = context => {
  faux.appendResponses([decide]);
  return context.messages.at(-1).role === 'user'
    ? fauxAssistantMessage(fauxToolCall('codemode', {
      code: 'await tools.record({}); await tools.pause({}); return "Resumed and finished";',
    }), { stopReason: 'toolUse' })
    : fauxAssistantMessage('Finished');
};
faux.setResponses([decide]);
models.setProvider(faux.provider);
const registry = createRegistry();
registry.install(defineExtension({ name: 'crash-lab', tools: [
  defineTool({ name: 'record', description: 'Record one completed effect.', parameters: Type.Object({}),
    execute: async () => { await appendFile(join(directory, 'effects.txt'), 'recorded\n'); return { output: [{ type: 'text', text: 'Recorded' }] }; } }),
  defineTool({ name: 'pause', description: 'Pause at the demonstration checkpoint.', parameters: Type.Object({}), replay: 'safe',
    execute: async () => {
      if (phase === 'pause') { process.send({ phase: 'ready-to-kill' }); await new Promise(() => {}); }
      return { output: [{ type: 'text', text: 'Continued' }] };
    } }),
] }));
const sandbox = new CodemodeSandbox();
registry.install(createCodemodeExtension({ sandbox, models: false }));
const harness = await Harness.open(await openNodeSqliteStorage(join(directory, 'crash.sqlite')), { models, registry }, ctx);
try {
  const root = await harness.root(ctx, { agent: { model: { provider: 'faux', modelId: faux.getModel().id } } });
  const submission = await root.submit({ type: 'input', content: 'Run the two-step workflow.', requestId: 'crash-demo' }, ctx);
  const result = await submission.wait(ctx);
  const entries = await root.entries({ order: 'ascending' }, 100, undefined, ctx);
  process.send({ phase: 'done', result, entries: entries.items });
} finally { await harness.close(ctx); await sandbox.close(); }
