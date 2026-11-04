import { fileURLToPath } from 'node:url';

// Verified against earendil-works/pi v1.5.0: src/cli/args.ts and core/resource-loader.ts.
export function modeArguments(mode) {
  if (!['baseline', 'interview'].includes(mode)) throw new Error('Unknown workshop mode.');
  const args = ['--no-skills', '--no-extensions', '--no-prompt-templates',
    '--no-context-files', '--no-mcp', '--no-session', '--tools', 'read,write,edit,bash'];
  if (mode === 'interview') {
    for (const name of ['grill-me', 'grilling']) {
      args.push('--skill', fileURLToPath(new URL('../skills/' + name + '/SKILL.md', import.meta.url)));
    }
  }
  return args;
}
