// 获取图片地址
export function getImgUrl(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

// 获取路径下最后一层名称
export const getPathLastName = (text: string) => text ? text.substring(text.lastIndexOf('/') + 1) : ''

// 共多少条数据
export const finishedText = (num: number): string => num > 0 ? `共${num}条数据` : ''
