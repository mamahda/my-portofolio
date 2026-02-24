import React from "react";
import { Send, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

/**
 * Contact component for the website.
 *
 * This component provides a contact form and other contact information, including:
 * - A form to send a message using EmailJS.
 * - Direct contact information (email and location).
 * - Links to social media profiles.
 * - Responsive design that adjusts for different screen sizes.
 */
const Contact = () => {
  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          Swal.fire({
            title: "Message Sent!",
            text: "I will get back to you as soon as possible.",
            icon: "success",
            confirmButtonColor: "#2563eb",
            confirmButtonText: "Close",
            customClass: {
              confirmButton: "px-6 py-2.5 rounded-xl font-medium",
              popup: "rounded-3xl",
            },
          });
        },
        (error) => {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonColor: "#2563eb",
            confirmButtonText: "Close",
            customClass: {
              confirmButton: "px-6 py-2.5 rounded-xl font-medium",
              popup: "rounded-3xl",
            },
          });
        },
      );
    e.target.reset();
  };

  // Array of direct contact information
  const contactInfo = [
    { icon: <Mail size={20} />, title: "Email", content: "gilmavira@gmail.com" },
    { icon: <MapPin size={20} />, title: "Location", content: "Surabaya, Indonesia" },
  ];

  // Array of social media links
  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: "GitHub",
      username: "mamahda",
      url: "https://github.com/mamahda",
    },
    {
      icon: <Linkedin size={20} />,
      name: "LinkedIn",
      username: "gilbran-mahda",
      url: "https://www.linkedin.com/in/gilbran-mahda/",
    },
    {
      icon: <Instagram size={20} />,
      name: "Instagram",
      username: "@gbrn.mhd",
      url: "https://instagram.com/gbrn.mhd",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Gradient Blob */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-start justify-between">
          {/* Left Side: Info & Socials */}
          <div className="md:w-5/12 my-8" data-aos="fade-right">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Let's Collaborate</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Interested in Cyber Security, Computer Network, or Linux discussions? Feel free to
              reach out.
            </p>

            {/* Direct Contact Information */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-white hover:bg-white transition-colors shadow-sm"
                >
                  <div className="text-blue-600 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Social Connect</h3>
              <div className="flex flex-col md:flex-row gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group border border-transparent hover:border-blue-100"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        {social.name}
                      </span>
                      <span className="block text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                        {social.username}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:w-6/12 w-full" data-aos="fade-up">
            <div className="relative">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-[2rem] blur-xl opacity-20 transform translate-y-4 scale-95"></div>

              <form
                onSubmit={handleSubmit}
                className="relative bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-white"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <TextField
                    label="Full Name"
                    name="from_name"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{ sx: { borderRadius: "12px" } }}
                  />
                  <TextField
                    label="Email Address"
                    name="from_email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{ sx: { borderRadius: "12px" } }}
                  />
                </div>
                <div className="mb-6">
                  <TextField
                    label="Subject"
                    name="subject"
                    variant="outlined"
                    fullWidth
                    InputProps={{ sx: { borderRadius: "12px" } }}
                  />
                </div>
                <div className="mb-8">
                  <TextField
                    label="Your Message"
                    name="message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{ sx: { borderRadius: "12px" } }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send size={18} />}
                    sx={{
                      bgcolor: "#2563eb",
                      borderRadius: "12px",
                      px: 6,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.4)",
                      "&:hover": {
                        bgcolor: "#1d4ed8",
                        boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.5)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
