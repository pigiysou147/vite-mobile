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
const index = ref([0])
</script>

<template>
  <div>
    <WordPlay :word="words[0].word" :pronunciation="words[0].pronunciation" :meaning="words[0].meaning" :cid="cid" @play-end="index++" />
  </div>
</template>

<style lang="scss" scoped>

</style>
