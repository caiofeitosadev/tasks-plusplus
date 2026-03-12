import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';
export const metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  return <DashboardClient user={session.user} />;
}
