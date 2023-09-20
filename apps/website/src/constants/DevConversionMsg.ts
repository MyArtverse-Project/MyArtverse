import dedent from "dedent"

const CONSOLE_MSG =
  "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"
const COMMENT_MSG =
  "Oh you decided to take a looksies at the precious sauce code I see OwO"

export const DEV_CONVERSION_INLINE_SCRIPT = dedent`
(function(m,y,fur,sona){
  m.insertBefore(m.createComment(sona),m.childNodes[0]);console.log(y,fur)
})(document,"${CONSOLE_MSG}","color:hsl(250,95.5%,75%)","${COMMENT_MSG}")
`
