import dedent from "dedent"

const CONSOLE_MSG =
  "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"
const COMMENT_MSG = "Whatcha lookin at? OwO"

export const DEV_CONVERSION_INLINE_SCRIPT = dedent`
(function(m,y,s,a){
  m.insertBefore(m.createComment(a),m.childNodes[0]);console.log(y,s)
})(document,"${CONSOLE_MSG}","color:hsl(250,95.5%,75%)","${COMMENT_MSG}")
`
