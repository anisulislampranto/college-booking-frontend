'use client';

import { useForm } from 'react-hook-form';
import { InputField } from '@/utils/InputField';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import GoogleLogin from '@/auth/GoogleLogin';
import Link from 'next/link';
import Button from '../../components/ui/Button';


export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, setUser, userType, setUserType } = useContext(AuthContext);
    const router = useRouter();
    const [btnState, setBtnState] = useState('');

    const onSubmit = async (data) => {
        setBtnState('loading'); 
        try {

          const userInfo  = {
            ...data,
            type: userType === 'student' ? 'student' : userType === 'college' ? 'collegeAdmin' : ''
          }

          const options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(userInfo)      
          }
    
          const res  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, options);
    
          const userData = await res.json();
    
          if (res.status === 401) {
              setBtnState('failed');
              alert("User doesn't exist")
              setTimeout(() => {
                setBtnState('') 
            }, 2000);
          }
    
            if (res.status === 403) {
              setBtnState('');
              alert('Already have an account try login')
              router.push('login')
          }
    
          if (userData.data?.email) {
    
            localStorage.setItem('token', userData.data.token)
            localStorage.setItem('user', JSON.stringify(userData.data));
    
            setUser(userData.data);
            setBtnState('success');
            setTimeout(() => {
                setBtnState('');
            }, 2000);
          } 

        } catch (error) {
            setBtnState('failed')
            setTimeout(() => {
                setBtnState('') 
            }, 2000);
            console.log('error', error);
        }
    };

  useEffect(() => {
    if (user?.email) {
      router.back();
    }
  }, [user, router]);


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-9 px-5 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
          {userType} Sign Up
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white border border-black px-6 py-12 shadow-2xl sm:px-12">
            <div className="flex bg-black p-1 rounded-md">
                <button
                    type="button"
                    onClick={() => setUserType('college')}
                    className={`flex-1 p-1 ${userType === 'college' ? 'bg-white text-black' : ' bg-black text-white'}  rounded-md`}
                >
                    College
                </button>
                <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`flex-1 p-1 ${userType === 'student' ? 'bg-white text-black' : 'bg-black text-white'} rounded-md`}
                >
                    Student
                </button>
            </div>
          
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
              <InputField
                  label="Full Name"
                  id="name"
                  validation={{ required: "Full name is required" }}
                  register={register}
                  errors={errors}
              />

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

                <div className="text-sm leading-6">
                  <div className="font-semibold flex gap-1">
                    Already have an account?
                    <Link href='/login' className=" cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500" >
                        Log In
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <Button width={'w-full'} type={'submit'} text={ `${ btnState  === 'loading' ? 'Submitting. . .' : btnState === 'success' ? 'Success' : btnState === 'failed' ? 'failed' : 'Sign Up'}` } />
              </div>

            </form>

                {
                  userType !== 'college' &&
                      <div>
                        <div className="relative mt-8">
                          <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                          </div>
                          <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-6 text-gray-900">Or continue with</span>
                          </div>
                        </div>
                        <GoogleLogin />
                      </div>
                }
            </div>
        </div>
      </div>
    </>
  );
}
