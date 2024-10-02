import React from 'react'

export default async function ReviewsServer() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/reviews' )
    const data = await res.json()

    console.log('data', data);
    

    return (
        <div className=' container mx-auto py-20 px-5'>
            <h3 className=' text-3xl'>Reviews</h3>
        </div>
    )
}
