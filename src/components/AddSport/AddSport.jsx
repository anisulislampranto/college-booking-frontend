'use client';

import React from 'react'
import Modal from '@/utils/Modal'
import { useForm } from "react-hook-form";
import { Textarea, Input} from "@nextui-org/react";


export default function AddSport({college, open, setOpen, user, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('image', data.image[0] );
            formData.append('description', data.description);
            formData.append('college', college._id );
            formData.append('user', user._id)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sports/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdSport = await res.json();

            if (res.ok) {
                
                const updatedColleges = user.colleges.map(college => {

                    if (college._id === createdSport.data.college) {
                        return {
                            ...college,
                            sports: [...college.sports, createdSport.data],  // Update events array with the new event
                        };
                    }
                    return college;
                });

                console.log('updatedColleges', updatedColleges );
                

                const updatedUser = {
                    ...user,
                    colleges: updatedColleges,  // Replace the colleges array with the updated one
                };

                setUser(updatedUser);  
                localStorage.setItem('user', JSON.stringify(updatedUser));  
                setOpen(false)

            } else {
                console.error('Error creating event:', createdEvent.error);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className=' text-4xl py-5'>Add Research for <strong>{college.name}</strong> </h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Research Name */}
                <div>
                    <Input
                        label='Name'
                        type='textarea'
                        {...register('name', { required: 'Name is required' })}
                        id="name"
                        className="p-2 w-full"
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Research Image */}
                <div>
                    <Input
                        label='Image'
                        type='file'
                        {...register('image', { required: 'Research Image is required' })}
                        id="image"
                        className="p-2 w-full"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Research Description */}
                <div>
                    <Textarea
                        style={{border: 'none'}}
                        type='text'
                        label='Description'
                        {...register('description', { required: 'Research Description is required' })}
                        id="description"
                        className="p-2 w-full"
                    />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 p-2 bg-blue-500 text-white rounded-md">
                    Add Sport
                </button>
            </form>
        </Modal>
    )
}
