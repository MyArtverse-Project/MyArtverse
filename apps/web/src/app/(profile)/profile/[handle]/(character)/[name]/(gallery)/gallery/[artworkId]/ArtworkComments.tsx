"use client"

import Avatar from "@/components/Avatar"
import UserCommentInput from "@/components/comments/UserCommentInput"
import CommentThread from "@/components/layouts/Panels/Comments/Thread"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { User } from "@/app/context/AuthContext"
import type { Comments } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { postComment } from "@/utils/api"

export default function ArtworkComments({
  artworkId,
  comments: initialComments,
  self,
  redirectPath,
}: {
  artworkId: string
  comments: Comments[]
  self: User | null
  redirectPath: string
}) {
  const commentContext = {
    commentType: "art",
    redirectRoute: redirectPath,
    artworkId,
  }

  return (
    <section className="border-border mt-10 border-t pt-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Comments</h2>
          <Badge variant="secondary">{initialComments.length}</Badge>
        </div>
        <Button variant="outline" size="sm" type="button">
          Sort
        </Button>
      </div>

      {self ? (
        <div className="mb-6">
          <UserCommentInput
            postComment={postComment}
            imgTag={
              <Avatar
                src={self.avatarUrl || USER_DEFAULT_AVATAR}
                username={self.handle}
              />
            }
            avatar={self.avatarUrl || USER_DEFAULT_AVATAR}
            commentType="art"
            redirectRoute={redirectPath}
            artworkId={artworkId}
            username={self.handle}
          />
        </div>
      ) : null}

      <div className="grid gap-y-4">
        {initialComments.length > 0 ? (
          initialComments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              user={self}
              commentContext={commentContext}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No comments yet.</p>
        )}
      </div>
    </section>
  )
}
