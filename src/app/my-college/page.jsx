'use client';

import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddEventClient from '@/components/AddEvent/AddEventClient';
import AddResearch from '@/components/AddResearch/AddResearch';
import AddSport from '@/components/AddSport/AddSport';
import { Textarea } from '@headlessui/react';
import { Select, SelectItem } from '@nextui-org/react';


export default function Page() {
  const { user, setUser , loading } = useContext(AuthContext);
  const router = useRouter()
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userReviews, setUserReviews] = useState([]);
  const [collegeData, setCollegeData] = useState({});
  const [users, setUsers] = useState([])
  const [addEventModal, setAddEventModal] = useState(false);
  const [addResearchModal, setAddResearchModal] = useState(false);
  const [addSportModal, setAddSportModal] = useState(false);


  console.log('user', user);

    // Students of the college
    useEffect(() => {
        const fetchCollegeData = async() => {
            try {
                const collegeIds = user.colleges.map(college => college._id);
                console.log('collegeIds', collegeIds);

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/my-college${user.type === 'student' && '?status=approved'}`, {
                    method: 'PATCH',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: JSON.stringify(collegeIds)
                })

                const colleges = await res.json();

                console.log('res', res);
                console.log('colleges', colleges);

                if (res.ok) {
                  // setUsers(users.data)
                  console.log('colleges', colleges);
                
                }
            } catch (error) {
                console.log('err', error);
            }
        }

        if (user && user.colleges?.length) fetchCollegeData();

    }, [user?.email])


    // Students of the college
    useEffect(() => {
        (async()=>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?collegeId=${collegeData._id}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const users = await res.json()
                if (res.ok) {
                  setUsers(users.data)
                }
            } catch (error) {
                console.log('err', error);
            }
        })()
    }, [collegeData])

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

      if (response.ok) {
        // Add the newly created review to the state
        setUserReviews(prevReviews => [...prevReviews, result.review]);

        console.log('Review submitted successfully:', result);

        // Reset form and close the review section
        reset();
        setSelectedCollegeId(null);
      }

    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // handleAddEvent
  const handleAddEvent = (college) => {
    setCollegeData(college);
    setAddEventModal(true);
  }


  // handleAddResearch
  const handleAddResearch = (college) => {
    setCollegeData(college);
    setAddResearchModal(true);
  }


  // handleAddResearch
  const handleAddSport = (college) => {
    setCollegeData(college);
    setAddSportModal(true);
  }

  useEffect(() => {
    if (!loading && !user) {
        router.push('/signup');
    }
}, [loading, user, router]);

  return (
    <>
    <div className="container mx-auto px-5 py-20">
      <h1 className="text-3xl font-bold">My {`${user?.type === 'student' ? 'Colleges' : 'College'}`}</h1>

      <ul className={`mt-5 grid ${user?.type === 'student' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : ' grid-cols-1'}`}>
        { user?.colleges.length !== 0 ? user?.colleges?.filter(el => el.college?.name).map((college) => {
          console.log('college', college);
          
          const collegeReview = userReviews.find(review => review.collegeId?._id === college.college?._id);

          return (
            <li key={college?._id} className={`p-4 border rounded-sm flex flex-col gap-5 relative `}>
              <div className={`relative w-full ${user?.type === 'student' ? ' h-56 ' : 'h-[30rem]'}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college?.college?.image || college?.image}`}
                  className="rounded-sm absolute object-cover"
                  alt={'college image'}
                  fill
                />
              </div>
              <p className={` ${user.type !== 'student'} capitalize w-24 text-center z-40 p-1 rounded-md px-3 ${college.college.status == 'pending' ? 'bg-yellow-600 text-white' : college.college.status == 'approved' ? 'bg-green-600 text-white' : ''}`}>
                {college.college.status}
              </p>
              <h3 className={` ${user.type === 'student' ? 'text-lg' : ' text-5xl'} font-semibold`}>{college?.college?.name || college.name}</h3>

              {/*  */}
              <div>
                  <div className='flex justify-between'>
                    <strong>Events:</strong>
                    <button className={`border px-3 p-1 rounded-md group hover:border-green-600 ${ user.type === 'student' ? 'hidden' : 'block'}`} onClick={() => handleAddEvent(college)}>add event <span className='group-hover:text-green-600'>+</span></button>
                  </div>
                  <ul className='flex flex-wrap gap-2'>
                    {college?.college?.events?.length > 0 || college?.events?.length > 0 ? (
                      (college?.college?.events || college?.events).map((el) => (
                        <li key={el._id} className='shadow-md p-1 rounded-sm'>
                          {el.name}
                        </li>
                      ))
                    ) : (
                      <span>N/A</span>
                    )}
                  </ul>

                </div>
                <div>
                  <div className='flex justify-between'>
                    <strong>Researches:</strong>
                    <button className={`border px-3 p-1 rounded-md group hover:border-green-600 ${ user.type === 'student' ? 'hidden' : 'block'}`} onClick={() => handleAddResearch(college)}>add research <span className='group-hover:text-green-600'>+</span></button>
                  </div>
                  <ul className='flex flex-wrap gap-2'>
                      {college?.college?.researches?.length > 0 || college?.researches?.length > 0 ? (college?.college?.researches || college?.researches).map((el) =>
                      <li key={el._id} className='shadow-md p-1 rounded-sm'>
                        {el.name}
                      </li>
                    ) : 'N/A'}
                  </ul>
                </div>
                <div>
                  <div className='flex justify-between'>
                    <strong>Sports:</strong>
                    <button className={`border px-3 p-1 rounded-md group hover:border-green-600 ${ user.type === 'student' ? 'hidden' : 'block'}`} onClick={() => handleAddSport(college)}>add sport <span className='group-hover:text-green-600'>+</span></button>
                  </div>
                  <ul className='flex flex-wrap gap-2'>
                    {college?.college?.sports?.length > 0 || college?.sports?.length > 0  ? (college?.college?.sports || college?.sports)?.map((el) =>
                      <li key={el._id} className='shadow-md p-1 rounded-md px-2'>
                        {el.name}
                      </li>
                    ) : 'N/A'}
                  </ul>
                </div>
              {/*  */}

              {/*  */}
              {collegeReview ? (
                <div>
                    <p>Rating: {collegeReview.rating}/10</p>
                    <p className=' text-base my-2'>Review:</p>
                    <p> <span className=' text-green-600'>"</span> {collegeReview?.reviewText} <span className=' text-green-600'>"</span>  </p>
                    <p className="text-sm mt-2 font-bold">by {user.name}</p>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCollegeId(selectedCollegeId === college.college._id ? null : college.college._id )}
                  className={`w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md ${user.type === 'student' ? 'block' : 'hidden'}`}
                > 
                  {console.log('college', college)}
                  {
                    selectedCollegeId === college?.college?._id ? 'Close' : 'Review'
                  }
                </button>
              )}
              {/*  */}


              {/* Add Review by student */}
              {selectedCollegeId === college?.college?._id &&  (
                <div className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <Textarea
                        label='Review'
                        type="text"
                        placeholder="Review Text"
                        {...register('reviewText', { required: 'Review text is required' })}
                        className="mt-1 block w-full rounded-md"
                      />
                      {errors.reviewText && <span className="text-red-500">{errors.reviewText.message}</span>}
                    </div>

                    
                    <div className="mb-4">
                        <Select
                          label="Rate out of 10" 
                          className="w-full" 
                          {...register('rating', { 
                            required: 'Rating is required', 
                            min: { value: 1, message: 'Rating must be at least 1' },
                            max: { value: 10, message: 'Rating cannot exceed 10' }
                          })}
                        >
                            {Array.from({ length: 10 }, (_, index) => (
                              <SelectItem key={(index + 1).toString()}>
                                {(index + 1).toString()}
                              </SelectItem>
                            ))}
                        </Select>
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
        }) : <span className=' text-center col-span-3 text-5xl'>{user.type === 'student' ? 'Get Admission to see your colleges.' : 'Add College to see details here'}</span> }
      </ul>
    </div>

      {/* Add event */}
      <AddEventClient college={collegeData} open={addEventModal} setOpen={setAddEventModal} user={user} setUser={setUser} />
      
      {/* Add Research */}
      <AddResearch setUsers={setUsers} users={users} college={collegeData} open={addResearchModal} setOpen={setAddResearchModal} user={user} setUser={setUser} />


      {/* Add Sport */}
      <AddSport college={collegeData} open={addSportModal} setOpen={setAddSportModal} user={user} setUser={setUser} />
    </>
  );
}
