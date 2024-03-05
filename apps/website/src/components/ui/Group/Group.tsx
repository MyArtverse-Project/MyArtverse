export default function GroupContents({ children }: { children?: React.ReactNode }) {
  return (
    <section
      /**
       * This attr is for when users customize their profiles by assigning
       * a letter and a number
       *
       * i.e. "l" for left and "r" for right, ff. by the index number
       */
      data-group-placement="l5"
      className="grid-cols-resizable grid grid-rows-[auto_1fr] gap-x-2.5 gap-y-3"
    >
      {children}
    </section>
  )
}
