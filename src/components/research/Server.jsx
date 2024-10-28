import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ResearchServer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/researches`);
    const data = await res.json();

    return (
        <div className=' container mx-auto p-5 py-20'>
            <h1 className=' text-3xl'>Researches</h1>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.researches.length !== 0 ? data?.researches?.map((el) => (
                    <li key={el._id} className="p-4 border rounded-sm flex flex-col gap-2">
                        <div className=' relative h-56 w-full'>
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} className=' rounded-sm absolute object-cover' alt={'el.image'} fill />
                        </div>
                        {/* <img src={`${el.image}`} className=' h-20 w-24' alt={'college.image'} /> */}
                        
                        <h3 className="text-lg font-semibold">{el.name}</h3>
                        <h3 className="">{el.description}</h3>

                        <Link href={`https://medium.com/@write4research`}  className=' w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>Details</Link>
                    </li>
                )) : <p className=' text-center col-span-3'>No Researches available at the moment</p>}
            </ul>
        </div>
    )
}
