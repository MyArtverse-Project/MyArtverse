import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/studio",
          "/studio/",
          "/settings",
          "/settings/",
          "/embed",
          "/embed/"
        ]
      },
      {
        userAgent: "Petalbot",
        disallow: "*"
      },
      {
        userAgent: "nsa",
        disallow: "/"
      }
    ]
  }
}
