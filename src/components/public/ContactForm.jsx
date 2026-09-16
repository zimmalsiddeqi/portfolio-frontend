import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  IoSend,
  IoMailOpen,
  IoLocation,
  IoLogoWhatsapp,
  IoCall,
  IoCheckmarkCircle,
} from "react-icons/io5";
import AnimatedSection from "../shared/AnimatedSection";
import GlassCard from "../shared/GlassCard";
import Input from "../shared/Input";
import Button from "../shared/Button";
import contactService from "../../services/contactService";
import { useProfile } from "../../hooks/useProfile";

const ContactForm = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const whatsappNumber = profile?.social_links?.whatsapp || "923440114925";
  const phoneNumber = profile?.social_links?.phone || "+923440114925";
  const email = profile?.social_links?.email || "shawkatsiddeqi@gmail.com";

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await contactService.send(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi Shawkat! I visited your portfolio and I'd like to discuss a project with you.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>
        </AnimatedSection>

        {/* Quick WhatsApp CTA Banner */}
        <AnimatedSection delay={0.1}>
          <motion.div
            className="max-w-4xl mx-auto mb-12 relative overflow-hidden rounded-3xl"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-95" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Cpath d=%22M30 30l30-30v60l-30-30zM0 30l30 30V0L0 30z%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22/%3E%3C/svg%3E')] opacity-30" />

            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  Need a quick response?
                </h3>
                <p className="text-white/90 text-base md:text-lg">
                  Chat with me directly on WhatsApp for instant replies
                </p>
              </div>
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-2xl font-bold shadow-2xl hover:shadow-white/30 whitespace-nowrap"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                Chat on WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection direction="right" delay={0.1}>
              <a href={`mailto:${email}`} className="block">
                <GlassCard className="p-6 group cursor-pointer" hover3D>
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-neon group-hover:scale-110 transition-transform">
                      <IoMailOpen className="w-6 h-6" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 text-gray-800 dark:text-white">Email</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate group-hover:text-primary-500 transition-colors">
                        {email}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <a href={`tel:${phoneNumber}`} className="block">
                <GlassCard className="p-6 group cursor-pointer" hover3D>
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-neon-accent group-hover:scale-110 transition-transform">
                      <IoCall className="w-6 h-6" />
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-gray-800 dark:text-white">Phone</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-accent-500 transition-colors">
                        {phoneNumber}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <button onClick={handleWhatsAppClick} className="block w-full text-left">
                <GlassCard className="p-6 group cursor-pointer" hover3D>
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
                      <IoLogoWhatsapp className="w-6 h-6" />
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-gray-800 dark:text-white">WhatsApp</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-green-500 transition-colors">
                        Click to start chatting
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </button>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <GlassCard className="p-6" hover3D>
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                    <IoLocation className="w-6 h-6" />
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-gray-800 dark:text-white">Location</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Shangla, Pakistan
                    </p>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.5}>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
                  <p className="font-semibold text-gray-800 dark:text-white">Available for work</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Currently accepting freelance projects and full-time opportunities.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection direction="left" className="lg:col-span-3">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                Send a Message
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form and I'll respond within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input
                    label="Your Email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="Project Discussion"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
                <Input
                  label="Message"
                  name="message"
                  textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    loading={loading}
                    icon={IoSend}
                    iconPosition="right"
                    className="flex-1"
                    size="lg"
                  >
                    Send Message
                  </Button>
                  <motion.button
                    type="button"
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-whatsapp !py-4 !text-base"
                  >
                    <IoLogoWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </motion.button>
                </div>
              </form>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;