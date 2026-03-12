'use client';

import { Textarea } from '@/components/textarea';
import { db } from '@/lib/firebaseConnection';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [task.id]);

  async function handleComment(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (input === '') return;
    if (!user) return;

    try {
      await addDoc(collection(db, 'comments'), {
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

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, 'comments', id);
      await deleteDoc(docRef);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-[#080d10] w-full min-h-[calc(100vh-80px)] flex flex-col">
      <main className="w-full max-w-7xl flex flex-col gap-8 p-6">
        <section className="flex flex-col gap-4">
          <h1 className="text-slate-50 text-3xl font-bold">Task</h1>

          <article className="bg-slate-900/70 border border-slate-700 rounded-md p-4 transition-all">
            <p className="text-slate-200 whitespace-pre-wrap">{task.task}</p>
          </article>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-slate-50 text-xl font-bold">Leave a comment</h2>

          <form onSubmit={handleComment} className="flex flex-col gap-4">
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

        <section className="flex flex-col gap-4">
          <h3 className="text-slate-300 text-sm font-medium">
            Comments ({comments.length})
          </h3>

          {loading && (
            <>
              <div className="animate-pulse bg-slate-900 border border-slate-800 rounded-md p-4 h-20" />
              <div className="animate-pulse bg-slate-900 border border-slate-800 rounded-md p-4 h-20" />
            </>
          )}

          {!loading &&
            comments.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900/70 border border-slate-700 rounded-md p-4 flex flex-col gap-3 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
                      {item.user.charAt(0)}
                    </div>

                    <span className="bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-md text-xs font-medium">
                      {item.user}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-xs">
                      {item.created}
                    </span>

                    {item.userEmail === user?.email && (
                      <button
                        className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                        onClick={() => handleDeleteComment(item.id)}
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-slate-200 whitespace-pre-wrap text-sm">
                  {item.comment}
                </p>
              </article>
            ))}
        </section>
      </main>
    </div>
  );
}
