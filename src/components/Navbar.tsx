"use client";

import { useSession } from "next-auth/react";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";

const geist = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
});

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <nav
      className={`bg-black text-white shadow-md ${geist.className} border-b-[1px] border-gray-600 tracking-tighter`}
    >
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between">
        {/* Pasty Branding */}
        <div className="flex items-center justify-center space-x-8">
          <div className="text-2xl font-bold tracking-wide">
            <span className="text-blue-400">P</span>asty
          </div>

          {/* API, Paste */}
          <ul className="text-sm flex space-x-10 text-gray-300">
            <li className="hover:bg-gray-600 rounded-md">
              <Link href="/paste" className="m-2">
                Paste
              </Link>
            </li>
          </ul>
        </div>

        {/* Sign Up, Log In */}
        {(status === "loading" || !data) && (
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link
                href="/register"
                className="border-[1px] px-2.5 py-1.5 rounded-md hover:bg-zinc-700 border-gray-600"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="transition-colors duration-200 bg-white text-black px-2.5 py-1.5 rounded-md hover:bg-zinc-300"
              >
                Log in
              </Link>
            </li>
          </ul>
        )}
        { data && (
          <Link
            href="/dashboard"
            className="transition-colors duration-200 bg-white text-black px-2.5 py-1.5 rounded-md hover:bg-zinc-300"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
