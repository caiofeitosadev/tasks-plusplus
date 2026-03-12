import { db } from '@/lib/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import TaskClient from './task-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'Task Details',
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function TaskPage({ params }: Params) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  const docRef = doc(db, 'tasks', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    redirect('/');
  }

  const data = snapshot.data();

  if (!data.public) {
    redirect('/');
  }

  const miliseconds = data.created?.seconds * 1000;

  const task = {
    id,
    task: data.task,
    public: data.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: data.user,
  };

  return <TaskClient task={task} user={session?.user} />;
}
