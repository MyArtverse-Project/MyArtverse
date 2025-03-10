import Image from 'next/image';
import Link from 'next/link';
import React, { useActionState } from 'react';
import { loginAction } from '@/app/actions/login';
import ThirdPartyButtons from '@/components/layouts/Auth/ThirdPartyButtons';
import { Button } from '@mav/ui/components/buttons';
import { Form, InputField } from '@mav/ui/components/fields';
import { z } from 'zod';
import { type FormState } from '@/app/lib/definition';

export default function Page() {
  return (
    <div className="bg-100 relative mx-auto flex h-1/2 w-screen flex-col items-center gap-y-6 py-12">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="z-0 h-1/4"
      />
      <div className="bg-100 border-200 absolute z-10 flex w-1/2 flex-col items-center justify-center gap-y-6 rounded-lg border-2 p-12 shadow-md">
        <h1 className="text-700 z-10 text-2xl">Sign in to MyArtverse</h1>
        <ThirdPartyButtons />
        <p>or</p>
        <Form action={loginAction} className="w-2/3">
          <InputField type="text" inputName="email" placeholder="Email" key={"email"} />
          {/* TODO: Implement Login Animations */}
          <InputField
            type="password"
            key={"password"}
            inputName="password"
            placeholder="Password"
          />
          <Button
            variant="primary"
            position="center"
            className="mt-4 w-full text-center"
          >
            <span className="w-max">Next</span>
          </Button>
        </Form>
        <div className="flex flex-row gap-x-6">
          <Link href="/forgot-password" className="text-500 text-sm">
            Forgot password?
          </Link>
          <Link href="/register" className="text-500 text-sm">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}