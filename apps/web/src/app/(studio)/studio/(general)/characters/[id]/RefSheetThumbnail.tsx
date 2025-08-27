import { ReferenceSheet } from '@/types/characters'
import { cn } from '@mav/shared/utils'
import Image from 'next/image'
import React from 'react'

export default function RefSheetThumbnail({ refSheet }: { refSheet: ReferenceSheet }) {
  const image = refSheet.variants.find(v => v.main)?.url || '/DefaultReferenceSheet.png'
  return (
    <div className={cn('flex flex-row', refSheet.active ? 'bg-background' : 'bg-muted', 'p-2 rounded-lg gap-x-4 items-center')}>
      <Image
        width={256}
        height={144}
        src={image}
        alt="Reference Preview"
        className="w-64 h-36 rounded object-contain"
      />
      <div className='flex flex-col'>
        <h1 className='text-700 text-2xl'>{refSheet.name}</h1>
        {/* TODO: Artist goes here */}
        <p>Artist Goes here</p>
        <p className='text-subtext'>Contains {refSheet.variants.length} variants</p>
      </div>
    </div>
  )
}
