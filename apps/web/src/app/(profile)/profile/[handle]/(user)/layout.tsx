import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import type { DefineRouteParams } from "@/types"
import { fetchUser, fetchUserData } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"

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
        avatarUrl={user?.avatarUrl || USER_DEFAULT_AVATAR}
        followerCount={user.followers.length}
        followingCount={user.following.length}
        profileBio={user?.bio || ""}
        characterCount={user?.characters.length || 0}
        bannerUrl={user?.bannerUrl || undefined}
        characterCount={user?.characters.length || 0}
        isOwnProfile={self ? self.handle === user.handle : false}
      />
      {props.children}
    </AppLayout>
  )
}
