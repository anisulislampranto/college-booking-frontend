'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import Modal from '../../utils/Modal';
import { Input } from '@nextui-org/input';
import {DateInput, Select, SelectItem} from "@nextui-org/react";


export default function AdmissionClient({ open, setOpen, college, subjects, setEnrolled}) {
    const router = useRouter()
    const { user, setUser, loading } = useContext(AuthContext)
    const {control, register, handleSubmit, formState: { errors } } = useForm();


    // Submit handler for the form
    const onSubmit = async (data) => {

        console.log('data form', data);

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

            if (res.ok) {
                const userWithNewData  = {...user, colleges: updatedUser.data.colleges, address: updatedUser.data.address, dateOfBirth: updatedUser.data.dateOfBirth, image: updatedUser.data.image, phoneNumber: updatedUser.data.phoneNumber }

                setUser(userWithNewData);

                localStorage.setItem('user', JSON.stringify(userWithNewData))

                setEnrolled(true);
                setOpen(false); 
                router.push('/my-college')
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


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
                        <Input
                            label='Name'
                            type='textarea'
                            {...register('name', { required: 'Candidate Name is required' })}
                            id="name"
                            defaultValue={user?.name}
                            className=" w-full"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    {/* Subject */}
                    <div>
                        <Select 
                            label="Select a Subject" 
                            className="w-full" 
                            {...register('subject', { required: 'Subject is required' })}
                            id="subject"
                        >
                            {subjects?.map((el) => (
                                <SelectItem key={el._id}>
                                    {el.name}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                    </div>

                    {/* Candidate Email */}
                    <div>
                        <Input
                            label='Email'
                            type="textarea"
                            {...register('email')}
                            defaultValue={user?.email}
                            disabled
                            id="email"
                            className=" w-full border-none"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>


                    {/* Phone Number Email */}
                    <div>
                        <Input
                            label='Phone Number'
                            type="textarea"
                            {...register('phoneNumber', { required: 'Phone Number is required' })}
                            id="phoneNumber"
                            className="w-full"
                        />
                        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                    </div>

                    {/* Address  */}
                    <div>
                        <Input
                            label='Address'
                            type="textarea"
                            {...register('address', { required: 'Address is required' })}
                            id="address"
                            className="w-full"
                        />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                    </div>

                    {/* Date of birth  */}
                    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            rules={{ required: 'Date of birth is required' }}
                            render={({ field }) => (
                                <DateInput 
                                    {...field} 
                                    label="Date of Birth" 
                                    className="w-full" 
                                />
                            )}
                        />
                        {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}
                    </div>

                    {/* Image */}
                    <div>
                        <label htmlFor="image" className="block">Image:</label>
                        <Input
                            type="file"
                            {...register('image', { required: 'Image is required' })}
                            id="image"
                            className="w-full"
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
