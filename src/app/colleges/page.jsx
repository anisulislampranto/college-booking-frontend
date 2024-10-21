'use client';

import CollegeCard from '@/components/college/CollegeCard';
import React, { useState, useEffect } from 'react';
import { placeholderCard } from '@/utils/PlaceholderCard';

export default function Page() {
  const [colleges, setColleges] = useState([]);
  const [page, setPage] = useState(1); // Initialize page state
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch colleges whenever the page changes
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true); // Set loading to true before fetching data
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?page=${page}&limit=9`);
      const data = await res.json();
      setColleges(data.colleges);
      setTotalPages(data.totalPages);
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchColleges();
  }, [page]); // Run this effect when `page` changes

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className='container mx-auto p-5 py-20'>
      <h1 className='text-3xl'>Colleges</h1>
      
      {loading ? (
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>        
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
        </div>

      ) : (
        <div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {colleges.length !== 0 ? colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            )) : <span className='text-center col-span-3 text-5xl'>Found no colleges.</span>}
          </div>
          
          {/* Pagination controls */}
          <div className="flex justify-center mt-5">
            <button 
              onClick={handlePreviousPage} 
              disabled={page === 1}
              className={`mr-2 px-4 py-2 ${page === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={page === totalPages}
              className={`ml-2 px-4 py-2 ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
