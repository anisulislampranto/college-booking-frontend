import CollegesClient from "@/components/colleges/Client";
import GalleryServer from "@/components/gallery/Server";

export default function Home() {
  return (
    <main className={""}>
      <CollegesClient />
      <GalleryServer />
    </main>
  );
}
