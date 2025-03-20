import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import { fetchUser, fetchUserData } from "@/utils/api"

export default async function MainProfileLayout(props: React.PropsWithChildren) {
  // @ts-expect-error
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
