import { defineAppSetup } from '@slidev/types'
import { watch } from 'vue'
import { useNav } from '@slidev/client'

const audioMap: Record<number, string> = {
  2: 'slide03-timeline.mp3',
  3: 'slide04-act1.mp3',
  4: 'slide05-tab.mp3',
  5: 'slide06-act2.mp3',
  6: 'slide07-reddit.mp3',
  7: 'slide08-psychosis.mp3',
  8: 'slide09-act3.mp3',
  9: 'slide10-claude.mp3',
  10: 'slide11-specflow.mp3',
  11: 'slide12-socratic.mp3',
  12: 'slide13-permissions.mp3',
  13: 'slide14-act4.mp3',
  14: 'slide15-ide-detail.mp3',
  15: 'slide16-peter.mp3',
  16: 'slide17-act5.mp3',
  17: 'slide18-understand.mp3',
  18: 'slide19-evolution.mp3',
  19: 'slide20-presentation.mp3',
  20: 'slide21-act6.mp3',
  21: 'slide22-knowledge.mp3',
  22: 'slide23-claudemd.mp3',
  23: 'slide24-patterns.mp3',
  24: 'slide25-takes.mp3',
  25: 'slide26-resources.mp3',
  26: 'slide27-discussion.mp3',
}

const AUDIO_PATHS = [
  (f: string) => `/audio/${f}`,
  (f: string) => `/agent-presentation/public/audio/${f}`,
]

export default defineAppSetup(({ app }) => {
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
      const a = new Audio(url)
      a.addEventListener('canplaythrough', () => {
        currentAudio = a
        setTimeout(() => {
          a.play().catch(() => {})
        }, 200)
      }, { once: true })
      a.addEventListener('error', () => tryPath(i + 1), { once: true })
    }
    tryPath(0)
  }

  // Wait for router to be ready, then watch
  setTimeout(() => {
    try {
      const { currentPage, clicks } = useNav()

      // Play intro on first click on slide 1 (v-click step)
      watch(clicks, (newClicks) => {
        if (currentPage.value === 1 && newClicks >= 1 && !introPlayed) {
          introPlayed = true
          playFile('slide02-intro.mp3')
        }
      })

      // Play audio for all other slides on navigation
      watch(currentPage, (page) => {
        const file = audioMap[page]
        if (file) playFile(file)
      })
    } catch (e) {
      console.warn('SlideAudio: could not hook into navigation', e)
    }
  }, 100)
})
