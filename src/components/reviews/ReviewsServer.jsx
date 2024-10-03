import React from 'react'

export default async function ReviewsServer() {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/reviews' )
    const data = await res.json()


    return (
        <div className=' container mx-auto py-20 px-5'>
            <h3 className=' text-3xl'>Reviews</h3>

            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.reviews?.map((review) => (
                    <li key={review._id} className="p-4 border rounded-sm flex flex-col gap-2">
                        <h4 className=' capitalize font-medium'>{review.collegeId.name}</h4>
                        <p>{review.reviewText}</p>
                        <p>{review.rating} / 10</p>
                        <p className=' text-sm'> by <strong>{review.userId?.name}</strong> </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
