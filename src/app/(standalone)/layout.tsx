import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="relative min-h-screen bg-[#f5f8ff] overflow-x-hidden">
      {/* Static background decorations - responsive sizes */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full bg-blue-50/40 -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full bg-blue-50/40 -z-10" />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 relative">
        {/* Navigation - responsive padding and sizing */}
        <nav className="flex justify-between items-center h-14 sm:h-16 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm mx-2 sm:mx-4 my-2 px-3 sm:px-4 rounded-full">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-full bg-white shadow-sm">
              <Image
                src="/logo.svg"
                height={28}
                width={28}
                alt="Taskera"
                className="w-6 h-6 sm:w-8 sm:h-8"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-blue-700">
              Taskera
            </span>
          </Link>
          <UserButton />
        </nav>

        {/* Main Content - responsive spacing */}
        <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-2 sm:px-4">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-800 tracking-tight">
                Welcome to{" "}
                <span className="text-blue-700 whitespace-nowrap">Taskera</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4 sm:px-6">
                Create your first workspace and start organizing your projects.
                We&apos;re here to help you collaborate better!
              </p>
            </div>

            {/* <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md shadow-lg border border-neutral-200/50 p-6 sm:p-8 rounded-xl"> */}
            <div className="flex flex-col items-center justify-center">
              {children}
            </div>
            {/* </div> */}

            <footer className="text-center text-xs sm:text-sm text-neutral-500 pt-4">
              <p>© 2024 Taskera. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
