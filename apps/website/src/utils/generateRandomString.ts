export default function generateRandomString() {
  const _rnd = (n: number) => Math.round(n)

  const alphabetSoup = "abcdefghijklmnopqrstuvwxyz".split("")

  const randomNumForAlphy = _rnd(Math.random() * alphabetSoup.length)
  const randomLetter = alphabetSoup[randomNumForAlphy]

  const randomNumForPadding = _rnd(Math.random() * 24 * 2048)
  const paddedStr = randomNumForPadding.toString(24).padStart(4, randomLetter)

  return paddedStr
}
