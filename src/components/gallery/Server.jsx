import { InfiniteMovingCards } from '@/utils/InfiniteMovingCards'
import React from 'react'
import AddGalleryImageClient from '../AddGalleryImage/AddGalleryImageClient'

export default async function GalleryServer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery`)
    const data = await res.json();

    const resColleges = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges`);
    const dataColleges = await resColleges.json();


    return (
        <div className=' container mx-auto p-5 space-y-3'>
            <div className=' flex justify-between'>
                <h1 className=' text-3xl'>Gallery</h1>
                <AddGalleryImageClient colleges={dataColleges.colleges} />
            </div>
            {
                    data.length !== 0 && 
                    <InfiniteMovingCards items={data} type={'image'} />
                }
            {
                    data.length !== 0 && 
                    <InfiniteMovingCards items={data} type={'image'} direction='right' />
                }
            {
                    data.length !== 0 && 
                    <InfiniteMovingCards items={data} type={'image'} />
                }
        </div>
    )
}
