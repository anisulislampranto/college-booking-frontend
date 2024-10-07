import React from "react";
import Image from "next/image";
import logo from '../assets/Board_of_Intermediate_and_Secondary_Education_Dhaka_Monogram.svg.png'


export default function Loader () {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src={logo} 
        alt="Loading..."
        width={200}
        height={200}
        className="animate-pulse"
      />
    </div>
  );
};
