import ThirdPartyButtons from '@/components/layouts/Auth/ThirdPartyButtons'
import { Button } from '@mav/ui/components/buttons'
import { InputField } from '@mav/ui/components/fields'
import Image from 'next/image'
import React from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'

export default function Page() {
    return (
        <div className='relative w-screen h-1/2 mx-auto flex flex-col gap-y-6 items-center bg-100 py-12'>
            <Image src="/Backdrop.png" alt="Backdrop" height={250} width={2000} className='z-0 h-1/4' />
            <div className='w-1/2 justify-center items-center flex flex-col gap-y-6 bg-100 p-12 rounded-lg shadow-md z-10 absolute border-2 border-200'>
                <h1 className='text-700 text-2xl z-10'>Sign in to MyArtverse</h1>
                <ThirdPartyButtons />
                <p>or</p>
                <div className='w-2/3'>
                    <InputField placeholder='Email' type='email' inputName='Email or Login' />
                    <Button variant='primary' position='center' className='w-full mt-4 text-center'>
                        <span className='w-max'>Next</span>
                    </Button>
                </div>
                <div className="flex flex-row gap-x-6">
                    <a href='#' className='text-500 text-sm'>Forgot password?</a>
                    <a href='#' className='text-500 text-sm'>Create an account</a>
                </div>
            </div>
        </div>
    )
}
