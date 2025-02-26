<script setup>
import WordCloud from 'wordcloud'

const { word, pronunciation, meaning, cid, autoplay = true } = defineProps(['word', 'pronunciation', 'meaning', 'cid', 'autoplay'])
const emit = defineEmits(['playEnd'])
const isEnd = ref(false)
const maxRepeat = 20
const wordMeaning = Array.isArray(meaning) ? meaning[0] : meaning
const color = ['#375606', '#88A610', '#423411', '#727411', '#73490F', '#A66B11']
let wordIndex = 1
const audioRef = ref(null)
const wordContianerRef = ref(null)
const words = [
  [word, 20, 0],
  [wordMeaning, 10, 0],
]

onMounted(() => {
  initWord()
  initAudio()
})
onBeforeUnmount(() => {
  audioRef.value.removeEventListener('ended', audioEndedEvent)
  // audioRef.value.removeEventListener('canplay', audioCanplayEvent)
})
function initAudio() {
  audioRef.value.addEventListener('ended', audioEndedEvent)
  // audioRef.value.addEventListener('canplay', audioCanplayEvent)
}
function togglePlay() {
  if (isEnd.value)
    return
  if (audioRef.value.paused) {
    audioRef.value.play()
  }
  else {
    audioRef.value.pause()
  }
}
function audioEndedEvent() {
  if (wordIndex * 2 >= words.length) {
    isEnd.value = true
    emit('playEnd')
    return
  }
  audioRef.value.play()
  const nextWords = document.querySelectorAll(`.word${wordIndex++}`)
  nextWords.forEach((el) => {
    el.classList.add('opacity-100')
  })
}
function initWord() {
  // 初始词云数据
  for (let i = 1; i <= maxRepeat; i++) {
    const newWord = [word, Math.random() * 10 + 2, i]
    const cnWord = [wordMeaning, Math.random() * 7 + 2, i]
    // 添加新词到词云数据
    words.push(newWord)
    words.push(cnWord)
  }
  // 配置词云
  const options = {
    list: words,
    gridSize: 10,
    weightFactor: 4,
    fontFamily: 'Finger Paint, cursive, sans-serif',
    // color: 'random-dark',
    // wait: duration,
    rotateRatio: 0.5,
    // shape: 'cardioid',
    shrinkToFit: true,
    // rotationSteps: 2,
    color(word, _, __, extraData) {
      return color[extraData % color.length]
    },
    // backgroundColor: '#ffe0e0',
    classes: (word, _, __, extraData) => {
      return `word${extraData[0]}`
    },
  }
  WordCloud(wordContianerRef.value, options)
}
</script>

<template>
  <div h-100vh flex flex-col @click="togglePlay()">
    <div pt-4>
      <span font-bold>{{ word }}</span> <span>{{ pronunciation }}</span>
    </div>
    <audio ref="audioRef" style="display: none" controls :autoplay="autoplay" none>
      <source :src="`/words/voices/${word}.wav`" type="audio/mpeg">
    </audio>
    <div ref="wordContianerRef" class="wordcloud" />
  </div>
</template>

<style  lang="less">
.wordcloud {
  width: 100vw;
  height: 100vh;

  span {
    opacity: 0;
  }
  .word0 {
    opacity: 1;
  }
  .opacity-100 {
    opacity: 100;
  }
}
</style>
