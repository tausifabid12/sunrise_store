import { useAuth } from '@/context/AuthProvider/AuthProvider';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loading from '../Loading/Loadin';

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
    return <Loading />;
  }
  if (!user) {
    return null;
  } else {
    return children;
  }
};

export default PrivateRoute;
