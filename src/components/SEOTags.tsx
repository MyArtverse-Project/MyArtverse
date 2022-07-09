import Head from "next/head"
import { useRouter } from "next/router"

interface ISEOProps {
  title?: string
  description?: string
  image?: string
}

export default function SEOTags({ title, description, image }: ISEOProps) {
  const router = useRouter()

  const SITE_TITLE = "MyFursona"
  const MAIN_DESCRIPTION = "A place where users can manage their fursonas!"

  const url = `https://myfursona.art${router.asPath}`
  const dynamicTitle =
    router.pathname === "/" ? SITE_TITLE : `${title || router.pathname} - ${SITE_TITLE}`

  return (
    <Head>
      <title>{dynamicTitle}</title>
      <meta name="description" content={description && MAIN_DESCRIPTION} />
      <meta name="keywords" content="furry, fursona, furry fandom, MyFursona, ref sheet" />
      {/* Open Graph */}
      <meta property="og:title" content={dynamicTitle} />
      <meta property="og:description" content={description && MAIN_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {/* Twitter Tags */}
      <meta name="twitter:title" content={dynamicTitle} />
      <meta name="twitter:description" content={description && MAIN_DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
