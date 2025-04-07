'use client'

import { useEffect, useState } from 'react';
import { fetchUserData } from '@/utils/api';
import Image from 'next/image';

export default function Creation() {
  const [profile, setProfile] = useState<{ handle: string; avatarUrl: string } | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchUserData();
      setProfile(data);
    };

    getProfile();
  }, []);

  if (!profile) return <div className="text-white">Loading...</div>;

  return (
    <>
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={150}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/6 w-full object-cover"
      />
      <div className='flex flex-col items-center'>
        <div className="flex items-center gap-x-4 bg-100 z-50 absolute p-4 rounded-lg">
          <Image alt={`@${profile.handle}'s Avatar`} src={profile.avatarUrl} width={50} height={50} />
          <span className='text-700 text-2xl'>@{profile.handle}</span>
        </div>
        <div className='relative flex flex-col items-center justify-center gap-y-8 pt-36'>
          <h1 className='text-3xl'>Create a Character</h1>
          <p className='text-2xl'>Awesome, you're avatar has been set.</p>
          <div className='flex flex-row gap-x-4'>
            <div className='bg-100 p-4 rounded-md inset-shadow-xs'>
              <Image src="/UserBanner.svg" alt="Banner" width={500} height={200} className="rounded-md mb-3" />
              <h1 className='text-2xl'>Create a Character</h1>
              <p className='text-xl'>Awesome, you're avatar has been set.</p>
            </div>
            <div className='bg-100 p-4 rounded-md inset-shadow-xs'>
              <Image src="/UserBanner.svg" alt="Banner" width={500} height={200} className="rounded-md mb-3" />
              <h1 className='text-2xl'>Import from Toyhou.se</h1>
              <p className='text-xl'>Awesome, you're avatar has been set.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
