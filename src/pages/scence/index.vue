<script setup>
const voices = [
  { source: 'a', content: 'at the end of the right-hand path', x: 48.5, y: 12 },
  { source: 'b', content: 'at the northern end of the larger lake.in a bend on the path leading to the lake', x: 21.5, y: 60 },
  { source: 'c', content: 'on the far side of the house from the car park', x: 43, y: 72 },
  { source: 'd', content: 'it`s rectangular and to the north-east of the house', x: 60, y: 53 },
  // { source: 'e', content: '', x: 0, y: 0 },
  { source: 'f', content: 'at the end of the right fork east of the house', x: 75.5, y: 140 },
  { source: 'g', content: 'in the far corner on the left', x: 28.5, y: 180 },
  { source: 'h', content: 'on the right as you go in', x: 43.5, y: 220 },
]
voices.forEach((element) => {
  console.log(`${element.source.toUpperCase()}:${element.content}`)
})
const audioRef = ref(null)
const voiceIndex = ref(0)
const repeat = ref(0)
const currentVoice = computed(() => {
  return voices[voiceIndex.value]
})
const isEnd = computed(() => {
  return voiceIndex.value >= voices.length - 1
})
const autoplay = computed(() => {
  return voiceIndex.value > 0 || repeat.value > 0
})
onMounted(() => {
  audioRef.value.addEventListener('ended', audioEndedEvent)
})
onBeforeUnmount(() => {
  audioRef.value.removeEventListener('ended', audioEndedEvent)
})
function audioEndedEvent() {
  audioRef.value.removeEventListener('ended', audioEndedEvent)
  if (isEnd.value)
    return
  setTimeout(() => {
    voiceIndex.value++
    nextTick(() => {
      audioRef.value.addEventListener('ended', audioEndedEvent)
    })
  }, 1000)
}
function repeatPaly() {
  if (!isEnd.value)
    return
  repeat.value++
  voiceIndex.value = 0
  nextTick(() => {
    audioRef.value.addEventListener('ended', audioEndedEvent)
  })
}
function togglePlay() {
  if (isEnd.value) {
    repeatPaly()
    return
  }
  if (audioRef.value.paused) {
    audioRef.value.play()
  }
  else {
    audioRef.value.pause()
  }
}
</script>

<template>
  <div class="container" relative h-100vh w-100vw pt-40px @click="togglePlay()">
    <img src="/scence/c1.png" class="scence-bg">
    <img src="/scence/location-icon.svg" class="pointer" :style="`top:${currentVoice.y + 40}px;left:${currentVoice.x}%`">

    <audio :key="currentVoice.source" ref="audioRef" style="display: none" :autoplay="autoplay">
      <source :src="`/scence/${currentVoice.source}.wav`" type="audio/mpeg">
    </audio>
    <p class="content">
      {{ currentVoice.content }}
    </p>
  </div>
</template>

<style lang="less" scoped>
.container {
  background-color: #faeedd;
}
.scence-bg {
  width: 100vw;
}
.pointer {
  position: absolute;
  width: 10vw;
  animation: bounce 1s infinite ease-in-out; /* 动画名称、时长、循环、缓动 */
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px); /* 向上跳动20px */
  }
  60% {
    transform: translateY(-10px); /* 回弹到中间位置 */
  }
}
.content {
  color: #442c1c;
  font-size: 20px;
  padding: 0 20px;
  font-weight: bold;
}
</style>
