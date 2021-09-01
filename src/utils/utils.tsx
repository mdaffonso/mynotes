export const randomIdGenerator = (length: number) => {
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

  const getRandomChar = (num: number) => {
    return Math.floor(Math.random() * (validChars.length-num))
  }

  let randomString = validChars[getRandomChar(11)]

  for (let i = 0; i < length; i++) {
    randomString += validChars[getRandomChar(1)]
  }

  return randomString
}