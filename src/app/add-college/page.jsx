import AddCollegeClient from '@/components/AddCollege/AddCollegeClient'
import React from 'react'

export default function page() {

    return (
        <div className='sm:mx-auto p-10 px-5 mx-5 my-20 max-w-2xl backdrop-blur-sm bg-white/30 border border-black shadow-2xl'>
            <h1 className='text-4xl sm:text-5xl'>Add College</h1>
            <AddCollegeClient />
        </div>
    )
}
