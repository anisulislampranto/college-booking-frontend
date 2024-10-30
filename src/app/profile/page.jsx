'use client';

import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
    const { user, setUser, loading } = useContext(AuthContext);
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
        const token = localStorage.getItem('token');

        console.log('token', token);
        

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/me/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            console.log('res', response);

            const updatedUser = await response.json();

            console.log('updatedUser', updatedUser);

            if (response.ok) {
                setUser({ token, ...updatedUser.data });
                localStorage.setItem('user', JSON.stringify(updatedUser.data))
                setEdit(false);
                reset();
            }

        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    console.log('user', user);

    return (
        <div className="max-w-3xl mx-auto py-20">
            <div className="bg-white shadow-lg rounded-lg p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        {user?.image ? (
                            <Image
                                className="object-cover"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.image}`}
                                alt="profile"
                                fill
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <h1 className="capitalize text-3xl font-semibold">{user?.name}</h1>
                    <p className="text-lg text-gray-600">{user?.email}</p>
                    <p className="text-gray-500">{user?.address}</p>
                    <p className="text-gray-500">Phone: {user?.phoneNumber || 'N/A'}</p>
                    <p className="text-gray-500">DOB: {user?.dateOfBirth || 'N/A'}</p>
                </div>

                {/* Edit and Logout Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                    <button 
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors" 
                        onClick={() => setEdit(!edit)}
                    >
                        {edit ? 'Cancel' : 'Edit Info'}
                    </button>
                </div>

                {/* Form Section */}
                {edit && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="mt-1 block w-full p-2 border rounded-md"
                                defaultValue={user.name}
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                {...register('address', { required: 'Address is required' })}
                                className="mt-1 block w-full p-2 border rounded-md"
                                defaultValue={user.address}
                            />
                            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="number"
                                {...register('phoneNumber')}
                                className="mt-1 block w-full p-2 border rounded-md"
                                defaultValue={user.phoneNumber ? user.phoneNumber : ''}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth')}
                                className="mt-1 block w-full p-2 border rounded-md"
                                defaultValue={user.dateOfBirth}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                {...register('password', { minLength: 6 })}
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
