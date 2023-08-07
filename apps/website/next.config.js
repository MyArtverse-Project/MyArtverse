// We don't want users to inject any client side code or any form of XSS attack
// TODO create a middleware to generate a nonce server-side
// TODO reference: https://github.com/vercel/next.js/discussions/49648#discussioncomment-5870798
const CSP = `
default-src 'self' *.myfursona.art; 
script-src 'self';
style-src 'self' 'unsafe-inline';
connect-src 'self' *.myfursona.art;
font-src 'self';
frame-src 'self' https://www.youtube-nocookie.com;
form-action 'self';
`

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: CSP.replace(/\s{2,}/g, " ").trim()
  //         }
  //       ]
  //     }
  //   ]
  // }
}

module.exports = nextConfig
