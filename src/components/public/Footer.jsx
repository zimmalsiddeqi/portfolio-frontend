import { Link } from "react-router-dom";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoWhatsapp,
  IoMail,
  IoCall,
  IoHeart,
} from "react-icons/io5";
import { useProfile } from "../../hooks/useProfile";

const Footer = () => {
  const { profile } = useProfile();
  const year = new Date().getFullYear();
  const whatsappNumber = profile?.social_links?.whatsapp || "923440114925";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <footer className="relative border-t border-gray-200/50 dark:border-white/5 mt-20">
      <div className="container-custom section-padding !py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo & Info */}
          <div>
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              {profile?.full_name || "Shawkat Siddeqi"}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              {profile?.title || "Full Stack Developer"} building digital experiences that matter.
            </p>
            {profile?.social_links?.phone && (
              <a
                href={`tel:${profile.social_links.phone}`}
                className="inline-flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                <IoCall className="w-4 h-4" />
                {profile.social_links.phone}
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Quick Links</h4>
            <div className="flex md:justify-center gap-4 flex-wrap">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() =>
                    document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Connect</h4>
            <div className="flex md:justify-end gap-2 flex-wrap">
              {profile?.social_links?.github && (
                <a href={profile.social_links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:text-primary-500 transition-colors" title="GitHub">
                  <IoLogoGithub className="w-5 h-5" />
                </a>
              )}
              {profile?.social_links?.linkedin && (
                <a href={profile.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:text-blue-500 transition-colors" title="LinkedIn">
                  <IoLogoLinkedin className="w-5 h-5" />
                </a>
              )}
              {profile?.social_links?.email && (
                <a href={`mailto:${profile.social_links.email}`} className="p-2 rounded-lg glass hover:text-accent-500 transition-colors" title="Email">
                  <IoMail className="w-5 h-5" />
                </a>
              )}
              <button onClick={handleWhatsAppClick} className="p-2 rounded-lg glass hover:text-green-500 transition-colors" title="WhatsApp">
                <IoLogoWhatsapp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-white/5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 flex-wrap">
            © {year} {profile?.full_name || "Shawkat Siddeqi"}. Made with
            <IoHeart className="w-4 h-4 text-red-500 animate-pulse" />
            using React & Tailwind CSS
          </p>

          {/* HIDDEN ADMIN LINK - Very subtle, only you know it's here */}
          <Link
            to="/admin"
            className="inline-block mt-3 text-[10px] text-gray-300 dark:text-dark-600 hover:text-primary-500 transition-colors opacity-30 hover:opacity-100"
            title=""
          >
            ·
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;