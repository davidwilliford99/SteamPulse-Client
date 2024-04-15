import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/GlobalDashboard');
  }, [router]); // Depend on 'router' to ensure it's available

  return (
    <h1>Redirecting...</h1>
  );
}
