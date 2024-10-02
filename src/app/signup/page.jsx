'use client';

import { useForm } from 'react-hook-form';
import { InputField } from '@/utils/InputField';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import GoogleLogin from '@/auth/GoogleLogin';


export default function Signup() {
    const [page, setPage] = useState('signup')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async (data) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)      
        }
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/${ page === 'signup' ? 'signup' : 'login' }`, options);
        const user = await res.json();

        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify(user))

    } catch (error) {
        console.log('error', error);
    }
  };

  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user, router]);


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-9 px-5 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {page === 'signup' ? 'Sign Up' : 'Sign In' } to your account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {
                    page === 'signup' &&
                        <InputField
                            label="Full Name"
                            id="name"
                            validation={{ required: "Full name is required" }}
                            register={register}
                            errors={errors}
                        />
                }

              <InputField
                label="Email address"
                id="email"
                type="email"
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                }}
                register={register}
                errors={errors}
              />

              <InputField
                label="Password"
                id="password"
                type="password"
                validation={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                }}
                register={register}
                errors={errors}
              />

              <div className="flex items-center justify-between">
                {/* <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}

                <div className="text-sm leading-6">
                  <div className="font-semibold">
                    {
                        page == 'signup' ? 'Already have an account? ' : "Don't have an account? "
                    }
                    
                    {
                        page === 'signup' ? 
                        <span className=" cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setPage('signin')}>
                            Sign In
                        </span> : 
                        <span className=" cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => setPage('signup')}>
                            Sign Up
                        </span> 
                    }
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    { page == 'signup' ? 'Sign Up' : "Sign In" }
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
              </div>

                <GoogleLogin />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
