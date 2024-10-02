'use client'

import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function Page() {
    const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); // Initialize useRouter

    const handleLogout = () => {
        // Remove user and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Clear cookies if any (adjust this based on the cookies you have)
        document.cookie = 'token=; Max-Age=0; path=/;'; // Example for clearing a cookie

        // Set user to null in AuthContext
        setUser(null);

        // Redirect to the login or home page
        router.push('/'); // Adjust the route as needed
    };

    useEffect(() => {
        if (!user) {
            // Simulate loading user (e.g., from localStorage or API)
            setTimeout(() => {
                setIsLoading(false); // Stop loading after checking
            }, 1000); // Adjust the delay as needed
        } else {
            setIsLoading(false); // User found, stop loading
        }
    }, [user]);

    useEffect(() => {
        // Once loading is done, if no user is found, redirect to the signup page
        if (!isLoading && !user) {
            router.push('/signup'); // Redirect to signup page
        }
    }, [isLoading, user, router]);

    // Show loading state until user is fully loaded or not found
    if (isLoading) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="border p-5">
                {user?.image ? (
                    <div className="relative h-52 w-52">
                        <Image
                            className="absolute object-cover"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.image}`}
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
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>

                <button className=' bg-blue-600 text-white p-2 rounded-md' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
