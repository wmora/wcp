const NUMBER_REGEX = /^\d+$/g

export function isNumber(value) {
    return value.match(NUMBER_REGEX)
}
