import React from 'react'
import AdmissionClient from '@/components/admission/Client'

export default async function page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges`);
    const data = await res.json();


  return (
    <div>
        <AdmissionClient colleges={data.colleges} />
    </div>
  )
}
