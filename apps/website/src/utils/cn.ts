import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...className: clsx.ClassValue[]) => {
  return twMerge(clsx(className))
}

export default cn
