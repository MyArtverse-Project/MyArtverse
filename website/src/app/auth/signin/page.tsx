'use client'

import { Button } from "@/components/ui/Buttons";
import { pageMeta } from "@/utils";
import { FacebookIcon, TwitterIcon, LogInIcon } from 'lucide-react';
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useState } from "react";

const metadata = pageMeta({
    title: "Sign In - MyFursona",
    description:
        "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
});

export default function SignIn() {
    const [emailEntered, setEmailEntered] = useState(false);
    const [errors, setErrors] = useState<string[]>([])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const router = useRouter()

    const emailChecker = () => {
        if (!email) return;
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (EMAIL_REGEX.exec(email)?.length === 1) {
            setErrors([]);
            return setEmailEntered(true);
        }
        return setErrors(["Email is invalid!"]);
    }

    const submitLogin = () => {
        // TODO: Implement Sign In Functionality with AuthJS
    }

    return (
        <div className="w-1/4 my-16 mb-40 mx-auto flex flex-col">
            {errors && errors.length !== 0 ? (
                <div>
                    {errors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
            ) : null}
            <h2 className="text-center text-3xl my-4">Sign In</h2>
            <Button variant={"primary"} className="w-full my-1 p-2 flex text-center justify-center items-center border border-color-3 hover:bg-color-3 ease-in-out transition-all" prefixIcon={<FacebookIcon/>}> Login with Facebook</Button>
            <Button variant={"primary"} className="w-full my-1 p-2 flex text-center justify-center items-center border border-color-3 hover:bg-color-3 ease-in-out transition-all" prefixIcon={<TwitterIcon/>}>Login with Twitter</Button>
            <hr className="my-5 border border-[#8B7CB5]"></hr>
            <div className="relative w-full">
                <div className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${emailEntered ? '-translate-x-full' : 'translate-x-0'} ${emailEntered ? 'opacity-0' : 'opacity-100'}`}>
                    <input type="text" className="w-full my-1 px-4 py-2 border border-color-3 rounded-md" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Button onClick={() => emailChecker()} className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}>Next</Button>
                    <Button onClick={() => Router.push("/auth/signup")} className={`bg-color-3 hover:bg-color-4 my-2 w-full flex justify-center items-center py-2 px-4`}>Sign Up</Button>
                </div>
                <div className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${emailEntered ? 'translate-x-0' : 'translate-x-full'} ${emailEntered ? 'opacity-100' : 'opacity-0'}`}>
                    <input type="password" className="w-full my-1 px-4 py-2 border border-color-3 rounded-md" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button onClick={() => { }} className={`w-full flex items-center  justify-center py-2 px-4 bg-color-3 my-2 transition-all duration-500 `} >Login</Button>
                    <Button onClick={() => setEmailEntered(false)} className={`w-full flex items-center  justify-center py-2 px-4 bg-color-3 my-2 transition-all duration-500`}>Previous</Button>
                </div>
            </div>
        </div>
    );
}
