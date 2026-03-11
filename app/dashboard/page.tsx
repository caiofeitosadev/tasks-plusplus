import { Textarea } from '@/components/textarea';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
export const metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="bg-[#080d10] w-full min-h-[calc(100vh-80px)] flex justify-center">
      <main className="w-full max-w-7xl flex flex-col gap-4 p-6">
        <h1 className="text-slate-50 text-3xl font-bold">Add a new task</h1>

        <form className="flex flex-col gap-6">
          <Textarea placeholder="Start writing your new task" />

          <label className="text-slate-300 flex items-center gap-2">
            <input
              type="checkbox"
              name="task"
              className="w-4 h-4 accent-[#ff7a00]"
            />
            Make task public
          </label>

          <button
            type="submit"
            className="bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-[0_0_15px_rgba(255,122,0,0.35)]"
          >
            Add task
          </button>
        </form>
        <section className="flex flex-col gap-4 mt-10">
          <h2 className="text-3xl text-slate-50 font-bold">My tasks</h2>
          <article className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[#ff7a00] bg-[#ff7a00]/10 px-2 py-1 rounded text-xs font-medium">
                PUBLIC
              </span>

              <button className="text-slate-400 hover:text-white transition cursor-pointer">
                <FiShare2 size={20} color="#f8fafc" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-200">My first example task</p>

              <button className="text-slate-400 hover:text-red-400 transition cursor-pointer">
                <FaTrash />
              </button>
            </div>
          </article>
          <article className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[#ff7a00] bg-[#ff7a00]/10 px-2 py-1 rounded text-xs font-medium">
                PUBLIC
              </span>

              <button className="text-slate-400 hover:text-white transition cursor-pointer">
                <FiShare2 size={20} color="#f8fafc" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-200">My first example task</p>

              <button className="text-slate-400 hover:text-red-400 transition cursor-pointer">
                <FaTrash />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
