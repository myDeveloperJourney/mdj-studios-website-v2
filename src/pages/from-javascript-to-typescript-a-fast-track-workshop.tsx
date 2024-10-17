import Image from 'next/image';
import Layout from '@/components/layout';
import SEO from '@/components/layout/Head';

export default function WorkshopPage () {
  return (
    <>
        <SEO
            title="MDJ Studios | From JavaScript to TypeScript: A Fast-Track Workshop"
            description="Jumpstart your coding journey with this interactive, hands-on workshop! In just two hours, you'll learn the
            fundamentals of JavaScript and TypeScript"
            url="https://mdjstudios.com"
            image="/images/logo.svg"
        />

      <Layout>
        <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          From JavaScript to TypeScript: <br />A Fast-Track Workshop
          </h1>

          <div className="text-center text-gray-600 mb-8">
            <p>
              <strong>Date:</strong> October 24, 2024 <br />
              <strong>Time:</strong> 6 PM - 8 PM CST <br />
              <strong>Location:</strong> Online (Zoom)
            </p>
          </div>

          <div className="relative w-full h-64 mb-8">
            <Image
              src="/images/workshop_banner.jpg"
              alt="Workshop Event"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-semibold mb-6">Workshop Overview</h2>
          <p className="text-lg leading-relaxed mb-6">
            Jumpstart your coding journey with this interactive, hands-on workshop! In just two hours, you&apos;ll learn the
            fundamentals of JavaScript and TypeScript, exploring key concepts such as variables, functions, and types.
            This workshop is designed for everyone—no prior experience is required. Whether you&apos;re new to coding or refreshing your
            knowledge, you&apos;ll have the chance to code along in real-time with expert guidance.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our experienced instructors will guide you every step of the way as you write code live with us. By the end of the workshop,
            you&apos;ll walk away with the confidence to build on what you&apos;ve learned and take the next steps in your coding journey!
          </p>

          <h2 className="text-3xl font-semibold mb-6">What You Will Learn:</h2>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Introduction to JavaScript and TypeScript</li>
            <li>How to declare variables and use different types</li>
            <li>Building and calling functions</li>
            <li>Best practices for writing clean, maintainable code</li>
            <li>Practical coding exercises with real-time feedback</li>
          </ul>

          <h2 className="text-3xl font-semibold mb-6">Meet the Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Speaker 1 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/daniel.jpg"
                alt="Daniel Scott"
                width={128}
                height={128}
                className="rounded-full shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold">Daniel Scott</h3>
              <p className="text-gray-500">Software Engineer & Instructor</p>
            </div>

            {/* Speaker 2 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/ian_mckain.jpeg"
                alt="Ian Mckain"
                width={128}
                height={128}
                className="rounded-full shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold">Ian Mckain</h3>
              <p className="text-gray-500">React Native/Mobile App Developer</p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6">How to Join</h2>
          <p className="text-lg leading-relaxed mb-6">
            This workshop will take place online via Zoom. After registering, you&apos;ll receive an email with the Zoom link
            and all the necessary details. Make sure to join a few minutes early to get set up!
          </p>

          <h3 className="text-3xl font-semibold mb-6">Stay Tuned for more Information!</h3>
          {/* <div className="text-center">
            <button
              className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Register Now
            </button>
          </div> */}
        </section>
      </Layout>
    </>
  );
};

