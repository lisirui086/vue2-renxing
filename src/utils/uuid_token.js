// 引入uuid
import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
  // 获取本地存储的uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有则生成游客临时id
  if (!uuid_token) {
    uuid_token = uuidv4()
    // 本地存储生成的id
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  // 切记一定要有返回值 否则undefined
  return uuid_token
}
