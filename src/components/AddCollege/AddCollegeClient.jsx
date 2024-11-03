'use client';

import React, {useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import Button from '../ui/button';
import { Input } from "@/components/ui/input"



export default function AddCollegeClient() {
    const {user, setUser, loading, userFetch, setUserFetch } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(); 
    const [btnState, setBtnState] = useState('');
    const router = useRouter()

    console.log('user', user);

    const displayError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null); // Clear the error after 5 seconds
        }, 3000);
    };

    const onSubmit = async (data) => {
        console.log('data', data);
        
        setBtnState('submitting')
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
            formData.append('admissionFee', data.admissionFee );

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdCollege = await res.json();


            console.log('res', res);
            
            
            if (res.ok) {
                const updatedColleges = user.colleges ? [...user.colleges, createdCollege.data] : [createdCollege.data];
                const updatedUser = {
                    ...user, 
                    colleges: updatedColleges, 
                }
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setBtnState('Submitted Successfully!');
                setUserFetch(userFetch+1);
                router.push("/my-college");
            } else {
                displayError(createdCollege.error)
                setBtnState('Failed to Submit');
                setTimeout(() => {
                    setBtnState('')
                }, 2000);
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

    if (user?.type === 'collegeAdmin' && user.colleges.length > 0 ) {
        return <div className=" mt-20 text-5xl text-center flex items-center justify-center">College Added</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
                {/* Candidate Name */}
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <Input
                        {...register('name', { required: 'College Name is required' })}
                        id="name"
                        className="border p-2 w-full"
                        placeholder='Enter Your college name'
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                <div className=' flex flex-wrap justify-between w-full'>
                    {/* admissionDate */}
                    <div className=' w-[48%]'>
                        <label htmlFor="admissionDate" className="block">Admission Date:</label>
                        <Input
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

                    {/* admissionFee */}
                    <div className=' w-[48%]'>
                        <label htmlFor="admissionFee" className="block">Admission Fee:</label>
                        <Input
                            type="number"
                            {...register('admissionFee', { 
                                required: 'Admission Fee is required',
                            })}
                            id="admissionFee"
                            className="border p-2 w-full"
                        />
                        {errors.admissionFee && <span className="text-red-500">{errors.admissionFee.message}</span>}
                    </div>



                </div>

                

                {/* Image */}
                <div>
                    <label htmlFor="image" className="block">Image:</label>
                    <Input
                        type="file"
                        {...register('image', { required: 'Image is required' })}
                        id="image"
                        className="border p-2 w-full"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <div className=' flex justify-end'>
                    <Button type={'submit'} text={btnState ? btnState : 'Add College'} />
                </div>

                <p className="text-red-500 py-1">{error && error}</p> 

            </form>
        </div>
    )
}


