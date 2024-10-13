import CollegeCard from '@/components/college/CollegeCard';
import React from 'react'

export default async function page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges`);
    const data = await res.json();

    console.log('data', data);
    

    return (
      <div className=' container mx-auto p-5 py-20'>
          <h1 className=' text-3xl'>Colleges</h1>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              { data.colleges.length !== 0 ? data?.colleges?.map((college) => (
                  <CollegeCard college={college} />
              )) : <span className=' text-center col-span-3 text-5xl'>Found no colleges.</span> }
          </div>
      </div>
    )
}
