import CollegeDetailsClient from '@/components/college/CollegeDetailsClient';


// Function to fetch data for each page (runs at build time)
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges`);
  const data = await res.json();

  return data.colleges.map((college) => ({
    id: college._id,
  }));
}

// Fetch the college data during build or request
export async function getCollegeDetails(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colleges/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch college details');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching college details:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const collegeDetails = await getCollegeDetails(params.id);

  return {
    title: collegeDetails ? collegeDetails.name : 'College Details',
    description: `Details about ${collegeDetails?.name}`,
  };
}

export default async function Page({ params }) {
  const collegeDetails = await getCollegeDetails(params.id);

  if (!collegeDetails) {
    return <div className="h-screen text-center flex items-center justify-center">No details found for this college.</div>;
  }

  return <CollegeDetailsClient collegeDetails={collegeDetails} />;
}
