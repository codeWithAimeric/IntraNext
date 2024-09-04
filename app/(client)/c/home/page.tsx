import { auth } from '@/auth';

export default async function Home() {

  const session = await auth();
  
  return (
    <div>
      <h1>Bonjour, {session?.user?.email || 'User'}!</h1>
      <p>Bienvenu dans cette application.</p>
    </div>
  );
}
