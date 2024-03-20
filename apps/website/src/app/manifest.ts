import type { MetadataRoute } from "next"
import { BRAND } from "@myfursona-internal/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND,
    short_name: BRAND,
    start_url: "/login?utm_source=from_pwa",
    display: "standalone",
    description: "An open source platform for your fursonas, commissions, and adopts!",
    lang: "en",
    dir: "ltr",
    theme_color: "#080313",
    background_color: "#080313",
    orientation: "portrait",
    icons: [
      {
        src: "img/icon_192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "img/icon_192_color.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "img/icon_256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "img/icon_256_color.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "img/icon_384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "img/icon_384_color.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "img/icon_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "img/icon_512_color.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ],
    shortcuts: [
      {
        name: "Adoptables",
        url: "/browse/adoptables?q=onsale",
        icons: [
          {
            src: "img/pwa/icon_adopts.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          }
        ]
      },
      {
        name: "Commissions",
        url: "/browse/commissions?q=open",
        icons: [
          {
            src: "img/pwa/icon_commissions.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          }
        ]
      },
      {
        name: "3D Models",
        url: "/browse/3dmodels",
        icons: [
          {
            src: "img/pwa/icon_3dmodels.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          }
        ]
      }
    ]
  }
}
