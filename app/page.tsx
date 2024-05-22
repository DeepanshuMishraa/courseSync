import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewHero from "@/components/NewHero";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <NewHero/>
      <Footer/>
    </main>
  );
}
