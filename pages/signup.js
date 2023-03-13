import { useAuth } from '@/context/AuthProvider/AuthProvider';
import UseToken from '@/hooks/UseToken';
import { GoogleAuthProvider } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillDingtalkCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const { createUser, socialLogin } = useAuth();
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const router = useRouter();
  const [token] = UseToken(createdUserEmail);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleAuth = (data, e) => {
    setLoading(true);
    createUser(data.email, data.password)
      .then((result) => {
        if (result?.user?.uid) {
          setCreatedUserEmail(result?.user?.email);
          setError('');
          router.push('/');
          toast.success('Sign Up success');
          setLoading(false);
          e.target.reset();
        }
      })
      .catch((error) => {
        setError(error.message);
        e.target.reset();
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    socialLogin(googleProvider)
      .then((result) => {
        if (result?.user?.uid) {
          setCreatedUserEmail(result?.user?.email);
          setError('');
          router.push('/');
          toast.success('login success');
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-primary lg:px-32 lg:py-12 ">
      <div className="bg-white h-screen lg:h-full w-full grid grid-cols-1 lg:grid-cols-2 lg:rounded-2xl shadow-lg">
        <div className="py-16 px-8 lg:p-20 space-y-10">
          <div>
            <h1 className="text-gray-900 text-4xl">Sign Up</h1>
            <p className="text-gray-600 text-sm font-semibold mt-2">
              Sing up to sunrise store to continue
            </p>
            <p className=" text-red-500 mt-2">
              {error.slice(10, error.length)}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleAuth)} className="">
            <input
              type="Email"
              placeholder="Enter Your Email"
              {...register('email', { required: true })}
              className="input input-bordered bg-transparent w-full max-w-xs mt-4 focus:ring-2 ring-primary focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm pt-2 font-semibold">
                This field is required
              </p>
            )}
            <input
              type="password"
              placeholder="Enter Your password"
              className="input input-bordered bg-transparent w-full max-w-xs mt-4 focus:ring-2 ring-primary focus:outline-none"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p className="text-red-600 text-sm pt-2 font-semibold ">
                This field is required
              </p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p className="text-red-600 text-sm pt-2 font-semibold ">
                Password must have 6 character
              </p>
            )}
            <p className="text-gray-500 text-sm mt-4">
              {`Already have an account?`}{' '}
              <Link href="/login" className="text-primary font-semibold">
                SignIn
              </Link>
            </p>

            <button
              type="submit"
              className={`btn btn-primary ${
                loading ? 'loading' : ''
              } text-white px-8 mt-7`}
            >
              Sign Up
            </button>
          </form>
          <div className="space-y-4">
            <div
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center space-x-3 border max-w-xs rounded-lg py-3 cursor-pointer"
            >
              <span className="">
                <FcGoogle size={24} />
              </span>
              <p className="font-semibold">SignIn With Google</p>
            </div>
          </div>
        </div>
        {/* ........... */}
        <div className="hidden lg:flex border-l border-gray-300  flex-col items-center justify-between p-14">
          <div
            href="/"
            className=" flex items-center px-4  text-primary space-x-2"
          >
            <span className="">
              <AiFillDingtalkCircle size={34} />
            </span>
            <p className="text-3xl font-bold">Sunrise Store</p>
          </div>
          {/* ...... */}
          <div className="space-y-7">
            <h2 className="text-3xl font-semibold text-center">
              Welcome to Sunrise Store!
            </h2>
            <p className="text-lg px-5 text-center">
              If you already have an account, would you like to log in right
              now?
            </p>
            <Link
              href="/login"
              className="bg-primary text-white mx-auto w-28 flex items-center justify-center py-3 rounded-lg font-semibold uppercase"
            >
              Sign In
            </Link>
          </div>
          {/* ...... */}
          <div className="flex space-x-5 text-primary font-semibold text-md">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
