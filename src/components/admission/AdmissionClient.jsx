'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import Modal from '@/utils/Modal';

export default function AdmissionClient({ open, setOpen, college, subjects}) {
    const router = useRouter()
    const { user, setUser, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log('subjects', subjects);
    

    // Submit handler for the form
    const onSubmit = async (data) => {

        console.log('subject', data.subject);
        

        try {
            const formData = new FormData();
            formData.append('address', data.address );
            formData.append('dateOfBirth', data?.dateOfBirth);
            formData.append('email', user?.email);
            formData.append('image', data?.image[0] );
            formData.append('name', data?.name);
            formData.append('phoneNumber', data?.phoneNumber);
            formData.append('subject', data?.subject);
            formData.append('college', college?._id);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/${user._id}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData, 
            });

            const updatedUser =  await res.json();

            console.log('updatedUser', updatedUser);

            const userWithNewData  = {...user, colleges: updatedUser.data.colleges, address: updatedUser.data.address, dateOfBirth: updatedUser.data.dateOfBirth, image: updatedUser.data.image, phoneNumber: updatedUser.data.phoneNumber }

            setUser(userWithNewData);

            localStorage.setItem('user', JSON.stringify(userWithNewData))


            if (res.ok) {
                setOpen(false); 
                redirect('/my-college')
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const handleClick = (data) => {
        setOpen(true)
    }

    useEffect(() => {
        if (!user && !loading) {
            redirect('/signup'); 
        }
    }, [user])


    useEffect(() => {
        if (user === 'collegeAdmin') {
            router.back(); 
        }
    }, [user])

    

    return (
        <>
            <Modal open={open} setOpen={setOpen} >
                <h2 className="text-2xl mb-4 capitalize">Admission Form for <strong>{college?.name}</strong> </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Candidate Name */}
                    <div>
                        <label htmlFor="name" className="block">Name:</label>
                        <input
                            {...register('name', { required: 'Candidate Name is required' })}
                            id="name"
                            defaultValue={user?.name}
                            className="border p-2 w-full"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    {/* Subject */}
                    <div>
                        <label htmlFor="subject" className="block">Subject:</label>
                        <select
                            {...register('subject', { required: 'Subject is required' })}
                            id="subject"
                            className="border p-2 w-full"
                        >
                            {
                                subjects?.map((el) => 
                                    <option value={el._id}>{el.name}</option>
                                )
                            }
                            
                        </select>
                        {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                    </div>

                    {/* Candidate Email */}
                    <div>
                        <label htmlFor="email" className="block">Candidate Email:</label>
                        <input
                            type="email"
                            {...register('email')}
                            defaultValue={user?.email}
                            disabled
                            id="email"
                            className="border p-2 w-full"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>


                    {/* Phone Number Email */}
                    <div>
                        <label htmlFor="phoneNumber" className="block">Phone Number:</label>
                        <input
                            type="number"
                            {...register('phoneNumber', { required: 'Phone Number is required' })}
                            id="phoneNumber"
                            className="border p-2 w-full"
                        />
                        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                    </div>

                    {/* Address  */}
                    <div>
                        <label htmlFor="address" className="block">Address:</label>
                        <input
                            type="text"
                            {...register('address', { required: 'Address is required' })}
                            id="address"
                            className="border p-2 w-full"
                        />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                    </div>

                    {/* Address  */}
                    <div>
                        <label htmlFor="dateOfBirth" className="block">Date of birth:</label>
                        <input
                            type="date"
                            {...register('dateOfBirth', { required: 'Address is required' })}
                            id="dateOfBirth"
                            className="border p-2 w-full"
                        />
                        {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}
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
                        Submit
                    </button>
                </form>
            </Modal>
        </>

    )
}
