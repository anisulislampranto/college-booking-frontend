import CollegesClient from "@/components/colleges/Client";
import GalleryServer from "@/components/gallery/Server";
import ResearchServer from "@/components/research/Server";
import ReviewsServer from "@/components/reviews/ReviewsServer";

export default function Home() {
  return (
    <main>
      <CollegesClient />
      <GalleryServer />
      <ResearchServer />
      <ReviewsServer />
    </main>
  );
}
