'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import Modal from '@/utils/modal';

export default function AdmissionClient({colleges}) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [collegeData, setCollegeData] = useState()
    const { user, setUser, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Submit handler for the form
    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            formData.append('address', data.address );
            formData.append('dateOfBirth', data?.dateOfBirth);
            formData.append('email', user?.email);
            formData.append('image', data?.image );
            formData.append('name', data?.name);
            formData.append('phoneNumber', data?.phoneNumber);
            formData.append('subject', data?.subject);
            formData.append('college', collegeData?._id);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/${user._id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
            },
                body: formData, 
            });

            const updatedUser =  await res.json();
            const userWithNewData  = {...user, colleges: updatedUser.colleges, address: updatedUser.address, dateOfBirth: updatedUser.dateOfBirth, imageLink: updatedUser.imageLink, phoneNumber: updatedUser.phoneNumber }

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
        setCollegeData(data)
        setOpen(true)
    }

    useEffect(() => {
        if (!user && !loading) {
            redirect('/signup'); 
        }
    }, [user])


    useEffect(() => {
        if (user !== 'student') {
            router.back(); 
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

            <Modal open={open} setOpen={setOpen} >
                <h2 className="text-2xl mb-4 capitalize">Admission Form for <strong>{collegeData?.name}</strong> </h2>
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
                        <input
                            {...register('subject', { required: 'Subject is required' })}
                            id="subject"
                            className="border p-2 w-full"
                        />
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
                        <label htmlFor="image" className="block">Image Link:</label>
                        <input
                            type="file"
                            {...register('image', { required: 'Image is required' })}
                            id="image"
                            className="border p-2 w-full"
                        />
                        {errors.imageLink && <span className="text-red-500">{errors.imageLink.message}</span>}
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
