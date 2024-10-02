import CollegesClient from "@/components/colleges/Client";
import GalleryServer from "@/components/gallery/Server";
import ResearchServer from "@/components/research/Server";

export default function Home() {
  return (
    <main className={""}>
      <CollegesClient />
      <GalleryServer />
      <ResearchServer />
    </main>
  );
}
