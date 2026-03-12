'use client';

import { Textarea } from '@/components/textarea';
import { db } from '@/lib/firebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

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
type CommentsProps = {
  id: string;
  taskId: string;
  comment: string;
  user: string;
  userEmail: string;
  created: string;
};

export default function TaskClient({ task, user }: Props) {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState<CommentsProps[]>([]);

  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('taskId', '==', task.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsList: CommentsProps[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        const miliseconds = data.created?.seconds * 1000;

        return {
          id: doc.id,
          taskId: data.taskId,
          comment: data.comment,
          user: data.user,
          userEmail: data.userEmail,
          created: new Date(miliseconds).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        };
      });
      setComments(commentsList);
      console.log(commentsList);
    });
    return () => unsubscribe();
  }, [task.id]);

  async function handleComment(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (input === '') return;
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        comment: input,
        created: new Date(),
        userEmail: user.email,
        user: user.name,
        taskId: task.id,
      });
      setInput('');
    } catch (err) {
      console.log(err);
    }
  }

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
          <form onSubmit={handleComment} className="flex flex-col gap-6">
            <Textarea
              placeholder="Write your comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#ff7a00] hover:bg-[#ff8f26] text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-[0_0_15px_rgba(255,122,0,0.35)] cursor-pointer disabled:cursor-not-allowed"
              disabled={!user}
            >
              Comment
            </button>
          </form>
        </section>
        <section className="flex flex-col gap-4 mt-6">
          {comments.map((item) => (
            <article
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="bg-[#ff7a00]/10 text-[#ff7a00] px-2 py-1 rounded-md text-xs font-medium">
                  {item.user}
                </span>

                <span className="text-slate-400 text-xs">{item.created}</span>
              </div>

              <p className="text-slate-200 whitespace-pre-wrap">
                {item.comment}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
