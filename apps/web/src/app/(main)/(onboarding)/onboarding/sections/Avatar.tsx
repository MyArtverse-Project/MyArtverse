'use client'

import { DropZone } from "@/components/Modals/DropZone";
import { useEffect, useState } from "react";
import { updateProfile } from '@/utils/api'
import { sleep } from "@/utils/utils";
import Image from "next/image";
import { User } from "@/app/context/AuthContext";

export default function AvatarSection({ user, onSuccess }: { user: User | null, onSuccess: () => void }) {
  const [uploadedUrl, setUploadedUrl] = useState("")

  useEffect(() => {
    if (uploadedUrl) {
      updateProfile(uploadedUrl)
      sleep(3000).then(() => onSuccess());
    }
  }, [uploadedUrl])

  return (
    <>
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={300}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/5 w-full object-cover"
      />
      <div className="flex flex-col justify-center items-center gap-y-8 transition-all duration-300">
        <DropZone setData={setUploadedUrl} />
        {uploadedUrl ? (
          <h1 className="text-3xl opacity-100 transition-opacity duration-300">
            Looking good!
          </h1>
        ) : (
          <h1 className="text-3xl opacity-100 transition-opacity duration-300">
            Welcome to MyArtverse, {user!.handle}!
          </h1>
        )}
      </div>
    </>

  )
}
