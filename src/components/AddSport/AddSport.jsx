'use client';

import React from 'react'
import Modal from '../../utils/Modal'
import { useForm } from "react-hook-form";
import Button from '../ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export default function AddSport({college, open, setOpen, user, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('image', data.image[0] );
            formData.append('description', data.description);
            formData.append('college', college.college._id );
            formData.append('user', user._id)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sports/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdSport = await res.json();

            if (res.ok) {
                
                const updatedColleges = user.colleges.map(collegeObj => {
                    if (collegeObj?.college?._id === createdSport.data.college) {
                      return {
                        ...collegeObj,
                        college: {
                          ...collegeObj.college,
                          sports: [...(collegeObj.college?.sports || []), createdSport.data],  // Update events array with the new event
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
                console.error('Error creating event:', createdSport.error);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className=' text-4xl py-5'>Add Sport for <strong>{college.college?.name}</strong> </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3'>

                {/* Sport Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                        type='text'
                        {...register('name', { required: 'Name is required' })}
                        id="name"
                        className="p-2 w-full border border-black"
                        placeholder='Enter Sport Name'
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Sport Image */}
                <div>
                    <label htmlFor="image">Image</label>  
                    <Input
                        label='Image'
                        type='file'
                        {...register('image', { required: 'Sport Image is required' })}
                        id="image"
                        className="p-2 w-full border border-black"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Sport Description */}
                <div>
                    <label htmlFor="description">Description</label>  
                    <Textarea
                        type='text'
                        label='Description'
                        {...register('description', { required: 'Sport Description is required' })}
                        id="description"
                        className="p-2 w-full border border-black"
                        placeholder='Enter Sport Description'
                    />
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>

                {/* Submit Button */}
                <div className=' flex justify-end mt-5'>
                    <Button text={'Add Sport'} type={'submit'} />
                </div>
            </form>
        </Modal>
    )
}
