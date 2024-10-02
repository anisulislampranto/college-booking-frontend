import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges`);
    const data = await res.json();

  return (
    <div className=' container mx-auto p-5 py-20'>
        <h1 className=' text-3xl'>Gallery</h1>
        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.colleges?.map((college) => (
                <li key={college._id} className="p-4 border rounded-sm flex flex-col gap-2">
                    <div className=' relative h-56 w-full'>
                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`} className=' rounded-sm absolute object-cover' alt={'college.image'} fill />
                    </div>
                    <h3 className="text-lg font-semibold">{college.name}</h3>
                    <p>Admission Date: {college.admissionDate}</p>
                    <div>
                        <strong> Events: </strong>
                        <ul className=' flex flex-wrap gap-2'>
                            {college.events?.map((el) => 
                                <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                                    {el.name}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <strong> Researches: </strong>
                        <ul className=' flex flex-wrap gap-2'>
                            {college.researches?.map((el) => 
                                <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                                    {el.name}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <strong> Sports: </strong>
                        <ul className=' flex flex-wrap gap-2'>
                            {college.sports?.map((el) => 
                                <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                                    {el.name}
                                </li>
                            )}
                        </ul>
                    </div>

                    <Link href={`/colleges/${college._id}`}  className=' w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>Details</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
