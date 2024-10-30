'use client';

import React from 'react'
import Modal from '../../utils/Modal'
import { useForm } from "react-hook-form";
import {Input} from "@nextui-org/react";



export default function AddEventClient({college, open, setOpen, user, setUser}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    console.log('college', college);
    

    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('date', data.date);
            formData.append('image', data.image[0] );
            formData.append('description', data.description)
            formData.append('college', college.college._id );
            formData.append('user', user._id)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdEvent = await res.json();


            if (res.ok) {
                
                const updatedColleges = user.colleges.map(collegeObj => {
                    if (collegeObj?.college?._id === createdEvent.data.college) {
                      return {
                        ...collegeObj,
                        college: {
                          ...collegeObj.college,
                          events: [...(collegeObj.college?.events || []), createdEvent.data],  // Update events array with the new event
                        },
                      };
                    }
                    return collegeObj;
                  });
                  
                  console.log('updatedColleges', updatedColleges);
                  
                  const updatedUser = {
                    ...user,
                    colleges: updatedColleges,  // Replace the colleges array with the updated one
                  };
                  
                  setUser(updatedUser);
                  localStorage.setItem('user', JSON.stringify(updatedUser));
                  setOpen(false);
                  

            } else {
                console.error('Error creating event:', createdEvent.error);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className=' text-4xl py-5'>Add Event for <strong>{college.name}</strong> </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Event Name */}
                <div>
                    <Input
                        {...register('name', { required: 'Event Name is required' })}
                        id="name"
                        className=" w-full px-2"
                        type='textarea'
                        label='Event Name'
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Event Image */}
                <div>
                    <Input
                        label='Image'
                        type='file'
                        {...register('image', { required: 'Event Image is required' })}
                        id="image"
                        className="p-2 w-full"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Event date */}
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type='date'
                        {...register('date', { required: 'Event Date is required' })}
                        id="image"
                        className="p-2 w-full mt-3"
                        label='Date'
                    />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </div>

                {/* Event Description */}
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type='text'
                        label='Description'
                        {...register('description', { required: 'Research Description is required' })}
                        id="description"
                        className="p-2 w-full border rounded-md mt-3"
                    />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 p-2 bg-blue-500 text-white rounded-md">
                    Add Event
                </button>
            </form>
        </Modal>
    )
}
