import Layout from "@/components/layout";
import SEO from "@/components/layout/Head";
import Image from "next/image";

export default function BioPage() {
  return (
    <>
      <SEO
        title="About Daniel Scott | MDJ Studios"
        description="Learn more about Daniel Scott, founder of MDJ Studios, his journey, expertise, and accomplishments."
        url="https://mdjstudios.com/bio"
        image="/images/daniel.jpg"
      />

      <Layout>
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Meet the Founder
          </h1>

          {/* Bio Section: Horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src="/images/daniel.jpg"
                alt="Daniel Scott"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            </div>

            {/* Bio Summary */}
            <div className="text-lg leading-relaxed">
              <p className="mb-6">
                Daniel is originally from Fort Worth, TX, where he earned a Bachelor&apos;s degree in Business Science 
                with a concentration in Finance. After spending a decade in the financial industry, he saw the potential 
                of software automation to disrupt his role. Determined to stay ahead of the curve, Daniel taught himself software 
                development over two years, all while finishing his career in finance.
              </p>
              <p className="mb-6">
                Daniel now leads MDJ Studios, a software development studio providing solutions for small businesses and non-profits. 
                Since 2017, he has shared his expertise as a Senior Lead Software Engineering Instructor at General Assembly, where he 
                has mentored aspiring software developers and was recognized as a Distinguished Faculty Member for exemplary performance.
              </p>
              <p>
                Daniel is passionate about building software that empowers people and thrives in fast-paced environments. In addition 
                to running his studio, he is actively involved in mentoring the next generation of developers through community events, 
                speaking engagements, workshops, and courses.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 lg:p-8 mt-8">
            <h3 className="text-2xl font-bold mb-4">Work Experience</h3>
            <ul className="space-y-4">
              <li>
                <strong>MDJ Studios</strong> - Owner | Senior Application Developer  
                <span className="block text-gray-500">2014 - Present</span>
                <p>
                  Established a successful digital agency, building and maintaining websites, web applications, and SaaS platforms 
                  for small businesses and non-profits. Mentors aspiring software developers through free workshops and community events.
                </p>
              </li>
              <li>
                <strong>General Assembly</strong> - Senior Lead Software Engineering Instructor  
                <span className="block text-gray-500">2017 - Present</span>
                <p>
                  Mentored hundreds of students to become junior software engineers through immersive programs. Recognized as a Distinguished 
                  Faculty Member for outstanding performance and served on the Product Advisory Board, updating the curriculum to align with industry trends.
                </p>
              </li>
              <li>
                <strong>JPMorgan Chase</strong> - Private Client Banker  
                <span className="block text-gray-500">2007 - 2017</span>
                <p>
                  Managed client relationships and provided financial services to high-net-worth individuals. Coached junior bankers to improve 
                  sales performance and client satisfaction.
                </p>
              </li>
              <li>
                <strong>U.S. Army</strong> - Wheeled Vehicle Mechanic (Sergeant)  
                <span className="block text-gray-500">2004 - 2010</span>
                <p>
                  Provided security for logistics patrol operations in Iraq, completing dozens of missions and receiving several awards, including the Purple Heart.
                </p>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-4">Education</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>University of Phoenix - Bachelor of Business Science (Finance Concentration) | 2011 - 2015</li>
              <li>University of Phoenix - Associate&apos;s Degree of Arts (Finance Fundamentals) | 2008 - 2010</li>
              <li>Coding Dojo, Dallas - Full-Stack Software Engineering Certificate | 2017</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-4">Skills</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Languages: Python, JavaScript, HTML5, CSS3</li>
              <li>Frameworks: React, Next.js, Express, Node.js</li>
              <li>Databases: PostgreSQL, MongoDB, Firebase</li>
              <li>Tools: Git, GitHub Actions, Vercel, AWS</li>
              <li>Testing: Jest, Mocha, Pytest, Unittest</li>
              <li>Operating Systems: Linux (Ubuntu, CentOS, Kali), WSL, macOS</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <a
              href="/assets/dans_resume.pdf"
              download
              className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Download Resume
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
}
