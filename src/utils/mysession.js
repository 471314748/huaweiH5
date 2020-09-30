// 存数据
function sessionSet (key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
// 取数据
function sessionGet (key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}
// 删数据
function sessionDel (key) {
  window.sessionStorage.removeItem(key)
}
export { sessionSet, sessionGet, sessionDel }
