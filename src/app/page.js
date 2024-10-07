import CollegeSearch from "@/components/collegeSearch/Client";
import GalleryServer from "@/components/gallery/Server";
import ResearchServer from "@/components/research/Server";
import ReviewsServer from "@/components/reviews/ReviewsServer";

export default function Home() {
  return (
    <main>
      <CollegeSearch />
      <GalleryServer />
      <ResearchServer />
      <ReviewsServer />
    </main>
  );
}
