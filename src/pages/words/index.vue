<script setup lang="ts">
import { request } from '~/lib/request'

removeStore('result')
let wordTypeId
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
const checked = ref([])
const showSelect = ref(false)
const activeNames = ref(['1'])
const wordList: Ref<Word[]> = ref([])
request({ url: '/words/c1/word.json' }).then((result: Word[]) => {
  setStore({ name: 'result', content: result })
  wordList.value = result
  wordTypeId = 'c1'
  // const words = []
  // result.forEach((wordsList) => {
  //   wordsList.wordList.forEach((word) => {
  //     words.push(word.word)
  //   })
  // })
  // console.log('words :>> ', words.join('","'))
}).catch((err) => {
  console.warn(err)
})

function handleClick(word: Word) {
  router.push({
    path: '/words/wordDetail',
    query: {
      ...word,
      meaning: word.meaning[0],
      cid: wordTypeId,
    },
  })
}
function handleClickPaly(key: string) {
  switch (key) {
    case 'batchPaly':
      console.warn('checked :>> ', checked.value)
      setStore({ name: 'checked', content: checked.value })
      router.push({
        path: '/words/wordBatchPlay',
        query: {
          cid: wordTypeId,
        },
      })
      break

    default:
      break
  }
}
</script>

<template>
  <div>
    <div class="top">
      <van-cell>
        <template #title>
          <div text-left @click="showSelect = !showSelect">
            {{ showSelect ? '取消' : "批量播放" }}
          </div>
        </template>
        <template #value>
          <van-icon v-if="showSelect" style="font-size: 20px;" text-20 name="play-circle-o" @click="handleClickPaly('batchPaly')" />
        </template>
      </van-cell>
    </div>
    <van-checkbox-group v-model="checked">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in wordList" :key="index" :title="item.typeName" :name="index">
          <template #title>
            <div>
              <!-- <van-checkbox :name="word. word" @change="checkAllChange" />  -->
              {{ item.typeName }}
            </div>
          </template>
          <van-cell-group inset>
            <van-cell v-for="(word, index) in item.wordList" :key="index" @click="handleClick(word)">
              <template v-if="showSelect" #icon>
                <van-checkbox :name="word. word" @click.stop="" />
              </template>
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
    </van-checkbox-group>
  </div>
</template>

<style scoped lang="less">
  ::v-deep(.van-collapse-item__content) {
  padding: 0;
}
</style>
