import AppLayout from "@/components/layouts/AppLayout/AppLayout"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import { fetchUser, fetchUserData } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { notFound } from "next/navigation"

export default async function MainProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  const self = await fetchUserData().catch(() => null)

  let user
  try {
    user = await fetchUser(handle)
  } catch {
    notFound()
  }

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
        isOwnProfile={self ? self.handle === user.handle : false}
      />
      {children}
    </AppLayout>
  )
}
