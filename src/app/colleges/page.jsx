'use client'
import { Pagination } from "@nextui-org/react";
import React, {useState, useEffect} from 'react'
import {placeholderCard} from '@/utils/PlaceholderCard'
import CollegeCard from '@/components/college/CollegeCard';

export default function Page() {
  const [colleges, setColleges] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true); 
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?page=${page}&limit=9`);
      const data = await res.json();
      setColleges(data.colleges);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchColleges();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className='container mx-auto p-5 py-20'>
      <h1 className='text-3xl'>Colleges</h1>

      {loading ? (
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>        
            {placeholderCard}
            {placeholderCard}
            {placeholderCard}
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

          <div className="flex justify-center items-center mt-5">
            <Pagination 
              total={totalPages} 
              initialPage={page}
              page={page} 
              onChange={handlePageChange}
              color="default" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
