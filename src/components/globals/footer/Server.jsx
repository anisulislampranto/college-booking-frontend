import Link from 'next/link';
import React from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";


const navLinks = [
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'Colleges',
        url: '/colleges'
    },
]

export default function FooterServer() {
    return (
        <div className=' mt-20'>
            <div className=' w-full flex items-center justify-between'>
                <div className=' bg-black h-[1px] w-full rounded-full' />
                <div className=' flex flex-col md:flex-row items-center gap-5 px-10'>
                    {
                        navLinks.map(el =>
                            <Link href={el.url} className=' text-black hover:text-gray-500 cursor-pointer text-center' key={el}>{el.label}</Link>
                        )
                    }
                </div>
                <div className=' bg-black h-[1px] w-full rounded-full' />
            </div>

            <div className=' relative max-w-7xl mx-auto px-5 py-5 lg:py-20 flex flex-col gap-20 md:flex-row justify-between items-center md:items-end'>
                <div className=' text-center lg:text-start'>
                    <strong className='text-center md:text-start'>Contact:</strong>
                    <p className=' flex items-center gap-1'> 
                        <AiOutlineMail />
                        contact@edu.org
                    </p>
                </div>
                <div className=' absolute top-[45%] left-[40%] lg:left-[45%] flex items-center gap-2'>
                    <Link href={'/'} >Privacy Policy</Link>
                    <FaLinkedin className=' text-[#0B58CA] w-5 h-5' />
                </div>
                <div className=' text-center lg:text-end w-full sm:w-[50%] md:w-[30%]'>
                    <strong>Address:</strong>
                    <p>China Hong Kong City, Tsim Sha Tsui, Hong Kong</p>
                </div>
            </div>
            <div className=' bg-gray-900 text-white py-2 text-center'>
                <p>© {new Date().getFullYear()} All rights reserved</p>
            </div>
        </div>
    )
}