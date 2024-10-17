'use client';

import React, {useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';


export default function AddCollegeClient() {
    const {user, setUser, loading} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState()


    const displayError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null); // Clear the error after 5 seconds
        }, 3000);
    };

    const onSubmit = async (data) => {

        try {
            const imageFile = data.image[0];
            
            // Validate image size (1MB = 1,048,576 bytes)
            if (imageFile.size > 1048576) {
                displayError('Image size cannot exceed 1MB');
                return;
            }
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
            
            if (res.ok) {
                const updatedColleges = user.colleges ? [...user.colleges, createdCollege.data] : [createdCollege.data];
                const updatedUser = {
                    ...user, 
                    colleges: updatedColleges, 
                }
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser))
            } else {
                displayError(createdCollege.error)
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        if (!user && !loading) {
            redirect('/login'); 
        }

        if (user.type === 'student') {
            redirect('/')
        }

    }, [user])

    if (user.type === 'collegeAdmin' && user.colleges.length > 0 ) {
        return <div className=" mt-20 text-5xl text-center flex items-center justify-center">College Admin Can Add one College Only</div>;
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

                {/* admissionDate */}
                <div>
                    <label htmlFor="admissionDate" className="block">Admission Date:</label>
                    <input
                        type="date"
                        {...register('admissionDate', { 
                            required: 'Admission Date is required',
                            validate: value => {
                                const today = new Date();
                                const selectedDate = new Date(value);
                                if (selectedDate < today.setHours(0, 0, 0, 0)) {
                                    return 'Admission date cannot be in the past';
                                }
                            }
                        })}
                        id="admissionDate"
                        className="border p-2 w-full"
                    />
                    {errors.admissionDate && <span className="text-red-500">{errors.admissionDate.message}</span>}
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
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 p-2 bg-blue-500 text-white rounded-md">
                    Add College
                </button>

                <p className="text-red-500 py-1">{error && error}</p> 

            </form>
        </div>
    )
}
