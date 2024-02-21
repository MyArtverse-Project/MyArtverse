import clsx from "clsx"
import MFImage from "../MFImage"

export default function MastheadAvatar({
  src,
  profileOnly
}: {
  src?: string
  /** This property is strictly for profile layouts only! */
  profileOnly?: boolean
}) {
  return (
    <div
      className={clsx(
        "relative size-32 flex-shrink-0  lg:size-44",
        !profileOnly ? "" : "-mt-12"
      )}
    >
      <div
        className={clsx(
          "border-100 bg-100 absolute aspect-square size-32 overflow-hidden border-4 lg:size-44",
          !profileOnly ? "rounded-xl" : "rounded-full"
        )}
      >
        <MFImage
          src={src ?? "/img/examples/kuro/kuro-example2.png"}
          alt={`Avatar of Username`}
          aspectRatio="1"
          width="100%"
          objectFit="cover"
        />
      </div>
    </div>
  )
}
