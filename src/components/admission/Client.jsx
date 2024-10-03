'use client';

import { AuthContext } from '@/context/AuthContext';
import AdmissionModal from '@/utils/modal';
import { redirect } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function AdmissionClient({colleges}) {
    const [open, setOpen] = useState(false);
    const [collegeData, setCollegeData] = useState()
    const {user, loading} = useContext(AuthContext)


    const handleClick = (data) => {
        setCollegeData(data)
        setOpen(true)
    }

    useEffect(() => {
        if (!user && !loading) {
            redirect('/signup'); 
        }
    }, [user])

    

    return (
        <>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto py-20 px-5">
                {colleges?.map((college) => (
                    <li key={college._id} className="p-4 border rounded-sm flex flex-col gap-2">
                        <h3 className="text-lg font-semibold capitalize">{college.name}</h3>
                        <h3 className="text-lg font-semibold capitalize">Admission Deadline: {college.admissionDate}</h3>
                        <button onClick={() => handleClick(college)}  className=' w-52 text-center mt-4 bg-black text-white font-semibold p-2 rounded-md'>Admission</button>
                    </li>
                ))}
            </ul>

            {
                open && <AdmissionModal open={open} setOpen={setOpen} collegeData={collegeData}  /> 
            }
        </>

    )
}
