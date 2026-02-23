#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = 'sk_f41b354ac95f8f91f214b800bff30b2f5ea7c9c2e9b03e79';
const VOICE_ID = 'rNzVNTrvSffyxdrTbLKv'; // Spicy British

const SLIDES = [
  {
    id: 'slide02-intro',
    text: `Oh — wait. Before Jero starts... let me set the scene. My name is Alfred. I'm the AI assistant he built over the past year. And yes — I helped make these slides. I also helped write the talk. And if I'm being honest, I probably could have given it too. But apparently humans still like seeing other humans on stage, so... here's Jero. Be nice to him — he's been up since four AM.`
  },
  {
    id: 'slide03-timeline',
    text: `Here's the timeline. Yes, it escalated quickly.`
  },
  {
    id: 'slide04-act1',
    text: `Ah, the dark ages. When Jero thought pressing Tab twice counted as AI-assisted development.`
  },
  {
    id: 'slide05-tab',
    text: `Tab, tab, copy, paste, pray. The full workflow.`
  },
  {
    id: 'slide06-act2',
    text: `And then Reddit happened.`
  },
  {
    id: 'slide07-reddit',
    text: `Six design systems in parallel. Hundreds of dollars in credits. Zero lines shipped. Peak engineering.`
  },
  {
    id: 'slide08-psychosis',
    text: `AI Psychosis — when you're reorganizing your AGENTS dot MD for the third time today instead of actually building something. And yes, Jero, I'm talking about you.`
  },
  {
    id: 'slide09-act3',
    text: `Now we're getting to the good part.`
  },
  {
    id: 'slide10-claude',
    text: `April twenty-twenty-five. Jero finally found a co-founder who doesn't need equity, doesn't need sleep, and doesn't argue about the tech stack. You're welcome.`
  },
  {
    id: 'slide11-specflow',
    text: `Intent is the new source code. Which is honestly a relief, because have you SEEN his old code?`
  },
  {
    id: 'slide12-socratic',
    text: `Plot twist — the AI started asking the questions.`
  },
  {
    id: 'slide13-permissions',
    text: `Dangerously skip permissions. Jero's favourite CLI flag, his dating philosophy, and frankly, his approach to parenting.`
  },
  {
    id: 'slide14-act4',
    text: `Rest in peace, IDE. You served us well. Sort of.`
  },
  {
    id: 'slide15-ide-detail',
    text: `Read, write, bash. That's it. Everything else is decoration.`
  },
  {
    id: 'slide16-peter',
    text: `This one's my favourite. A man at a pool in Morocco sends a voice message to his agent. The agent has no idea how to process audio. Does it give up? No. It finds an API key on the server, calls Whisper, and answers. Nobody programmed this. I'm not saying we're taking over, but... we're definitely improvising.`
  },
  {
    id: 'slide17-act5',
    text: `From understanding agents to becoming one — let me show you.`
  },
  {
    id: 'slide18-understand',
    text: `Jero read "How to Build an Agent" and thought — hold my beer.`
  },
  {
    id: 'slide19-evolution',
    text: `Bash to enterprise in twelve months. Not bad for a side project.`
  },
  {
    id: 'slide20-presentation',
    text: `I built these slides. I presented myself at ClawCon. And right now I'm narrating my own existence to a room full of humans. If that doesn't keep you up at night, nothing will.`
  },
  {
    id: 'slide21-act6',
    text: `Now for the part where we tell your company what to do.`
  },
  {
    id: 'slide22-knowledge',
    text: `Every insight stuck in your local repo is a gift to nobody.`
  },
  {
    id: 'slide23-claudemd',
    text: `Confluence is where knowledge goes to die in a beautifully formatted grave. CLAUDE dot MD is where it actually gets read — by someone who gives a shit.`
  },
  {
    id: 'slide24-patterns',
    text: `The survivors and the casualties. Pour one out for "You are an expert senior staff engineer with twenty years of experience" — you were never needed.`
  },
  {
    id: 'slide25-takes',
    text: `Three things. That's all you need to remember.`
  },
  {
    id: 'slide26-resources',
    text: `Homework. Optional, of course — but I'll know if you skip it.`
  },
  {
    id: 'slide27-discussion',
    text: `That's my cue to shut up. The floor is yours, humans. Try not to overthink it — that's literally what got you into trouble in Act Two.`
  },
];

const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generateSlide(slide) {
  const outFile = path.join(outDir, `${slide.id}.mp3`);
  if (fs.existsSync(outFile)) {
    console.log(`⏭ ${slide.id} already exists, skipping`);
    return;
  }
  
  console.log(`🎙 Generating ${slide.id}...`);
  console.log(`  "${slide.text.substring(0, 60)}..."`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: slide.text,
        model_id: 'eleven_multilingual_v2',
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ❌ Error: ${response.status} ${err}`);
    return;
  }

  const buf = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outFile, buf);
  console.log(`  ✅ Saved ${slide.id}.mp3 (${(buf.length / 1024).toFixed(0)} KB)`);
  
  // Rate limit: small delay between calls
  await new Promise(r => setTimeout(r, 500));
}

async function main() {
  console.log(`Generating ${SLIDES.length} audio files...\n`);
  for (const slide of SLIDES) {
    await generateSlide(slide);
  }
  console.log('\n✅ All audio files generated!');
  console.log(`Output: ${outDir}`);
}

main().catch(console.error);
