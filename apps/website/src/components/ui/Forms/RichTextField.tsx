interface IRichTextFieldProps {
  inputName: string
}

export default function RichTextField({ inputName }: IRichTextFieldProps) {
  return (
    <div className="h-32 w-full space-y-2">
      <span className="text-600 flex gap-x-0.5 font-bold uppercase">Bio</span>
      <textarea
        id="likes"
        className="text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2"
      />
    </div>
  )
}
