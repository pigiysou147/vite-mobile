<script setup>
const route = useRoute()
const { cid } = route.query
const result = getStore({ name: 'result' })
const checked = getStore({ name: 'checked' })
const words = ref([])
result.forEach((item) => {
  const filters = item.wordList.filter(el => checked.includes(el.word))
  words.value = [...words.value, ...filters]
})
const wordIndex = ref(0)

function inc() {
  if (wordIndex.value >= result.length - 1)
    return
  wordIndex.value++
}
const autoplay = computed(() => {
  return wordIndex.value > 0
})
</script>

<template>
  <div>
    <WordPlay :key="wordIndex" :autoplay="autoplay" :word="words[wordIndex].word" :pronunciation="words[wordIndex].pronunciation" :meaning="words[wordIndex].meaning" :cid="cid" @play-end="inc" />
  </div>
</template>

<style lang="scss" scoped>

</style>
