'use client';

import Image from 'next/image'
import React, {useContext, useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from 'next/link';
import logo from '../../../assets/Board_of_Intermediate_and_Secondary_Education_Dhaka_Monogram.svg.png'
import { AuthContext } from '@/context/AuthContext';


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
        label: 'Admission',
        url: '/admission'
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
            <div className='flex items-center justify-between bg-white text-black lg:bg-transparent p-5 gap-5 relative border-b '>
                <Link href={'/'} className=' relative h-14 w-[12rem]'>
                    <Image src={logo} alt='logo' fill className=' absolute object-contain' />
                </Link>

                <div className=' hidden lg:flex items-center justify-between gap-5 font-poppinsRegular'>
                    {
                        navLinks.map((el) => 
                            <Link href={el.url} className='hover:text-[#96BEBA] cursor-pointer ' key={el.url}>{el.label}</Link>
                        )
                    }
                    
                    <Link href={ user?.name ? '/profile' : '/signup'} className='hover:text-[#96BEBA] cursor-pointer' >{user?.name ? user?.name : 'Sign up'}</Link>
                </div>

                {/* For Small Screen */}
                <button className=' block lg:hidden' onClick={() => setOpen(!open)} >
                    {
                        open ? <RiCloseLargeLine className=' w-8 h-8 text-black' /> : <RxHamburgerMenu className=' w-8 h-8 text-black' /> 
                    }
                </button>
            </div>
            <div className={`bg-white z-50 absolute top-24 ${open ? 'block' : 'hidden'} border-b md:hidden text-center w-full flex gap-5 flex-col py-10 font-poppinsRegular`}>
                {
                    navLinks.map(el => 
                        <Link href={el.url} className='hover:text-[#96BEBA]' key={el.label} >{el.label}</Link>
                    )
                }
                <Link type='button' href={ user?.name ? '/profile' : '/signup'} className='hover:text-[#96BEBA] cursor-pointer' > {user?.name ? user?.name : 'Sign up'}</Link>
            </div>
        </>
    )
}