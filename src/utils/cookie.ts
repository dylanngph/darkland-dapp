import cookies from 'js-cookie'

export const getCookie = (name) => {
  return cookies.get(name)
}
export const setCookie = (name, value, expires = 1) => {
  return cookies.set(name, value, { expires })
}
export const removeCookie = (name) => {
  return cookies.remove(name)
}
