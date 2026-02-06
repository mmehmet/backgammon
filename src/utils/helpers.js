export const getRoll = () => {
    return Math.floor(Math.random() * 6) + 1
}

export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const formatMsg = (template, vars = {}) => {
    return template.replace(/{(\w+)}/g, (match, key) => vars[key] || match)
}

export const moveToRoll = (from, to) => Math.abs(to - from)