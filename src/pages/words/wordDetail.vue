<script setup>
const route = useRoute()
const { word, pronunciation, meaning, cid } = route.query
const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar
    :title="word"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <WordPlay :word="word" :pronunciation="pronunciation" :meaning="meaning" :cid="cid" :autoplay="false" />
</template>

<style  lang="less">

</style>
