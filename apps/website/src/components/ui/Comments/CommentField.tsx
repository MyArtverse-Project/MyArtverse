"use client"

import ReactQuill from "react-quill"
import CommentWrapper from "./Wrapper"

export default function CommentField({
  avatar,
  username
}: Omit<React.ComponentProps<typeof CommentWrapper>, "children">) {
  const quillModules = {
    toolbar: [["bold", "italic", "underline", "strike", "blockquote"]]
  }

  // prettier-ignore
  /* eslint-disable @stylistic/array-element-newline */
  const quillFormats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <CommentWrapper noAuthor avatar={avatar} username={username}>
      <ReactQuill
        className="font-open-sans w-full"
        modules={quillModules}
        formats={quillFormats}
        placeholder="Say something"
      />
    </CommentWrapper>
  )
}
