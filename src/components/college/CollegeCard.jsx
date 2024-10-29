'use client';

import EndlessSliderServer from '@/utils/EndlessSliderServer'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function CollegeCard({college, user, setUser, fetchCollege, setFetchCollege}) {
  const [deleteBtnState, setDeleteBtnState] = useState('')

  // Delete College By Admin
  const handleDeleteCollege = (id) => {

    if (user.type !== 'admin') {
      return
    }

    setDeleteBtnState('deleting')
    try {
      (async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/delete/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        
        const data = await res.json();

        console.log('data', data);

        if (res.ok) {
          setDeleteBtnState('Deleted');
          console.log("College deleted successfully");
          setFetchCollege(fetchCollege + 1)
        } else {
          setDeleteBtnState('Failed!')
          setTimeout(() => {
            setDeleteBtnState('')
          }, 2000);
        }
      })();
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  };

  return (
        <div key={college._id} >
          <div className="rounded-md flex flex-col gap-2 overflow-hidden group relative">
            {
              user?.type === 'admin' && 
              <p className=' absolute z-40 bottom-2 right-2 capitalize bg-yellow-500 w-24 text-center rounded-md'>{college.status}</p>
            }
            <div className='relative h-[28rem] w-full'>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`}
                className='inset-0 rounded-md absolute object-cover transition-transform group-hover:scale-105 overflow-hidden'
                alt={college.name}
                fill
              />
              {new Date(college.admissionDate) > new Date() && (
                <EndlessSliderServer text={'Admission going on !!!'} className={' bg-black text-white absolute top-0 z-40'} />
              )}

              
              {/* Shader */}
              <div className="absolute inset-0 bg-black opacity-50 rounded-md z-10 transition-opacity duration-500 group-hover:opacity-80" />

              {/* Content */}
              <div className='text-white absolute inset-0 z-20 p-10 flex flex-col justify-end group-hover:justify-center transition-all duration-500'>
                <h3 className="bg-black p-2 text-lg font-semibold hidden group-hover:block transition-opacity duration-500">
                  {college.name}
                </h3>
                <div className=' flex flex-col gap-5 p-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <p>Admission Date: {college.admissionDate}</p>
                  <div>
                    <strong>Events:</strong>
                    <ul className='flex flex-wrap gap-2'>
                      {college.events.length !== 0 ? college.events.slice(-3).map((el) =>
                        <li key={el._id} className='shadow-md p-1 rounded-sm'>
                          {el.name}
                        </li>
                      ) : 'N/A'}
                    </ul>
                  </div>
                  <div>
                    <strong>Researches:</strong>
                    <ul className='flex flex-wrap gap-2'>
                      {college.researches.length !== 0 ? college.researches.map((el) =>
                        <li key={el._id} className='shadow-md p-1 rounded-sm'>
                          {el.name}
                        </li>
                      ) : 'N/A'}
                    </ul>
                  </div>
                  <div>
                    <strong>Sports:</strong>
                    <ul className='flex flex-wrap gap-2'>
                      {college.sports.length !== 0 ? college.sports.map((el) =>
                        <li key={el._id} className='shadow-md p-1 rounded-sm'>
                          {el.name}
                        </li>
                      ) : 'N/A'}
                    </ul>
                  </div>
                  <Link href={`/colleges/${college._id}`} className='w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>
                    Details
                  </Link>
                </div>

                <h3 className=" bg-black p-2 text-lg font-semibold group-hover:hidden transition-opacity duration-500">
                  {college.name}
                </h3>
              </div>
            </div>
            </div>
            <div className={`mt-1 items-center justify-between ${user?.type === 'admin' ? 'flex' : 'hidden'}`}>
                <button disabled={college.status === 'approved'} className={`px-3 rounded-md mt-1 ${college.status === 'approved' ? 'bg-green-600 text-white' : ' border border-green-600 hover:bg-green-600 hover:text-white'}`}>{college.status === 'approved' ? 'Approved' : 'Approve'}</button>
                <button className={`px-3 rounded-md mt-1 border border-red-600 hover:bg-red-600 hover:text-white`} onClick={() => handleDeleteCollege(college._id)}> {deleteBtnState === '' ? 'Delete' : deleteBtnState}</button>
            </div>
          </div>
  )
}
