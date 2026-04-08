import { defineAppSetup } from '@slidev/types'

type PresentationWithAudio = 'lessons' | 'round5'

function detectPresentation(): PresentationWithAudio | null {
  const path = window.location.pathname
  if (path.includes('round5')) return 'round5'
  if (path.includes('lessons')) return 'lessons'

  const title = document.title.toLowerCase()
  if (title.includes('round 5')) return 'round5'
  if (title.includes('lessons')) return 'lessons'

  return null
}

export default defineAppSetup(() => {
  setTimeout(async () => {
    try {
      const presentation = detectPresentation()
      if (!presentation) return

      const { setupSlideAudio } = await import('./slide-audio')
      setupSlideAudio(presentation)
    } catch (e) {
      console.warn('SlideAudio: could not hook into navigation', e)
    }
  }, 100)
})
