import { getAccessToken } from './authentication'

const BASE_URL = 'http://localhost:3024'

export function postPick(pick) {
    return fetch(`${BASE_URL}/picks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(pick)
    }).then((response) => response.json())
}
