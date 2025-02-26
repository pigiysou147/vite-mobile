<script setup>
import { request } from '~/lib/request'

const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const list = ref([])
request({ url: '/words/chapter.json' }).then((result) => {
  list.value = result
  loading.value = false
  finished.value = true
}).catch((err) => {
  console.warn(err)
})
function handleClickCell(item) {
  if (!item)
    return
  router.push({
    path: '/words/chapter',
    query: {
      cid: item.id,
      title: item.label,
    },
  })
}
</script>

<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item.id" :title="item.id + item.label" @click="handleClickCell(item)" />
  </van-list>
</template>

<style lang="scss" scoped>

</style>

<route lang="yaml">
  meta:
    title: '单词列表'
  </route>
