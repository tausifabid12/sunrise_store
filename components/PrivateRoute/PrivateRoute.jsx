import { useAuth } from '@/context/AuthProvider/AuthProvider';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || user) {
      console.log('logged In');
    } else {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>loading</p>;
  }
  if (!user) {
    return null;
  } else {
    return children;
  }
};

export default PrivateRoute;
