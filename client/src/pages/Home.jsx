import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import SkillsPanel from "../components/home/SkillsPanel";
import RolePathways from "../components/home/RolePathways";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <Hero />
        <AboutPreview />
        <SkillsPanel />
        <RolePathways />
        <FeaturedProjects />
      </main>

      <Footer />
    </>
  );
}

export default Home;