'use client'

import type { Comments, UserType } from "@/types/users";
import { postComment } from "@/utils/api";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";
import { UserComment } from "@mav/ui/components/comments";
import { useState } from "react";

export default function CommentThread({ comment, user }: { comment: Comments; user: UserType }) {
  const [viewReplies, setViewReplies] = useState(false);
  const toggleViewReplies = () => setViewReplies((prev) => !prev);
  return (
    <div className="space-y-4">
      <UserComment
        key={comment.id}
        imgTag={<img />}
        date={comment.createdAt}
        replies={comment.replies.length}
        viewReplies={viewReplies}
        onReply={postComment}
        toggleViewReplies={toggleViewReplies}
        commentId={comment.id}
        avatar={comment.author.avatarUrl || USER_DEFAULT_AVATAR}
        handle={comment.author.handle}
        isOP={comment.author.id === user.id}
      >
        {comment.content}
      </UserComment>

      {comment.replies.length > 0 && (
        <div className="ml-8 pl-4 space-y-4">
          {viewReplies && comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
