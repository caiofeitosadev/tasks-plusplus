'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Textarea } from '@/components/textarea';
import { FaTrash } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

import { db } from '../../lib/firebaseConnection';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import Link from 'next/link';

type UserProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

type TaskProps = {
  id: string;
  task: string;
  isPublic: boolean;
};

export default function DashboardClient({ user }: UserProps) {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [publicTask, setPublicTask] = useState(false);

  useEffect(() => {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('userEmail', '==', user?.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList: TaskProps[] = [];

      snapshot.forEach((doc) => {
        taskList.push({
          id: doc.id,
          task: doc.data().task,
          isPublic: doc.data().public,
        });
      });
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, [user]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(
    event: React.SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (input === '') return;
    try {
      await addDoc(collection(db, 'tasks'), {
        task: input,
        created: new Date(),
        user: user?.name,
        userEmail: user?.email,
        public: publicTask,
      });
      setInput('');
      setPublicTask(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`,
    );
  }
  async function handleDeleteTask(id: string) {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
  }

  return (
    <div className="bg-[#080d10] w-full min-h-[calc(100vh-80px)] flex justify-center">
      <main className="w-full max-w-7xl flex flex-col gap-4 p-6">
        <h1 className="text-slate-50 text-3xl font-bold">Add a new task</h1>

        <form className="flex flex-col gap-6" onSubmit={handleRegisterTask}>
          <Textarea
            placeholder="Start writing your new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <label className="text-slate-300 flex items-center gap-2">
            <input
              type="checkbox"
              name="task"
              className="w-4 h-4 accent-[#ff7a00]"
              checked={publicTask}
              onChange={handleChangePublic}
            />
            Make task public
          </label>

          <button
            type="submit"
            className="bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-[0_0_15px_rgba(255,122,0,0.35)] cursor-pointer"
          >
            Add task
          </button>
        </form>
        <section className="flex flex-col gap-4 mt-10">
          <h2 className="text-3xl text-slate-50 font-bold">My tasks</h2>

          {tasks.map((task) => (
            <article
              key={task.id}
              className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900/80 transition-all"
            >
              <div className="flex items-center justify-between">
                {task.isPublic && (
                  <span className="text-[#ff7a00] bg-[#ff7a00]/10 px-2 py-1 rounded text-xs font-medium">
                    PUBLIC
                  </span>
                )}

                <button
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                  onClick={() => handleShare(task.id)}
                >
                  <FiShare2 size={20} color="#f8fafc" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                {task.isPublic ?
                  <Link href={`/task/${task.id}`}>
                    <p className="text-slate-200">{task.task}</p>
                  </Link>
                : <p className="text-slate-200">{task.task}</p>}

                <button
                  className="text-slate-400 hover:text-red-400 transition cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
