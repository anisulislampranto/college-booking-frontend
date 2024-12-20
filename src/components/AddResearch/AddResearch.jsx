'use client';

import React, {useState, useEffect} from 'react'
import Modal from '../../utils/Modal'
import { useForm, Controller } from "react-hook-form";
import {Select, SelectItem, Textarea, Input} from "@nextui-org/react";
import Button from '@/components/ui/Button';


export default function AddResearch({college, open, setOpen, user, setUser, students, setStudents}) {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        const participantArray = data.participants.split(',');


        try {
            const formData = new FormData();
            formData.append('name', data.name );
            formData.append('image', data.image[0] );
            formData.append('description', data.description)
            formData.append('college', college.college._id );
            formData.append('user', user._id)

            participantArray.forEach((participant) => formData.append("participants[]", participant))

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/researches/create`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    body: formData, 
            });

            const createdResearch = await res.json();

            console.log('res', res);
            console.log('createdResearch', createdResearch);
            

            if (res.ok) {
                
                const updatedColleges = user.colleges.map(collegeObj => {
                    if (collegeObj?.college?._id === createdResearch.data.college) {
                      return {
                        ...collegeObj,
                        college: {
                          ...collegeObj.college,
                          researches: [...(collegeObj.college?.researches || []), createdResearch.data],
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
                console.error('Error creating event:', createdResearch.error);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className=' text-4xl py-5'>Add Research for <strong>{college.college?.name}</strong> </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3' >
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

                {/* Research Participants */}
                <div>
                    <Controller
                        name="participants"
                        control={control}
                        rules={{ required: 'Please select at least one participant' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Participants"
                                placeholder="Select participants"
                                selectionMode="multiple"
                                className="px-2"
                                onSelectionChange={selectedItems => field.onChange([...selectedItems])}  // Get selected IDs
                            >
                                {students?.map((user) => (
                                    <SelectItem key={user._id} value={user._id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.participants && <span className="text-red-500">{errors.participants.message}</span>}
                </div>

                {/* Submit Button */}
                <div className=' flex justify-end mt-5'>
                    <Button type={'submit'} text={'Add Research'} />
                </div>
            </form>
        </Modal>
    )
}
