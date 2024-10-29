'use client'

import { AuthContext } from '@/context/AuthContext';
import { placeholderCard } from '@/utils/PlaceholderCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function RecycleBinServer() {
    const {user, setUser, loading} = useContext(AuthContext);
    const router = useRouter();
    const [deletedColleges, setDeletedColleges] = useState();
    const [collegeFetching, setCollegeFetching] = useState(true);
    const [restoreBtnState, setRestoreBtnState] = useState('Restore');
    const [fetching, setFetching] = useState(0)

    useEffect(() => {
        try {
            (async()=>{
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/recycle-bin`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    }
                )
                const data = await res.json();

                console.log('data', data);

                if (res.ok) {
                    setDeletedColleges(data.data)
                    setCollegeFetching(false)
                }
            })()
        } catch (error) {
            console.log('error', error);
            setCollegeFetching(false)
        }
    }, [fetching])

    const handleRestoreCollege = async (collegeId) => {
        setRestoreBtnState('Restoring. . .');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/restore/${collegeId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
    
        if (res.ok) {
            console.log("College restored successfully");
            setRestoreBtnState('Restored');
            setFetching(fetching + 1)
        } else {
            console.error("Failed to restore college:", errorData.message);
            setRestoreBtnState('Failed to Restore');
            setTimeout(() => {
                setRestoreBtnState('Restore');
            }, 2000);
        }
        } catch (error) {
            console.error("Error restoring college:", error);
            setRestoreBtnState('Failed to Restore');
            setTimeout(() => {
                setRestoreBtnState('Restore');
            }, 2000);
        }
    };
    

    useEffect(()=>{
        if (user.type !== 'admin') {
            router.push('/')
        }
    }, [user])

    return (
        <div className='container mx-auto p-5 py-20'>
            <h1 className='text-3xl'>Deleted Colleges</h1>
            { collegeFetching ? (
                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>        
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                    {placeholderCard}
                </div>

            ) : 
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {deletedColleges?.length !== 0 ? deletedColleges?.map((college) => (
                        <div className=' border px-1 space-y-2 py-2'>
                            <div className=' relative h-48 w-full'>
                                <Image className=' absolute object-cover' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${college.image}`} alt='college' fill />
                            </div>
                            <h1>{college.name}</h1>

                            <button onClick={() => handleRestoreCollege(college._id)} className=' px-3 border border-green-600 hover:bg-green-600 hover:text-white rounded-md'>{restoreBtnState}</button>
                        </div>
                    )) : <span className='text-center col-span-3 text-5xl'>404 Colleges Not Found</span>}
                </div>
            }
        </div>
    )
}
