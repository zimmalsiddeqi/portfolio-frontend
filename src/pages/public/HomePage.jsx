import { Helmet } from "react-helmet-async";
import Hero from "../../components/public/Hero";
import About from "../../components/public/About";
import Stats from "../../components/public/Stats";
import ProjectGrid from "../../components/public/ProjectGrid";
import ContactForm from "../../components/public/ContactForm";
import { useProfile } from "../../hooks/useProfile";

const HomePage = () => {
  const { profile } = useProfile();

  return (
    <>
      <Helmet>
        <title>{profile?.meta_title || `${profile?.full_name || "Portfolio"} | Full Stack Developer`}</title>
        <meta name="description" content={profile?.meta_description || profile?.tagline || "Full Stack Developer Portfolio"} />
      </Helmet>

      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <ProjectGrid />
        <ContactForm />
      </main>
    </>
  );
};

export default HomePage;