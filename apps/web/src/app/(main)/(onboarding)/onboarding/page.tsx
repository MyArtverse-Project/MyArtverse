'use client'

import { useAuth } from "@/app/context/AuthContext";
import AvatarSection from "./sections/Avatar";
import { redirect } from "next/navigation";
import { useState } from "react";
import Creation from "./sections/Creation";

export default function OnboardingPage() {
  const { isLoading, user } = useAuth();
  const [section, setSection] = useState(0);
  const handleSuccess = () => setSection(prev => prev + 1);
  if (!isLoading && !user) return redirect('/login');


  if (!isLoading) {
    return (
      <div className="bg-100 relative flex min-h-screen w-full items-start justify-center px-6 pt-36">
        {section === 0 && <AvatarSection user={user} onSuccess={handleSuccess} />}
        {section === 1 && <Creation />}
      </div>
    );
  }

  return null;
}
