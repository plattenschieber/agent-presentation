<template>
  <span style="display:none"></span>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})

let audio = null
let unlockHandler = null

onMounted(() => {
  const paths = [
    `/audio/${props.src}`,
    `/agent-presentation/public/audio/${props.src}`,
  ]
  
  function tryLoad(i) {
    if (i >= paths.length) return
    const a = new Audio(paths[i])
    a.addEventListener('canplaythrough', () => {
      audio = a
      a.play().catch(() => {
        unlockHandler = () => {
          a.play().catch(() => {})
          document.removeEventListener('click', unlockHandler)
          document.removeEventListener('keydown', unlockHandler)
        }
        document.addEventListener('click', unlockHandler, { once: true })
        document.addEventListener('keydown', unlockHandler, { once: true })
      })
    }, { once: true })
    a.addEventListener('error', () => tryLoad(i + 1), { once: true })
  }
  tryLoad(0)
})

onUnmounted(() => {
  if (audio) { audio.pause(); audio.currentTime = 0 }
  if (unlockHandler) {
    document.removeEventListener('click', unlockHandler)
    document.removeEventListener('keydown', unlockHandler)
  }
})
</script>
