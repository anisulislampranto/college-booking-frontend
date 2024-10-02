'use client';

import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
    const { user } = useContext(AuthContext)
    
    console.log('user', user);

    return (
        <div className=' container mx-auto px-5 py-20'>
            <h1 className=' text-3xl '>My Colleges</h1>

            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {user?.colleges?.map((college) => (
                    <li key={college._id} className="p-4 border rounded-sm flex flex-col gap-2">
                        <div className=' relative h-56 w-full'>
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`} className=' rounded-sm absolute object-cover' alt={'college.image'} fill />
                        </div>
                        <h3 className="text-lg font-semibold">{college.name}</h3>

                        <Link href={`/colleges/${college._id}`}  className=' w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
