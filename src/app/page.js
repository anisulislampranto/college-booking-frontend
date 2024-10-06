import CollegesClient from "@/components/colleges/Client";
import GalleryServer from "@/components/gallery/Server";
import ResearchServer from "@/components/research/Server";
import ReviewsServer from "@/components/reviews/ReviewsServer";
import Loader from "@/utils/Loader";
import { Timeline } from "@/utils/timeline";

export default function Home() {
  return (
    <main>
      <CollegesClient />
      <Timeline />
      <GalleryServer />
      <ResearchServer />
      <ReviewsServer />
    </main>
  );
}
