'use client';

import React, { useEffect, useState } from 'react';

export default function CollegesClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);

  // Function to fetch colleges from the backend
  const fetchColleges = async (query = '') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges?search=${query}&limit=${3}`);
      const data = await res.json();
      setColleges(data.colleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  // Fetch the initial 3 colleges when the component mounts
  useEffect(() => {
    fetchColleges(); // Fetch default colleges (limit 3)
  }, []);

  // Handle input change and query colleges based on the search term
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchColleges(value); // Query colleges based on the search term
  };

  return (
    <div className="py-20 container mx-auto">
      <form action="">
        <label htmlFor="searchCollege"></label>
        <input
          type="text"
          placeholder="Search College by name"
          value={searchTerm}
          onChange={handleSearchChange} // Update search term on input change
          className="p-2 border border-gray-300 rounded"
        />
      </form>

      {/* Display the colleges */}
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {colleges.map((college) => (
          <li key={college._id} className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{college.name}</h3>
            <p>Admission Date: {college.admissionDate}</p>
            <p>Rating: {college.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
