'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CollegeDetailsPage({params}) {
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  console.log('collegeDetails', collegeDetails);
  

  useEffect(() => {
    if (params.id) {
      // Fetch data based on the `id` param
      const fetchCollegeDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/${params.id}`); // Example API endpoint
          const data = await response.json();
          setCollegeDetails(data);
        } catch (error) {
          console.error('Error fetching college details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCollegeDetails();
    }
  }, [params.id]);

  if (loading) return <div className=' h-screen text-center flex items-center justify-center'>Loading...</div>;
  if (!collegeDetails) return <div  className=' h-screen text-center flex items-center justify-center' >No details found for this college.</div>;

  return (
    <div className=' container mx-auto py-10 p-5 space-y-4'>
      <div className=' relative h-[20rem] md:h-[30rem] w-full'>
          <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${collegeDetails.image}`} className={` absolute object-cover`} alt='clg-img' fill />
      </div>
      <h1 className=' text-5xl capitalize'>{collegeDetails.name}</h1>

    <div>
      <p className=' text-3xl'>Events:</p>
      <ul className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {collegeDetails.events?.map((el) => 
              <li key={el._id} className=' shadow-md rounded-sm p-5'>
                <div className=' relative h-36 w-full'>
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} className={` absolute object-cover`} alt='clg-img' fill />
                </div>
                <h3 className='capitalize text-xl'> {el.name} </h3>
                <p> Date: {el.date} </p>
                <p> {el.description} </p>
              </li>
          )}
      </ul>
    </div>


    <div>
      <p className=' text-3xl'>Sports:</p>
      <ul className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {collegeDetails.sports?.map((el) => 
              <li key={el._id} className=' shadow-md rounded-sm p-5'>
                <div className=' relative h-36 w-full'>
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} className={` absolute object-cover`} alt='clg-img' fill />
                </div>
                <h3 className='capitalize text-xl'> {el.name} </h3>
                <p> {el.description} </p>
              </li>
          )}
      </ul>
    </div>


    <div>
      <p className=' text-3xl'>Researches:</p>
      <ul className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {collegeDetails.researches?.map((el) => 
              <li key={el._id} className=' shadow-md rounded-sm p-5'>
                <div className=' relative h-36 w-full'>
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.image}`} className={` absolute object-cover`} alt='clg-img' fill />
                </div>
                <h3 className=' text-xl capitalize'> {el.name} </h3>
                <p> {el.description} </p>
              </li>
          )}
      </ul>
    </div>


    <div className=' flex flex-col gap-10 mt-10'>
      <h3 className=' text-xl font-semibold'>Admission Process:</h3>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic officia doloremque, voluptatem sit qui dignissimos distinctio rerum obcaecati aperiam laboriosam iste perspiciatis quod molestiae sint dolore labore recusandae adipisci error ducimus sunt? Qui, odit illum! Molestiae qui deserunt doloribus repudiandae odio dignissimos quis obcaecati quam, vel omnis voluptatem ex blanditiis, eum a autem, rerum saepe perspiciatis sequi in at. Ad veniam necessitatibus iusto nulla aperiam deleniti consectetur incidunt quo maxime perspiciatis. Eius ea ullam, iste perferendis reprehenderit autem id vel?</p>
      <Link href={'/admission'} className=' text-center w-36 p-2 bg-black text-white rounded-md' >Take Admission</Link>
    </div>


    </div>
  );
}
