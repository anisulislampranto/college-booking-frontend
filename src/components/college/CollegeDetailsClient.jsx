'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Timeline } from '@/utils/timeline';




export default function CollegeDetailsClient({ collegeDetails }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
  
    if (!collegeDetails) return <div className="h-screen text-center flex items-center justify-center">No details found for this college.</div>;
  
    if (!loading && !user) {
      router.push('/signup');
    }


    const timelineData = [
        {   
            name: 'Events',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse veritatis quod dolorum nostrum sed consequatur? Sint itaque placeat, numquam et fuga quis obcaecati laboriosam harum. Sed obcaecati nemo quas ex autem rem reiciendis esse expedita? Asperiores non, inventore placeat magni tenetur deserunt fugiat dolore praesentium molestiae rerum sint laudantium? Deleniti dicta optio, labore voluptatibus in ipsa id maiores nemo quaerat voluptatum atque sed magnam, distinctio est repellat molestiae? Quisquam temporibus expedita doloremque esse necessitatibus, beatae ipsa incidunt nemo sapiente repellendus ipsam cum labore aut ut porro ipsum repellat, facere earum hic quo iure? Dicta, debitis voluptatum modi similique commodi qui?',
            content: 
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {collegeDetails?.events?.map((el) => (
                    <li key={el._id} className="shadow-md rounded-sm p-5"> 
                        <img src={el.image} alt="img" className="h-36 w-full" />
                        <h3 className="capitalize text-xl"> {el.name} </h3>
                        <p> Date: {el.date} </p>
                        <p> {el.description} </p>
                    </li>
                    ))}
                </ul>
            </div>
        },
        {
            name: 'Sports',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse veritatis quod dolorum nostrum sed consequatur? Sint itaque placeat, numquam et fuga quis obcaecati laboriosam harum. Sed obcaecati nemo quas ex autem rem reiciendis esse expedita? Asperiores non, inventore placeat magni tenetur deserunt fugiat dolore praesentium molestiae rerum sint laudantium? Deleniti dicta optio, labore voluptatibus in ipsa id maiores nemo quaerat voluptatum atque sed magnam, distinctio est repellat molestiae? Quisquam temporibus expedita doloremque esse necessitatibus, beatae ipsa incidunt nemo sapiente repellendus ipsam cum labore aut ut porro ipsum repellat, facere earum hic quo iure? Dicta, debitis voluptatum modi similique commodi qui?',
            content: 
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {collegeDetails?.sports?.map((el) => (
                    <li key={el._id} className="shadow-md rounded-sm p-5">
                        <img src={el.image} alt="img" className="h-36 w-full" />
                        <h3 className="capitalize text-xl"> {el.name} </h3>
                        <p> {el.description} </p>
                    </li>
                    ))}
                </ul>
            </div>
        },
        {
            name: 'Researches',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse veritatis quod dolorum nostrum sed consequatur? Sint itaque placeat, numquam et fuga quis obcaecati laboriosam harum. Sed obcaecati nemo quas ex autem rem reiciendis esse expedita? Asperiores non, inventore placeat magni tenetur deserunt fugiat dolore praesentium molestiae rerum sint laudantium? Deleniti dicta optio, labore voluptatibus in ipsa id maiores nemo quaerat voluptatum atque sed magnam, distinctio est repellat molestiae? Quisquam temporibus expedita doloremque esse necessitatibus, beatae ipsa incidunt nemo sapiente repellendus ipsam cum labore aut ut porro ipsum repellat, facere earum hic quo iure? Dicta, debitis voluptatum modi similique commodi qui?',
            content: 
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {collegeDetails?.sports?.map((el) => (
                    <li key={el._id} className="shadow-md rounded-sm p-5">
                        <img src={el.image} alt="img" className="h-36 w-full" />
                        <h3 className="capitalize text-xl"> {el.name} </h3>
                        <p> {el.description} </p>
                    </li>
                    ))}
                </ul>
            </div>
        }
    ]
  
    return (
      <div className="container mx-auto py-10 space-y-4 px-5">
        <img src={collegeDetails.image} alt="img" className="h-[20rem] md:h-[30rem] w-full" />
        <h1 className="text-5xl capitalize">{collegeDetails.name}</h1>

        {/* Timeline */}
        <Timeline data={timelineData} />
        {/* Timeline */}
  
        {/* Admission Process */}
        <div className="flex flex-col gap-10 mt-10">
          <Link href={'/admission'} className="text-center w-36 p-2 bg-black text-white rounded-md">
            Take Admission
          </Link>
        </div>
      </div>
    );
  }