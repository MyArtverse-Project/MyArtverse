"use client"

import { User } from "@/app/context/AuthContext"
import Avatar from "@/components/Avatar"
import UserComment from "@/components/comments/UserComment"
import type { Comments, UserType } from "@/types/users"
import { postComment } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"

export default function CommentThread({
  comment,
  user,
  commentContext,
  isNested = false,
}: {
  comment: Comments
  user: User | UserType | null
  commentContext?: {
    commentType: string
    redirectRoute: string
    artworkId?: string
  }
  isNested?: boolean
}) {
  return (
    <div className="space-y-0">
      <UserComment
        key={comment.id}
        imgTag={
          <Avatar
            src={comment.author.avatarUrl || USER_DEFAULT_AVATAR}
            username={comment.author.handle}
            size={40}
          />
        }
        date={comment.createdAt}
        onReply={postComment}
        commentId={comment.id}
        avatar={comment.author.avatarUrl || USER_DEFAULT_AVATAR}
        handle={comment.author.handle}
        author={comment.author}
        isPinned={comment.isPinned ? true : undefined}
        commentContext={commentContext}
        currentUser={user}
        isNested={isNested}
      >
        {comment.content}
      </UserComment>

      {comment.replies?.length ? (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              user={user}
              commentContext={commentContext}
              isNested
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
