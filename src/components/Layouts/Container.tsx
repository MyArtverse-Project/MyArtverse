import Head from "next/head"
import { useRouter } from "next/router"
import styles from "./Container.module.scss"

interface ContainerProps {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
}

export default function Container(props: ContainerProps) {
  const router = useRouter()

  const SITE_TITLE = "MyFursona"
  const MAIN_DESCRIPTION =
    "A place where users can manage their fursonas! The project is currently under construction."

  const url = `https://myfursona.art${router.asPath}`
  const dynamicTitle =
    router.pathname === "/"
      ? SITE_TITLE
      : `${props.title ? props.title : router.pathname} - ${SITE_TITLE}`

  const dynamicDesc =
    router.pathname !== "/" ? MAIN_DESCRIPTION : props.description

  return (
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta
          name="description"
          content={props.description && MAIN_DESCRIPTION}
        />
        <meta
          name="keywords"
          content="furry, fursona, furry fandom, MyFursona, ref sheet"
        />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDesc} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={url} />
        <link rel="canonical" href={url} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles["content-wrap"]}>{props.children}</main>
    </>
  )
}
