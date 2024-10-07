'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CollegeCard from '../college/CollegeCard';

export default function CollegeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchColleges = async (query = '') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?search=${query}&limit=${3}`);
      const data = await res.json();

      setColleges(data.colleges);
      setFetching(false);
    } catch (error) {
      setFetching(false);
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
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!fetching && colleges.length ? colleges.map((college) => (
          <CollegeCard college={college} />
        )) : !fetching && colleges.length === 0 ? <h1 className='text-3xl text-center col-span-3 mt-32'>Not Found</h1> :
          <>
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
          </>
        }
      </div>
    </div>
  );
}
