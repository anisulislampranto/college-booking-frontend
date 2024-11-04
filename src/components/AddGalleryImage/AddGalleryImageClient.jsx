'use client';

import { AuthContext } from '@/context/AuthContext';
import Modal from '@/utils/Modal';
import React, { useContext, useState } from 'react'
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

export default function AddGalleryImageClient() {
    const {user} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddImage = async( ) => {
        try {
            const formData = new FormData();

            const res =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery/create`, {
                method: 'POST',

            });
            const data = res.json();

            if (res.ok) {
                console.log('data', data);
                
            }

        } catch (error) {
            console.log('error');
        }
    }


    return (
        <>  
            {
                user.type === 'admin' && 
                <button onClick={()=>setModalOpen(true)} className=' border border-black hover-text group rounded-sm hover:border-green-600 px-3'> <span className=' group-hover:text-green-600'>+</span> Add Image</button>
            }

            {
                <Modal open={modalOpen} setOpen={setModalOpen}>
                    <form action="" onSubmit={handleSubmit(handleAddImage)}>
                        <label htmlFor="image">Image:</label>
                        <Input
                            type="file"
                            {...register('image', { required: 'Image is required' })}
                            id="image"
                            className="border p-2 w-full"
                        />
                        {errors.image && <span className="text-red-500">{errors.image.message}</span>}

                        <div className=' flex justify-end mt-5'>
                            <Button type={'submit'} text={'Submit'} />
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}
