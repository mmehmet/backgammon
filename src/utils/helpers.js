export const getRoll = () => {
    return Math.floor(Math.random() * 6) + 1
}

export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()