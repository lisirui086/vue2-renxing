// 向外暴露 小写token是形参
// 储存token
export const setToken = (token) => {
  localStorage.setItem('TOKEN',token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
// 移除token
export const removeToken = () => {
  return localStorage.removeItem('TOKEN')
}