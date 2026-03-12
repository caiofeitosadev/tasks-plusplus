'use client';

import { Textarea } from '@/components/textarea';

type Props = {
  task: {
    id: string;
    task: string;
    public: boolean;
    created: string;
    user: string;
  };
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function TaskClient({ task, user }: Props) {
  return (
    <div className="bg-[#080d10] w-full min-h-[calc(100vh-80px)] flex flex-col">
      <main className="w-full max-w-7xl flex flex-col gap-4 p-6">
        <section className="flex flex-col gap-6">
          <h1 className="text-slate-50 text-3xl font-bold">Task</h1>
          <article className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900/80 transition-all">
            <p className="text-slate-200 whitespace-pre-wrap">{task.task}</p>
          </article>
        </section>
        <section className="flex flex-col gap-6 mt-10">
          <h2 className="text-slate-50 text-xl font-bold">Leave a comment</h2>
          <form action="" className="flex flex-col gap-6">
            <Textarea placeholder="Write your comment" />
            <button
              type="submit"
              className="bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-[0_0_15px_rgba(255,122,0,0.35)] cursor-pointer"
            >
              Comment
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
