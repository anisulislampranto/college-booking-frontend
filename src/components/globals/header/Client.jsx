'use client';

import Image from 'next/image'
import React, {useContext, useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from 'next/link';
import logo from '../../../assets/Board_of_Intermediate_and_Secondary_Education_Dhaka_Monogram.svg.png'
import { AuthContext } from '@/context/AuthContext';
import AnimatedBg from '@/components/ui/AnimatedBg';



const navLinks = [
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'Colleges',
        url: '/colleges'
    },
    {
        label: 'Add College',
        url: '/add-college'
    },
    {
        label: 'My College',
        url: '/my-college'
    },
]


export default function HeaderClient() {
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className=' sticky top-0 z-50 bg-white shadow'>
                    <div className=' flex items-center justify-between text-black lg:bg-transparent p-5 gap-5 relative '>
                        <Link href={'/'} className=' relative h-14 w-[12rem]'>
                            <Image src={logo} alt='logo' fill className=' absolute object-contain' />
                        </Link>

                        <div className=' hidden lg:flex items-center justify-between gap-5 font-poppinsRegular'>

                            {
                                user?.type === 'admin' && <Link href={'/recycle-bin'} className='flex items-center gap-2 hover:text-gray-500 cursor-pointer ' > Recycle Bin </Link>
                            }

                            {
                                user?.type === 'admin' && navLinks.filter(el => el.label !== 'Add College' && el.label !== 'My College' ).map((el) => 
                                    <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                                )
                            }

                            {
                                user?.type === 'student' && navLinks.filter(el => el.label !== 'Add College' ).map((el) => 
                                    <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                                )
                            }

                            {
                                user?.type === 'collegeAdmin' && navLinks.filter(el => el.label !== 'Admission' ).map((el) => 
                                    <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                                )
                            }

                            {
                                !user && navLinks.filter(el => el.label !== 'Add College' &&  el.label !== 'Admission' &&  el.label !== 'My College' ).map((el) => 
                                    <Link href={el.url} className='hover:text-gray-500 cursor-pointer ' key={el.url}>{el.label}</Link>
                                )
                            }
                            
                            <Link href={ user?.name ? '/profile' : '/signup'} className='hover:text-gray-500 cursor-pointer' >{user?.name ? user?.name : 'Sign up'}</Link>
                        </div>

                        {/* For Small Screen */}
                        <button className=' block lg:hidden' onClick={() => setOpen(!open)} >
                            {
                                open ? <RiCloseLargeLine className=' w-8 h-8 text-black' /> : <RxHamburgerMenu className=' w-8 h-8 text-black' /> 
                            }
                        </button>
                    </div>
            </div>

            {/* Dropdown For Small screen */}
            <div 
                className={`bg-white z-50 sticky top-24 w-full text-2xl gap-10 text-center flex flex-col font-poppinsRegular border-b ${open ? 'h-screen opacity-100 py-10' : 'h-0 opacity-0'} transition-all duration-300 ease-in-out overflow-hidden`}
            >
                {
                    user?.type === 'admin' && 
                    <Link onClick={() => setOpen(false)} href={'/recycle-bin'} className='flex items-center gap-2 hover:text-gray-500 cursor-pointer'> 
                        Recycle Bin 
                    </Link>
                }
                {
                    user?.email && user.type === 'student' && 
                    navLinks.filter(el => el.label !== 'Add College').map((el) => 
                        <Link onClick={() => setOpen(false)} href={el.url} className='hover:text-gray-500 cursor-pointer' key={el.url}>
                            {el.label}
                        </Link>
                    )
                }
                {
                    user?.email && user.type === 'collegeAdmin' && 
                    navLinks.filter(el => el.label !== 'Admission').map((el) => 
                        <Link onClick={() => setOpen(false)} href={el.url} className='hover:text-gray-500 cursor-pointer' key={el.url}>
                            {el.label}
                        </Link>
                    )
                }
                <Link onClick={() => setOpen(false)} type='button' href={ user?.name ? '/profile' : '/signup'} className='hover:text-gray-500 cursor-pointer'>
                    {user?.name ? user?.name : 'Sign up'}
                </Link>
            </div>

        </>
    )
}