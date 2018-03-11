import decode from 'jwt-decode'
const ACCESS_TOKEN_KEY = 'access_token'

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function logout() {
    clearAccessToken()
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export function isLoggedIn() {
    const accessToken = getAccessToken()
    return !!accessToken && !isTokenExpired(accessToken)
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp) {
        return null
    }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}
