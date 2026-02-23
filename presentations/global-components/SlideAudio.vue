<template>
  <span style="display:none"></span>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})

let audio = null
let attempted = false

function tryPlay() {
  if (!audio || attempted) return
  attempted = true
  audio.play().catch(() => {
    // Autoplay blocked — will play on next slide navigation
    attempted = false
  })
}

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
      // Small delay to not interfere with slide transition
      setTimeout(() => tryPlay(), 300)
    }, { once: true })
    a.addEventListener('error', () => tryLoad(i + 1), { once: true })
  }
  tryLoad(0)
})

onUnmounted(() => {
  if (audio) { audio.pause(); audio.currentTime = 0; audio = null }
  attempted = false
})
</script>
