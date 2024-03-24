export default function RichTextField({ inputName }: { inputName: string }) {
  return (
    <div className="h-32 w-full space-y-2">
      <span className="text-600 flex gap-x-0.5 font-bold uppercase">{inputName}</span>
      <textarea
        id={inputName.toLowerCase()}
        className="text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2"
      />
    </div>
  )
}
