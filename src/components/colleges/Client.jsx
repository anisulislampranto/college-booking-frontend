'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CollegesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [fetching, setFetching] = useState(true)

  const fetchColleges = async (query = '') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?search=${query}&limit=${3}`);
      const data = await res.json();

      setColleges(data.colleges);
      setFetching(false)
    } catch (error) {
      setFetching(false)
      console.error('Error fetching colleges:', error);
    }
  };

  useEffect(() => {
    fetchColleges(); 
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchColleges(value); 
  };

  console.log('colleges', colleges);
  
  const placeholderCard = (
    <li className="p-4 border rounded-sm flex flex-col gap-2 animate-pulse">
      <div className='relative h-56 w-full bg-gray-300 rounded-sm' />
      <h3 className="text-lg font-semibold bg-gray-300 h-6 w-32 mt-2 rounded-sm" />
      <p className="bg-gray-300 h-4 w-40 mt-1 rounded-sm" />
      <div className="bg-gray-300 h-4 w-24 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-32 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-28 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-36 mt-2 rounded-sm" />
      <Link href="#" className="w-52 mt-4 bg-gray-300 h-10 rounded-md" />
    </li>
  );

  return (
    <div className="py-20 container mx-auto px-5 capitalize">
      <form action="">
        <input
          type="text"
          placeholder="Search College by name"
          value={searchTerm}
          onChange={handleSearchChange} 
          className="p-2 border border-gray-300 rounded w-52"
        />
      </form>

      {/* Display the colleges */}
      <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!fetching && colleges.length ? colleges.map((college) => (
          <li key={college._id} className="p-4 border rounded-sm flex flex-col gap-2">
            <div className=' relative h-56 w-full'>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`} className=' rounded-sm absolute object-cover' alt={'college.image'} fill />
            </div>
            <h3 className="text-lg font-semibold">{college.name}</h3>
            <p>Admission Date: {college.admissionDate}</p>
            <div>
                <strong> Events: </strong>
                <ul className=' flex flex-wrap gap-2'>
                    {college.events?.map((el) => 
                        <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                            {el.name}
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <strong> Researches: </strong>
                <ul className=' flex flex-wrap gap-2'>
                    {college.researches?.map((el) => 
                        <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                            {el.name}
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <strong> Sports: </strong>
                <ul className=' flex flex-wrap gap-2'>
                    {college.sports?.map((el) => 
                        <li key={el._id} className=' shadow-md p-1 rounded-sm'>
                            {el.name}
                        </li>
                    )}
                </ul>
            </div>

            <Link href={`/colleges/${college._id}`}  className=' w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>Details</Link>

          </li>
        )) : !fetching && colleges.length === 0 ? <h1 className='text-3xl text-center col-span-3 mt-32'>Not Found</h1> : 
          <>          
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
          </>
        }
      </ul>
    </div>
  );
}
