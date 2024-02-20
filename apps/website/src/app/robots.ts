import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/"
      },
      {
        userAgent: "Petalbot",
        disallow: "*"
      },
      {
        userAgent: "*",
        disallow: "/dashboard/*"
      }
    ]
  }
}
