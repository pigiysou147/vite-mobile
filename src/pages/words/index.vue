<script setup lang="ts">
import { request } from '~/lib/request'

const router = useRouter()
interface WordItem {
  word: string
  pronunciation: string
  meaning: string[]
}

interface Word {
  type: string
  typeName: string
  wordList: WordItem[]
}

const activeNames = ref(['1'])
const wordList: Ref<Word[]> = ref([])
request({ url: '/words/word.json' }).then((result: Word[]) => {
  wordList.value = result
}).catch((err) => {
  console.warn(err)
})

function handleClick(word: Word) {
  router.push({
    path: '/words/wordDetail',
    query: {
      ...word,
      meaning: word.meaning[0],
    },
  })
}
</script>

<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item, index) in wordList" :key="index" :title="item.typeName" :name="index">
        <van-cell-group inset>
          <van-cell v-for="(word, index) in item.wordList" :key="index" @click="handleClick(word)">
            <template #title>
              {{ word. word }}
            </template>
            <template #value>
              {{ word.meaning.join(',') }}
            </template>
            <template #label>
              {{ word.pronunciation }}
            </template>
          </van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<style scoped lang="less">
  ::v-deep(.van-collapse-item__content) {
  padding: 0;
}
</style>
