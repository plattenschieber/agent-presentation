import { watch } from 'vue'
import { useNav } from '@slidev/client'

export type PresentationWithAudio = 'lessons' | 'round5'

const lessonsAudioMap: Record<number, string> = {
  2: 'audio/slide02-worum.mp3',
  3: 'audio/slide03-timeline.mp3',
  4: 'audio/slide04-act1.mp3',
  5: 'audio/slide05-tab.mp3',
  6: 'audio/slide06-act2.mp3',
  7: 'audio/slide07-reddit.mp3',
  8: 'audio/slide08-psychosis.mp3',
  9: 'audio/slide09-act3.mp3',
  10: 'audio/slide10-claude.mp3',
  11: 'audio/slide11-specflow.mp3',
  12: 'audio/slide12-socratic.mp3',
  13: 'audio/slide13-permissions.mp3',
  14: 'audio/slide14-act4.mp3',
  15: 'audio/slide15-ide-detail.mp3',
  16: 'audio/slide16-peter.mp3',
  17: 'audio/slide17-act5.mp3',
  18: 'audio/slide18-understand.mp3',
  19: 'audio/slide19-evolution.mp3',
  20: 'audio/slide20-presentation.mp3',
  21: 'audio/slide21-act6.mp3',
  22: 'audio/slide22-knowledge.mp3',
  23: 'audio/slide23-claudemd.mp3',
  24: 'audio/slide24-patterns.mp3',
  25: 'audio/slide25-takes.mp3',
  26: 'audio/slide26-resources.mp3',
  27: 'audio/slide27-discussion.mp3',
}

const round5AudioMap: Record<number, string> = {
  2: 'audio-r5/r5-slide02-since.mp3',
  3: 'audio-r5/r5-slide03-clawcon.mp3',
  4: 'audio-r5/r5-slide04-photo.mp3',
  5: 'audio-r5/r5-slide05-docs.mp3',
  6: 'audio-r5/r5-slide06-knowledge.mp3',
  7: 'audio-r5/r5-slide07-lightning.mp3',
}

const introFiles: Record<PresentationWithAudio, string> = {
  lessons: 'audio/slide02-intro.mp3',
  round5: 'audio-r5/r5-slide01-intro.mp3',
}

const audioMaps: Record<PresentationWithAudio, Record<number, string>> = {
  lessons: lessonsAudioMap,
  round5: round5AudioMap,
}

const AUDIO_PATHS = [
  (file: string) => `/${file}`,
  (file: string) => `/agent-presentation/public/${file}`,
]

export function setupSlideAudio(presentation: PresentationWithAudio) {
  let currentAudio: HTMLAudioElement | null = null
  let introPlayed = false

  function playFile(file: string) {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio = null
    }

    function tryPath(i: number) {
      if (i >= AUDIO_PATHS.length) return

      const url = AUDIO_PATHS[i](file)
      const audio = new Audio(url)
      audio.addEventListener('canplaythrough', () => {
        currentAudio = audio
        setTimeout(() => {
          audio.play().catch(() => {})
        }, 200)
      }, { once: true })
      audio.addEventListener('error', () => tryPath(i + 1), { once: true })
    }

    tryPath(0)
  }

  const audioMap = audioMaps[presentation]
  const introFile = introFiles[presentation]
  const { currentPage, clicks } = useNav()

  watch(clicks, (newClicks) => {
    if (currentPage.value === 1 && newClicks >= 1 && !introPlayed) {
      introPlayed = true
      playFile(introFile)
    }
  })

  watch(currentPage, (page) => {
    const file = audioMap[page]
    if (file) playFile(file)
  })
}
