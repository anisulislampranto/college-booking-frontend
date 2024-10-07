'use client';

import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter()
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userReviews, setUserReviews] = useState([]);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`);
        const data = await response.json();
        
        
        // Filter reviews that belong to the current user
        const userSpecificReviews = data.reviews.filter(review => review.userId._id === user._id);

        setUserReviews(userSpecificReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [user]);

  // Handler for form submission
  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      collegeId: selectedCollegeId,
      userId: user._id
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      // Add the newly created review to the state
      setUserReviews(prevReviews => [...prevReviews, result.review]);

      console.log('Review submitted successfully:', result);

      // Reset form and close the review section
      reset();
      setSelectedCollegeId(null);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
        router.push('/signup');
    }
}, [loading, user, router]);

  return (
    <div className="container mx-auto px-5 py-20">
      <h1 className="text-3xl">My Colleges</h1>

      <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {user?.colleges?.map((college) => {
          const collegeReview = userReviews.find(review => review.collegeId._id === college._id);

          console.log('collegeReview', collegeReview);
          

          return (
            <li key={college._id} className="p-4 border rounded-sm flex flex-col gap-2">
              <div className="relative h-56 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`}
                  className="rounded-sm absolute object-cover"
                  alt={'college image'}
                  fill
                />
              </div>
              {/* <img src={college.image} className='h-56 w-full' alt="img" /> */}
              <h3 className="text-lg font-semibold">{college.name}</h3>

              {collegeReview ? (
                <div>
                    <p>Rating: {collegeReview.rating}/10</p>
                    <p className=' text-sm mt-2'>Review:</p>
                    <p>{collegeReview?.reviewText}</p>
                    <p className="text-sm mt-2">by {user.name}</p>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCollegeId(selectedCollegeId === college._id ? null : college._id)}
                  className="w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md"
                > 
                  {
                    selectedCollegeId === college._id ? 'Close' : 'Review'
                  }
                </button>
              )}

              {selectedCollegeId === college._id && (
                <div className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label htmlFor="reviewText" className="block text-sm font-medium">Review</label>
                      <input
                        type="text"
                        placeholder="Review Text"
                        {...register('reviewText', { 
                          required: 'Review text is required' 
                        })}
                        className="mt-1 block w-full p-2 border rounded-md"
                      />
                      {errors.reviewText && <span className="text-red-500">{errors.reviewText.message}</span>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
                      <input
                        type="number"
                        placeholder="Rating out of 10"
                        {...register('rating', { 
                          required: 'Rating is required', 
                          min: { value: 1, message: 'Rating must be at least 1' },
                          max: { value: 10, message: 'Rating cannot exceed 10' }
                        })}
                        className="mt-1 block w-full p-2 border rounded-md"
                      />
                      {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
