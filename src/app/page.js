import CollegesClient from "@/components/colleges/Client";
import GalleryServer from "@/components/gallery/Server";
import ResearchServer from "@/components/research/Server";
import ReviewsServer from "@/components/reviews/ReviewsServer";
import Loader from "@/utils/Loader";

export default function Home() {
  return (
    <main>
      <CollegesClient />
      {/* <Loader /> */}
      <GalleryServer />
      <ResearchServer />
      <ReviewsServer />
    </main>
  );
}
