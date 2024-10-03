'use client'

import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
    const { user, setUser, loading } = useContext(AuthContext);
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || '',
            address: user?.address || '',
            password: ''
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        document.cookie = 'token=; Max-Age=0; path=/;';
        setUser(null);
        router.push('/');
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signup');
        }
    }, [loading, user, router]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/me/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });


            const updatedUser = await response.json();

            console.log('updatedUser', updatedUser);
            

            setUser(updatedUser); // Update user in context
            setEdit(false); // Close edit mode
            reset(); // Reset form values
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    if (loading) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto py-20">
            <div className="border p-5 flex flex-col gap-4 items-center">
                {user?.imageLink ? (
                    <div className="relative h-52 w-52">
                        {console.log('ima', user?.imageLink)}
                        <Image
                            className="absolute object-cover"
                            src={user.imageLink}
                            alt="profile"
                            fill
                        />
                    </div>
                ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                )}

                <h1 className="capitalize text-4xl">{user?.name}</h1>
                <p>{user?.email}</p>
                <p>{user?.address}</p>

                <div className="flex gap-2">
                    <button className="bg-blue-600 text-white p-2 rounded-md" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="bg-gray-500 text-white p-2 rounded-md" onClick={() => setEdit(!edit)}>
                        {edit ? 'Cancel' : 'Edit Info'}
                    </button>
                </div>

                {edit && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                {...register('address', { required: 'Address is required' })}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required', minLength: 6 })}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
