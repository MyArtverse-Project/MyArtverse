'use client'

import {Input} from "postcss";
import {useState} from "react";

export default function Page({}) {
  const [displayName, setDisplayName] = useState("")
  // TODO: Check if the user has created an account, if so... redirect them to their profile
  const username = "FluffyJane"

  return (
    <div className="flex flex-row py-16 justify-center items-center">
      <div className="w-1/3">
        {/*  TODO: Progress Line */}
        <p>p</p>
      </div>
      <div className="w-1/2 text-center">
        <h1
          className="text-4xl bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-500 text-transparent bg-clip-text">Welcome
          to MyFursona</h1>
        <p>Hello, {username}, we’re so glad to have you on board! Let’s get
          some of the nitty-gritty stuff done first. Don’t worry, you can
          change these anytime!</p>
        <section className="p-6">
          <h2>Profile Information</h2>
          <div>

            <input
              type="display"
              className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
              placeholder=""
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="user"
              className="w-full px-4 py-2 my-1 border rounded-md border-color-3"
              placeholder="@ozzythdev"
              value={username}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
