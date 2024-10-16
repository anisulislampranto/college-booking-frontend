'use client';

import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';


export default function AddCollegeClient() {
    const {user, setUser, loading} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log('user', user);
    

    const onSubmit = async (data) => {

        console.log('dataR', data);

        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('admissionDate', data.admissionDate);
            formData.append('image', data.image[0] );
            formData.append('admin', user._id );

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdCollege = await res.json();

            const updatedColleges = user.colleges ? [...user.colleges, createdCollege.data] : [createdCollege.data];

            const updatedUser = {
                ...user, 
                colleges: updatedColleges, 
            }

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser))

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        if (!user && !loading) {
            redirect('/login'); 
        }
    }, [user])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">

                {/* Candidate Name */}
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <input
                        {...register('name', { required: 'Candidate Name is required' })}
                        id="name"
                        className="border p-2 w-full"
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Date  */}
                <div>
                    <label htmlFor="admissionDate" className="block">Admission Date:</label>
                    <input
                        type="date"
                        {...register('admissionDate', { required: 'Admission Date is required' })}
                        id="admissionDate"
                        className="border p-2 w-full"
                    />
                    {errors.address && <span className="text-red-500">{errors.admissionDate.message}</span>}
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="image" className="block">Image:</label>
                    <input
                        type="file"
                        {...register('image', { required: 'Image is required' })}
                        id="image"
                        className="border p-2 w-full"
                    />
                    {errors.imageLink && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 p-2 bg-blue-500 text-white rounded-md">
                    Add College
                </button>

            </form>
        </div>
    )
}