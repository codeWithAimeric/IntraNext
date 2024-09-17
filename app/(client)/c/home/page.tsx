import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {

  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center m-6">
      <h1 className="text-3xl my-4 font-semibold text-gray-800">
        Welcome, {session?.user?.email}
      </h1>
    </div>

  );
}
