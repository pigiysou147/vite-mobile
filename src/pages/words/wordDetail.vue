<script setup>
const route = useRoute()
const { word, pronunciation, meaning, cid } = route.query
</script>

<template>
  <WordPlay :word="word" :pronunciation="pronunciation" :meaning="meaning" :cid="cid" :autoplay="false" />
</template>

<style  lang="less">

</style>
