import { db } from '@/lib/firebaseConnection';
import { collection, getDocs } from 'firebase/firestore';
import HomeClient from './home-client';

export const revalidate = 60;

export default async function Home() {
  const commentsRef = collection(db, 'comments');
  const postsRef = collection(db, 'tasks');

  const commentsSnapshot = await getDocs(commentsRef);
  const postsSnapshot = await getDocs(postsRef);

  const comments = commentsSnapshot.size || 0;
  const posts = postsSnapshot.size || 0;

  return <HomeClient posts={posts} comments={comments} />;
}
