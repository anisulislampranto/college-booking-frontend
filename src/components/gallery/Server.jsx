import { WobbleCard } from '@/utils/WobbleCard'
import Image from 'next/image'
import React from 'react'

export default async function GalleryServer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery`)
    const data = await res.json()


    return (
        <div className=' container mx-auto p-5 space-y-3'>
            <h1 className=' text-3xl'>Gallery</h1>
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {
                    data?.map((el) => 
                        <WobbleCard key={el._id} className=' relative h-56 w-full'>
                            <Image quality={70} className=' absolute object-cover rounded-md' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} alt='img' fill />
                            <p className=' rounded-md absolute bottom-5 text-xl left-3 text-white capitalize backdrop-blur-md p-2'>{el.college?.name}</p>
                        </WobbleCard>
                    )
                }
            </div>
        </div>
    )
}
