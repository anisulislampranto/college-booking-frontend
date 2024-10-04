'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';


export default function CollegeDetailsClient({ collegeDetails }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
  
    if (!collegeDetails) return <div className="h-screen text-center flex items-center justify-center">No details found for this college.</div>;
  
    if (!loading && !user) {
      router.push('/signup');
    }
  
    return (
      <div className="container mx-auto py-10 p-5 space-y-4">
        <img src={collegeDetails.image} alt="img" className="h-[20rem] md:h-[30rem] w-full" />
        <h1 className="text-5xl capitalize">{collegeDetails.name}</h1>
  
        {/* Events Section */}
        <div>
          <p className="text-3xl">Events:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {collegeDetails?.events?.map((el) => (
              <li key={el._id} className="shadow-md rounded-sm p-5">
                <img src={el.image} alt="img" className="h-36 w-full" />
                <h3 className="capitalize text-xl"> {el.name} </h3>
                <p> Date: {el.date} </p>
                <p> {el.description} </p>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Sports Section */}
        <div>
          <p className="text-3xl">Sports:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {collegeDetails?.sports?.map((el) => (
              <li key={el._id} className="shadow-md rounded-sm p-5">
                <img src={el.image} alt="img" className="h-36 w-full" />
                <h3 className="capitalize text-xl"> {el.name} </h3>
                <p> {el.description} </p>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Researches Section */}
        <div>
          <p className="text-3xl">Researches:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {collegeDetails?.researches?.map((el) => (
              <li key={el._id} className="shadow-md rounded-sm p-5">
                <img src={el.image} alt="img" className="h-36 w-full" />
                <h3 className="text-xl capitalize"> {el.name} </h3>
                <p> {el.description} </p>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Admission Process */}
        <div className="flex flex-col gap-10 mt-10">
          <h3 className="text-xl font-semibold">Admission Process:</h3>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
          <Link href={'/admission'} className="text-center w-36 p-2 bg-black text-white rounded-md">
            Take Admission
          </Link>
        </div>
      </div>
    );
  }