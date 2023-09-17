import Link from "next/link"

export default function SocialsRow({ items }: { items?: any }) {
  // TODO try and find a way to exchange FA components, Lucide Icons, and local components
  return (
    <div data-social-shelf="">
      {items.map(({ link, platform }, index) => (
        <Link href={link as any} key={index}></Link>
      ))}
    </div>
  )
}
