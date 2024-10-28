import { AnimatedTooltip } from '@/utils/AnimatedTooltip';
import Image from 'next/image';
import React from 'react'

export default async function ResearchServer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/researches`);
    const data = await res.json();

    return (
        <div className=' container mx-auto p-5 py-20'>
            <h1 className=' text-3xl'>Researches</h1>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.researches.length !== 0 ? data?.researches?.map((el) => (
                    <li key={el._id} className="p-4 border rounded-sm flex justify-between flex-col gap-2">
                        <div className=' relative h-56 w-full'>
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} className=' rounded-sm absolute object-cover' alt={'el.image'} fill />
                        </div>

                        <h3 className="text-lg font-semibold">{el.name}</h3>
                        <h3 className="">{el.description}</h3>

                        <div className='my-5 w-full space-y-2'>
                            <p className=' text-lg'>Participants</p>
                            <div className="flex flex-row flex-wrap items-start justify-start">
                                <AnimatedTooltip items={el.participants} />
                            </div>
                        </div>

                    </li>
                )) : <p className=' text-center col-span-3'>No Researches available at the moment</p>}
            </ul>
        </div>
    )
}
