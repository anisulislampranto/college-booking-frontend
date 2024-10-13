'use client';

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';


export default function AddCollegeClient() {
    const {user, setUser, loading} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log('user', user);
    

    const onSubmit = async (data) => {

        console.log('data', data);
        

        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('admissionDate', data?.admissionDate);
            formData.append('image', data?.image );
            formData.append('admin', user?._id );

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/create`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.token}`, // Add the token in the Authorization header
                    },
                    body: formData, 
            });

            const createdCollege = await res.json();

            console.log('res', res);
            console.log('data', createdCollege);
            
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    }

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
