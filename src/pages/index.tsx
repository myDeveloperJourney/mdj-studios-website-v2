import localFont from "next/font/local";
import Layout from "@/components/layout";
import Image from 'next/image';
import SEO from "@/components/layout/Head";
import { useForm, ValidationError } from "@formspree/react";
import React, { useState, useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.succeeded) {
      setDisplaySuccessMessage(true);
      setFormState({ name: "", email: "", message: "" });
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (displaySuccessMessage) {
      const timer = setTimeout(() => {
        setDisplaySuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [displaySuccessMessage]);

  return (
    <>
      <SEO
        title="MDJ Studios | Home"
        description="MDJ Studios is a digital agency that specializes in software and web development, user experience design, and creative support."
        url="https://mdjstudios.com"
        image="/images/logo.svg"
      />
      <Layout>
        {/* Our Promise Section */}
        <section className="max-w-6xl mx-auto px-4 py-16 text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
            Our Promise
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            At MDJ Studios, we are committed to excellence in every digital
            endeavor. Our team promises to deliver top-tier software and web
            development solutions that optimize efficiency and enhance your
            digital presence. We prioritize user experience by creating engaging
            and motivating digital interfaces for your websites, applications, and
            SaaS products. With a robust in-house marketing team, we also provide
            comprehensive creative support, from graphic design to content
            production, ensuring your digital communication is impactful and
            effective. Trust us to bring your digital aspirations to life, saving
            time and captivating your audience.
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-left">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src="/images/software-dev.webp"
                  alt="Software/Web Development"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Software/Web Development
                </h3>
                <p className="text-gray-700">
                  My team creates exceptional digital experiences using best
                  practices, resulting in stunning results that save time for
                  clients and their customers.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src="/images/ux-design.webp"
                  alt="Focused on User Experience"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Focused on User Experience</h3>
                <p className="text-gray-700">
                  My team will create a digital experience that engages your
                  audience and motivates your organization, whether it&apos;s your
                  website, web application, or SaaS product.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src="/images/creative-support.webp"
                  alt="Innovative Creative Support"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Innovative Creative Support
                </h3>
                <p className="text-gray-700">
                  My team and I are in-house marketing department. We are the
                  designers, writers, and multimedia producers that create your
                  social media, all things digital.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="portfolio" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-left">
            Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <a href="https://rogerswildlife.org" target="_blank">
                  <Image
                    src="/images/rogers-wildlife.jpg"
                    alt="Roger's Wildlife"
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Roger&apos;s Wildlife
                </h3>
                <p className="text-gray-500 mt-4">
                  This is a website built for a non-profit bird rescue center.
                  Built with Next.js and Vercel, it includes donation functionality, an interactive map, a photo gallery,
                  and content related to the organization&apos;s mission.
                </p>
              </div>
            </div>

            {/* Project 2 */}

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <a href="https://thewrightfenceco.com" target="_blank">
                  <Image
                    src="/images/the-wright-fence-co.jpg"
                    alt="The Wright Fence Co."
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">The Wright Fence Co.</h3>
                <p className="text-gray-500 mt-4">
                  Built with Next.js and Netlify, this site includes a services lineup,
                  carousel, embedded chat, interactive map, and several business-oriented features.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                <a href="https://listingview.io" target="_blank">
                  <Image
                    src="/images/listing-view.jpg"
                    alt="Listing View"
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Listing View
                </h3>
                <p className="text-gray-500 mt-4">
                  Listing View is a SaaS product providing Etsy sellers insights on successful listings.
                  We helped the client with authentication, a full-site audit for compliance, and site rebranding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Contact Us</h2>

          {/* Centered layout for profile and form */}
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center gap-8">
            {/* Profile Section */}
            <div className="text-center mt-[18px]">
              <Image
                src="/images/daniel.jpg" // replace with your image path
                alt="Daniel Scott"
                className="w-48 h-48 rounded-full mx-auto object-cover"
                width={192} // This value matches 48px * 4 = 192px for a good profile size
                height={192}
              />
              <h3 className="text-2xl font-bold mt-4">Daniel Scott</h3>
              <p className="text-gray-500">Engineering/Project Manager</p>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
            >
              <div className="text-center mb-6 h-[18px]">
                {displaySuccessMessage && (
                  <p className="text-xl text-green-600 font-semibold">
                    Your message has been sent!
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={formState.name}
                  id="name"
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={formState.email}
                  id="email"
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  onChange={handleChange}
                  value={formState.message}
                  id="message"
                  name="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  rows={5}
                  required
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
                >
                  SEND
                </button>
                <ValidationError errors={state.errors} />
              </div>
            </form>
          </div>
        </section>

        <style jsx global>
          {`
            :root {
              ${geistSans}
              ${geistMono}
              }
              body {
                font-family: var(--font-geist-sans);
                }
                code {
                  font-family: var(--font-geist-mono);
                  }
                  `}
        </style>
      </Layout>
    </>
  );
}
