import { InfiniteMovingCards } from '@/utils/InfiniteMovingCards'
import React from 'react'

export default async function ReviewsServer() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/reviews' )
    const data = await res.json()


    return (
        <>
            <div className='  container mx-auto px-5'>
                <h3 className=' text-3xl font-visbyRegular'>Reviews</h3>
            </div>
            <InfiniteMovingCards className={ 'mx-auto'} items={data.reviews} />
            <InfiniteMovingCards className={ 'mx-auto'} direction='right' items={data.reviews} />
        </>
    )
}
