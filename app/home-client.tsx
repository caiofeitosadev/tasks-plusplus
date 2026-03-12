import Image from 'next/image';
import logoImg from '../public/logo-hero.png';

type Props = {
  posts: number;
  comments: number;
};

export default function Home({ posts, comments }: Props) {
  return (
    <div className="w-full bg-[#080d10] flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <main className="w-full max-w-7xl flex flex-col justify-center items-center gap-6 p-5">
        <div className="flex justify-center">
          <Image
            alt="Logo Tasks++"
            src={logoImg}
            priority
            className="w-48 sm:w-64 md:w-80 lg:w-105 object-contain"
          />
        </div>

        <h1 className="text-slate-50 font-bold text-3xl sm:text-4xl md:text-5xl text-center leading-tight mt-4 max-w-3xl mx-auto">
          System designed for you to organize your studies and tasks
        </h1>
        <p className="text-slate-400 text-center max-w-xl mx-auto mt-4">
          Create tasks, share them publicly and receive feedback from other
          users.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <span className="bg-slate-900/70 hover:bg-slate-800/80 backdrop-blur-sm text-slate-300 py-3 px-6 rounded-sm border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <span className="text-[#ff7a00] font-semibold">{posts}</span> posts
          </span>

          <span className="bg-slate-900/70 hover:bg-slate-800/80 backdrop-blur-sm text-slate-300 py-3 px-6 rounded-sm border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <span className="text-[#ff7a00] font-semibold">{comments}</span>{' '}
            comments
          </span>
        </div>
      </main>
    </div>
  );
}
