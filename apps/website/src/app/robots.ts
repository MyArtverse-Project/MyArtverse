import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/"
      },
      {
        userAgent: "*",
        disallow: ["/dashboard", "/dashboard/", "/settings", "/settings/"]
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
