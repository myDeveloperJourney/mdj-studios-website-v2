import localFont from "next/font/local";
import Layout from "@/components/layout";

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
  return (
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
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/images/software-dev.webp"
              alt="Software/Web Development"
              className="w-full h-48 object-cover"
            />
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

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/images/ux-design.webp"
              alt="Focused on User Experience"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Focused on User Experience</h3>
              <p className="text-gray-700">
                My team will create a digital experience that engages your
                audience and motivates your organization, whether it&apos;s your
                website, web application, or SaaS product.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/images/creative-support.webp"
              alt="Innovative Creative Support"
              className="w-full h-48 object-cover"
            />
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

      {/* Contact Us Section */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Contact Us</h2>
        
        {/* Centered layout for profile and form */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center gap-8">
          {/* Profile Section */}
          <div className="text-center">
            <img
              src="/images/daniel.jpg" // replace with your image path
              alt="Daniel Scott"
              className="w-48 h-48 rounded-full mx-auto object-cover"
            />
            <h3 className="text-2xl font-bold mt-4">Daniel Scott</h3>
            <p className="text-gray-500">Engineering/Project Manager</p>
          </div>

          {/* Form Section */}
          <form
            action="/api/contact"
            method="POST"
            className="w-full max-w-md"
            data-vercel="true"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                name="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                rows={5}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
              >
                SEND
              </button>
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
  );
}
