import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import SkillsPanel from "../components/home/SkillsPanel";

function Home() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <Hero />
                <AboutPreview />
                <SkillsPanel />
            </main>
        </>
    );
}

export default Home;