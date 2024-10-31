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
import { RxCross2 } from "react-icons/rx";
import { AnimatedTooltip } from '@/utils/AnimatedTooltip';



export default function MyCollege() {
  const { user, setUser , loading} = useContext(AuthContext);
  const router = useRouter()
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userReviews, setUserReviews] = useState([]);
  const [collegeData, setCollegeData] = useState({});
  const [students, setStudents] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [addResearchModal, setAddResearchModal] = useState(false);
  const [addSportModal, setAddSportModal] = useState(false);
  const [toggle, setToggle] = useState('admissionPending');
  const [admittedColleges, setAdmittedColleges] = useState([]);
  const [admissionPendingColleges, setAdmissionPendingColleges] = useState([]);
  const [approvingStudentId, setApprovingStudentId] = useState(null);
  const [fetchStudent, setFetchStudent] = useState(0)


  console.log('students', students);
  


  useEffect(() => {
    try {
      const approved = user.colleges?.filter(college =>
        college.college.students?.some(student => student.student === user._id && student.status === 'approved')
      );
      setAdmittedColleges(approved)
  
      const pending = user.colleges?.filter(college =>
        college.college.students?.some(student => student.student === user._id && student.status === 'admissionPending')
      );
      setAdmissionPendingColleges(pending)
  
  
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  }, [user?.colleges, user?._id]);


   // Students of the college only for college admin
    useEffect(() => {
      (async () => {
          try {
              const status = toggle === 'students' ? 'approved' : 'admissionPending';

              const collegeWithName = user.colleges?.find(el => el.college?.name);

              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/students?collegeId=${collegeWithName?.college?._id}&status=${status}`, {
                  method: 'GET',
                  headers: { 'Authorization': `Bearer ${user.token}` },
              });

              const data = await res.json();

              if (res.ok) {
                  setStudents(data.data);
              }
          } catch (error) {
              console.log('err', error);
          }
      })();
    }, [toggle, fetchStudent]);


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

  // Handler Review for form submission 
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

  const handleDeleteEvent = async (eventId, collegeId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete event.');
      }
  
      if (response.ok) {
        const updatedColleges = user.colleges?.map(collegeObj => {

          if (collegeObj?.college?._id === collegeId) { 

            return {
              ...collegeObj,
              college: {
                ...collegeObj.college,
                events: collegeObj.college.events.filter(event => event._id !== eventId),  
              },
            };
          }
          return collegeObj;
        });
  
        console.log('updatedColleges', updatedColleges);
  
        const updatedUser = {
          ...user,
          colleges: updatedColleges,  
        };
  
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setOpen(false);
      }
  
    } catch (error) {
      console.log('error', error);
    }
  };


  const handleDeleteResearch = async (researchId, collegeId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/researches/delete/${researchId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete event.');
      }
  
      if (response.ok) {
        const updatedColleges = user.colleges?.map(collegeObj => {

          if (collegeObj?.college?._id === collegeId) { 

            return {
              ...collegeObj,
              college: {
                ...collegeObj.college,
                researches: collegeObj.college.researches.filter(event => event._id !== researchId),  
              },
            };
          }
          return collegeObj;
        });
  
        console.log('updatedColleges', updatedColleges);
  
        const updatedUser = {
          ...user,
          colleges: updatedColleges,  
        };
  
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setOpen(false);
      }
  
    } catch (error) {
      console.log('error', error);
    }
  };


  const handleDeleteSport = async (sportId, collegeId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sports/delete/${sportId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete event.');
      }
  
      if (response.ok) {
        const updatedColleges = user.colleges?.map(collegeObj => {

          if (collegeObj?.college?._id === collegeId) { 

            return {
              ...collegeObj,
              college: {
                ...collegeObj.college,
                sports: collegeObj.college.sports.filter(event => event._id !== sportId),  
              },
            };
          }
          return collegeObj;
        });
  
        console.log('updatedColleges', updatedColleges);
  
        const updatedUser = {
          ...user,
          colleges: updatedColleges,  
        };
  
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setOpen(false);
      }
  
    } catch (error) {
      console.log('error', error);
    }
  };


  const handleApproveStudent = async (studentId, collegeId) => {
    setApprovingStudentId(studentId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/approve/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collegeId }),
      });
    
      if (res.ok) {
        const data = await res.json();
        console.log('Student approved:', data);
        setFetchStudent(fetchStudent + 1)
      }
    
    } catch (error) {
      console.log('Error approving student:', error);
    } finally {
      setApprovingStudentId(null);
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
          
          const collegeReview = userReviews.find(review => review.collegeId?._id === college.college?._id);
          const admittedAlready = admittedColleges.some( el => el.college._id === college.college._id);
          

          // For College Admin Only
          const approvedStudents = students?.filter(el => el.status === 'approved');
          const admissionPendingStudents = students?.filter(el => el.status === 'admissionPending');

          console.log('approvedStudents', approvedStudents);
          console.log('admissionPendingStudents', admissionPendingStudents);
          
          

          return (
            <li key={college?._id} className={`p-4 border rounded-sm flex flex-col gap-5 relative ${user.type ==='student' && admittedAlready ? 'border-green-600' :  user.type ==='student' && !admittedAlready ? 'border-yellow-600' : ''}`}>
              <div className={`relative w-full ${user?.type === 'student' ? ' h-56 ' : 'h-[30rem]'}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college?.college?.image || college?.image}`}
                  className="rounded-sm absolute object-cover"
                  alt={'college image'}
                  fill
                />
              </div>
              <p className={` ${user.type === 'student' && 'hidden'} capitalize w-24 text-center z-40 p-1 rounded-md px-3 ${college.college.status == 'pending' ? 'bg-yellow-600 text-white' : college.college.status == 'approved' ? 'bg-green-600 text-white' : ''}`}>
                {college.college.status}
              </p>

              <div>
                { user.type == 'student' && admittedAlready ? 
                  <p className='bg-green-600 text-white p-1 rounded-md w-24 text-center'>Admitted</p> : user.type == 'student' && !admittedAlready ? <p className='bg-yellow-600 text-white p-1 rounded-md w-40 text-center'>Admission Pending</p> :''
                }
              </div>

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
                        <li key={el._id} className='shadow-md p-1 rounded-sm relative'>
                          {el.name}
                            {
                              user.type === 'collegeAdmin' && 
                                <button onClick={() => handleDeleteEvent(el._id, college.college._id) } className=' absolute -top-3 -right-3'><RxCross2 className=' hover:bg-red-600 hover:text-white border border-red-600 w-4 h-4 text-red-600 bg-white rounded-full ' /></button>
                            }
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
                      <li key={el._id} className='shadow-md p-1 rounded-sm relative'>
                        {el.name}
                        {
                          user.type === 'collegeAdmin' && 
                            <button onClick={() => handleDeleteResearch(el._id, college.college._id)} className=' absolute -top-3 -right-3'><RxCross2 className=' hover:bg-red-600 hover:text-white border border-red-600 w-4 h-4 text-red-600 bg-white rounded-full ' /></button>
                        }
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
                      <li key={el._id} className='shadow-md p-1 rounded-md px-2 relative'>
                        {el.name}
                        {
                          user.type === 'collegeAdmin' && 
                            <button onClick={() => handleDeleteSport(el._id, college.college._id)} className=' absolute -top-3 -right-3'><RxCross2 className=' hover:bg-red-600 hover:text-white border border-red-600 w-4 h-4 text-red-600 bg-white rounded-full ' /></button>
                        }
                      </li>
                    ) : 'N/A'}
                  </ul>
                </div>
              {/*  */}

              {/* Students for college admin */}
              <div className={`${user.type === 'collegeAdmin' ? 'block my-10' : 'hidden'}`}>
                  <div className="flex bg-gray-300 p-1 rounded-md w-80">
                    <button
                        type="button"
                        onClick={() => setToggle('students')}
                        className={`flex-1 p-1 ${toggle === 'students' ? 'bg-white' : 'bg-gray-300'} text-gray-900 rounded-md`}
                    >
                        Students
                    </button>
                    <button
                        type="button"
                        onClick={() => setToggle('admissionPending')}
                        className={`flex-1 p-1 ${toggle === 'admissionPending' ? 'bg-white' : 'bg-gray-300'} text-gray-900 rounded-md`}
                    >
                        Admission Pending
                    </button>
                </div>

                {/* Admitted Students */}
                {
                    toggle === 'students' ? 
                    <div className="flex flex-row flex-wrap items-start justify-start my-8">
                      <AnimatedTooltip items={approvedStudents} />
                    </div> 
                    : 
                    <ul className=' my-8 flex flex-wrap gap-3 w-full'>
                      {
                        admissionPendingStudents?.map((el) => 
                          <li className=' bg-gray-700 text-white p-3 rounded-md text-center'> 
                            {/* <div>
                              <Image alt='student' fill />
                            </div> */}
                            <h1>{el.student?.name}</h1>
                            <p>{el.subject?.name}</p>
                            <div className=' flex gap-2 py-1'>
                              <button disabled={approvingStudentId === el.student._id} onClick={() => handleApproveStudent(el.student._id, college.college._id)} className={` text-white p-2 rounded-md ${approvingStudentId === el.student._id ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600' }`}>Approve</button>
                              {/* <button className=' bg-red-600 text-white p-2 rounded-md'>Reject</button> */}
                            </div>
                          </li>
                        )
                      }
                    </ul>
                }
                {/* Admitted Students */}
                
              </div>
              {/* Students for college admin */}

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
      <AddResearch setStudents={setStudents} students={students} college={collegeData} open={addResearchModal} setOpen={setAddResearchModal} user={user} setUser={setUser} />


      {/* Add Sport */}
      <AddSport college={collegeData} open={addSportModal} setOpen={setAddSportModal} user={user} setUser={setUser} />
    </>
  );
}
