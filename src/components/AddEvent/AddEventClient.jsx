'use client';

import React from 'react'
import Modal from '../../utils/Modal'
import { useForm } from "react-hook-form";
import Button from '../ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"




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
            <h1 className=' text-4xl py-5'>Add Event for <strong>{college.college?.name}</strong> </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-4'>
                {/* Event Name */}
                <div>
                    <label htmlFor="description">Name:</label>
                    <Input
                        {...register('name', { required: 'Event Name is required' })}
                        id="name"
                        className=" w-full px-2 border-black"
                        type='text'
                        placeholder='Enter Event Name border '
                        
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Event Image */}
                <div>
                    <label htmlFor="image">Image: </label>
                    <Input
                        type='file'
                        {...register('image', { required: 'Event Image is required' })}
                        id="image"
                        className="p-2 w-full border-black"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Event date */}
                <div>
                    <label htmlFor="date">Date</label>
                    <Input
                        type='date'
                        {...register('date', { required: 'Event Date is required' })}
                        id="image"
                        className="p-2 w-full border-black"
                    />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </div>
                {/* Event Description */}
                <div>
                    <label htmlFor="description">Description</label>
                    <Textarea
                        type='text'
                        {...register('description', { required: 'Event Description is required' })}
                        id="description"
                        className="p-2 w-full border border-black"
                        placeholder='Enter Event description'
                    />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </div>

                {/* Submit Button */}
                <div className=' flex justify-end'>
                    <Button type={'submit'} text={'Add Event'} />
                </div>
            </form>
        </Modal>
    )
}
