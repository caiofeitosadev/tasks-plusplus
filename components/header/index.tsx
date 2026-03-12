'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-[#080d10] flex justify-center">
      <section className="w-full max-w-7xl flex items-center justify-between gap-6 px-5 h-20">
        <nav className="flex gap-6 items-center">
          <Link href={'/'}>
            <h1 className="text-slate-50 font-bold text-xl">
              Tasks<span className="text-[#ff7a00]">++</span>
            </h1>
          </Link>
        </nav>
        <div className="flex gap-5 items-center">
          {session ?
            <>
              <span className="text-white">Welcome, {session.user?.name}!</span>
              <Link
                href={'/dashboard'}
                className="cursor-pointer bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md transition-colors"
              >
                Dashboard
              </Link>
            </>
          : <button
              onClick={() => signIn()}
              className="cursor-pointer bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md transition-colors"
            >
              Get Started
            </button>
          }
        </div>
      </section>
    </header>
  );
}
