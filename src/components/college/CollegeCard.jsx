import EndlessSliderServer from '@/utils/EndlessSliderServer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CollegeCard({college}) {
  return (
        <div key={college._id} className="rounded-md flex flex-col gap-2 overflow-hidden group">
            <div className='relative h-[28rem] w-full'>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`}
                className='inset-0 rounded-md absolute object-cover transition-transform group-hover:scale-105'
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
  )
}
