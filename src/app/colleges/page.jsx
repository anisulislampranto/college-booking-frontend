'use client'
import { Pagination } from "@nextui-org/react";
import React, { useState, useEffect, useContext } from 'react'
import {placeholderCard} from '@/utils/PlaceholderCard'
import CollegeCard from '@/components/college/CollegeCard';
import { AuthContext } from "@/context/AuthContext";

export default function Page() {
    const {user, setUser} = useContext(AuthContext)
    const [colleges, setColleges] = useState([]);
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetchCollege, setFetchCollege] = useState(0)

    useEffect(() => {
      const fetchColleges = async () => {
        try {
          setLoading(true); 
          const statusQuery = (!user || (user && user.type !== 'admin')) ? '&status=approved' : '';
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?page=${page}${statusQuery}&limit=9`);
          const data = await res.json();
    
          console.log('data', data);
    
          if (res.ok) {
            setColleges(data.colleges);
            setTotalPages(data.totalPages);
          }
        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchColleges();
    }, [page, user]);
    

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
            {colleges?.length !== 0 ? colleges?.map((college) => (
              <CollegeCard key={college.id} college={college} user={user} setUser={setUser} setFetchCollege={setFetchCollege} fetchCollege={fetchCollege} />
            )) : <span className='text-center col-span-3 text-5xl'>Found no colleges.</span>}
          </div>

          <div className={` ${colleges?.length > 9 ? 'flex' : 'hidden'} justify-center items-center mt-5`}>
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
