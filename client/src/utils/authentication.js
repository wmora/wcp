const TOKEN = 'TOKEN'

export const isLoggedIn = () => {
    return localStorage.getItem(TOKEN)
}

export function setToken() {
    localStorage.setItem(TOKEN, 'someToken')
}

export function clearToken() {
    localStorage.removeItem(TOKEN)
}
