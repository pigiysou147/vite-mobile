type StorageType = 'local' | 'session'

interface StoreParams {
  name: string
  content?: any
  type?: StorageType
  preName?: string
  debug?: boolean
}

/**
 * 存储localStorage
 */
export function setStore({ name, content, type = 'local', preName }: StoreParams) {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage
  const key = preName ? `${preName}${name}` : `${website.storeKey}${name}`
  const obj = {
    dataType: typeof content,
    content,
    type,
    datetime: new Date().getTime(),
  }
  storage.setItem(key, JSON.stringify(obj))
}

/**
 * 获取localStorage
 */
export function getStore({ name, debug = false, preName }: StoreParams) {
  const storage = debug ? undefined : window.sessionStorage
  const key = preName ? `${preName}${name}` : `${website.storeKey}${name}`
  let obj = storage?.getItem(key)
  if (!obj)
    obj = window.localStorage.getItem(key)
  if (!obj)
    return undefined
  try {
    obj = JSON.parse(obj)
  }
  catch {
    return obj
  }
  if (debug)
    return obj

  const { dataType, content } = obj as unknown as { dataType: string, content: any }
  switch (dataType) {
    case 'string':
      return content
    case 'number':
      return Number(content)
    case 'boolean':
      // eslint-disable-next-line no-eval
      return eval(content) // Consider using a safer alternative to eval
    case 'object':
      return content
    default:
      return content
  }
}

/**
 * 删除localStorage
 */
export function removeStore({ name, type = 'local' }: StoreParams) {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage
  const key = `${website.storeKey}${name}`
  storage.removeItem(key)
}

/**
 * 清空全部localStorage
 */
export function clearStore({ type = 'local' }: { type?: StorageType }) {
  const storage = type === 'local' ? window.localStorage : window.sessionStorage
  storage.clear()
}
