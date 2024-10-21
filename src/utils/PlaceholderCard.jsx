import Link from 'next/link';

export const placeholderCard = (
    <li className="p-4 border rounded-sm flex flex-col gap-2 animate-pulse">
      <div className='relative h-56 w-full bg-gray-300 rounded-sm' />
      <h3 className="text-lg font-semibold bg-gray-300 h-6 w-32 mt-2 rounded-sm" />
      <p className="bg-gray-300 h-4 w-40 mt-1 rounded-sm" />
      <div className="bg-gray-300 h-4 w-24 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-32 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-28 mt-2 rounded-sm" />
      <div className="bg-gray-300 h-4 w-36 mt-2 rounded-sm" />
      <Link href="#" className="w-52 mt-4 bg-gray-300 h-10 rounded-md" />
    </li>
  );