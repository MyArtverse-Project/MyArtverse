import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import type { DefineRouteParams } from "@/types"
import { fetchUser, fetchUserData } from "@/utils/api"

type AsyncProps = DefineRouteParams<{ handle: string }>

export default async function MainProfileLayout(
  props: React.PropsWithChildren & AsyncProps
) {
  const { handle } = await props.params

  const self = await fetchUserData().catch(() => null)
  const user = await fetchUser(handle)

  return (
    <AppLayout>
      <ProfileMasthead
        handle={user?.handle}
        displayName={user?.displayName || user?.handle}
        avatarUrl={user?.avatarUrl}
        followerCount={user.followers.length}
        followingCount={user.following.length}
        profileBio={user?.bio || ""}
        bannerUrl={user?.bannerUrl || undefined}
        isOwnProfile={self ? self.handle === user.handle : false}
      />
      {props.children}
    </AppLayout>
  )
}
