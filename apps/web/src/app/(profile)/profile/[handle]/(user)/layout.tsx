import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import { DefineRouteParams } from "@/types"
import { fetchUser, fetchUserData } from "@/utils/api"
import { usePathname } from "next/navigation"

type AsyncProps = DefineRouteParams<{ handle: string }>

export default async function MainProfileLayout(
  props: React.PropsWithChildren & AsyncProps,
) {
  const { handle } = await props.params

  const self = await fetchUserData()
  const user = handle === self.handle ? self : await fetchUser(handle)

  return (
    <AppLayout>
      <ProfileMasthead
        handle={user?.handle}
        displayName={user?.displayName || user?.handle}
        avatarUrl={user?.avatarUrl}
      />
      {props.children}
    </AppLayout>
  )
}
