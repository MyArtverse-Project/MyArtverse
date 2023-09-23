/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
    mdxRs: true
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment"
  }
}
