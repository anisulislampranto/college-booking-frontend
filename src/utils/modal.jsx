'use client';

import { AuthContext } from '@/context/AuthContext';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function AdmissionModal({ open, setOpen, collegeData }) {
    const { user, setUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

  // Submit handler for the form
  const onSubmit = async (data) => {

    try {
      const formData = new FormData();

      formData.append('address', data.address );
      formData.append('dateOfBirth', data?.dateOfBirth);
      formData.append('email', user?.email);
      formData.append('image', data?.image );
      formData.append('name', data?.name);
      formData.append('phoneNumber', data?.phoneNumber);
    //   formData.append('subject', data?.subject);
      formData.append('college', collegeData?._id);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/${user._id}`, {
        method: 'PATCH',
        body: formData,
      });

      const updatedUser =  await res.json()

      setUser({...user, colleges: updatedUser.colleges})
      localStorage.setItem('user', JSON.stringify(user))

      console.log('updatedUser', updatedUser)
      console.log('user', user)

      if (res.ok) {
        setOpen(false); 
        redirect('/my-college')
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
                <h2 className="text-2xl mb-4 capitalize">Admission Form for <strong>{collegeData?.name}</strong> </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
                {/* Candidate Name */}
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <input
                    {...register('name', { required: 'Candidate Name is required' })}
                    id="name"
                    defaultValue={user?.name}
                    className="border p-2 w-full"
                    />
                    {errors.naem && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="block">Subject:</label>
                    <input
                    {...register('subject', { required: 'Subject is required' })}
                    id="subject"
                    className="border p-2 w-full"
                    />
                    {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
                </div>

                {/* Candidate Email */}
                <div>
                    <label htmlFor="email" className="block">Candidate Email:</label>
                    <input
                        type="email"
                        {...register('email')}
                        defaultValue={user?.email}
                        disabled
                        id="email"
                        className="border p-2 w-full"
                    />
                    {/* {errors.email && <span className="text-red-500">{errors.email.message}</span>} */}
                </div>


                {/* Phone Number Email */}
                <div>
                    <label htmlFor="phoneNumber" className="block">Phone Number:</label>
                    <input
                        type="number"
                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                        id="phoneNumber"
                        className="border p-2 w-full"
                    />
                    {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                </div>

                {/* Address  */}
                <div>
                    <label htmlFor="address" className="block">Address:</label>
                    <input
                        type="text"
                        {...register('address', { required: 'Address is required' })}
                        id="address"
                        className="border p-2 w-full"
                    />
                    {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                </div>

                {/* Address  */}
                <div>
                    <label htmlFor="dateOfBirth" className="block">Date of birth:</label>
                    <input
                        type="date"
                        {...register('dateOfBirth', { required: 'Address is required' })}
                        id="dateOfBirth"
                        className="border p-2 w-full"
                    />
                    {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}
                </div>


                {/* Image */}
                <div>
                    <label htmlFor="image" className="block">Upload Image:</label>
                    <input
                    type="file"
                    {...register('image', { required: 'Image is required' })}
                    id="image"
                    className="border p-2 w-full"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 p-2 bg-blue-500 text-white rounded-md">
                    Submit
                </button>
                </form>
            </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
}
