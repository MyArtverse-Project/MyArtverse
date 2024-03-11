import { LuHeart, LuReply, LuThumbsUp } from "react-icons/lu"
import { Button } from "../Buttons"
import CommentWrapper from "./Wrapper"

export default function CommentItem({
  avatar,
  username,
  children,
  nestLevel
}: React.ComponentProps<typeof CommentWrapper> & { nestLevel?: number }) {
  return (
    <CommentWrapper avatar={avatar} username={username}>
      <div id="comment-contents" className="my-0.5">
        {children}
      </div>
      <div className="flex -translate-x-2 items-center gap-x-1">
        <Button
          icon={<LuThumbsUp size={18} />}
          className="hover:bg-300 flex items-center justify-center rounded-full p-2 transition-colors duration-150"
        />
        <span className="-ml-1 mr-1 text-[0.85rem]">12k</span>
        <Button
          icon={<LuHeart size={18} className="translate-y-[1px]" />}
          className="hover:bg-300 flex items-center justify-center rounded-full p-2 transition-colors duration-150"
        />
        <Button
          size="small"
          prefixIcon={<LuReply size={18} />}
          className="hover:bg-300 flex items-center justify-center gap-x-1.5 rounded-md px-2 py-1.5 transition-colors duration-150"
        >
          <span className="text-[0.85rem]">Reply</span>
        </Button>
      </div>
    </CommentWrapper>
  )
}
