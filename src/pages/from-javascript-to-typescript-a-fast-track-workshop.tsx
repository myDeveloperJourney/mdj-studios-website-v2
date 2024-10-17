import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import SEO from '@/components/layout/Head';
import { useForm, ValidationError } from '@formspree/react';

export default function WorkshopPage() {
  // const formId: string = process.env.NEXT_PUBLIC_FORM || 'abc123';
  const formId: string = process.env.NEXT_PUBLIC_FORM || 'meoqqdgz';
  const [state, handleSubmit] = useForm(formId);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    consent: true,
    role: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    if (state.succeeded) {
      setDisplaySuccessMessage(true);
      setFormState({
        name: '',
        email: '',
        consent: false,
        role: '',
        message: '',
      });
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (displaySuccessMessage) {
      const timer = setTimeout(() => setDisplaySuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [displaySuccessMessage]);

  return (
    <>
      <SEO
        title="MDJ Studios | From JavaScript to TypeScript: A Fast-Track Workshop"
        description="Jumpstart your coding journey with this hands-on workshop!"
        url="https://mdjstudios.com/workshop"
        image="/images/logo.svg"
      />

      <Layout>
        <section className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            From JavaScript to TypeScript: <br /> A Fast-Track Workshop
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
            Jumpstart your coding journey with this interactive, hands-on workshop! In just two hours,
            you&apos;ll learn the fundamentals of JavaScript and TypeScript, exploring key concepts
            such as variables, functions, and types.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Whether you&apos;re new to coding or refreshing your knowledge, you&apos;ll have the chance
            to code along with us in real-time.
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

          <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up for the Workshop</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-12">
            {displaySuccessMessage && (
              <p className="text-xl text-green-600 font-semibold text-center mb-6">
                Thank you for signing up! Check your email for the Zoom invite.
              </p>
            )}

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
                Email (for Calendar Invite)
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

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  onChange={handleChange}
                  checked={formState.consent}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">
                  Can we contact you about this and future events and updates?
                </span>
              </label>
              <ValidationError prefix="Consent" field="consent" errors={state.errors} />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Job Role
              </label>
              <select
                id="role"
                name="role"
                onChange={handleChange}
                value={formState.role}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                required
              >
                <option value="">Select your role</option>
                <option value="Student">Student</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Other">Other</option>
              </select>
              <ValidationError prefix="Role" field="role" errors={state.errors} />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={state.submitting}
                className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Register Now
              </button>
              <ValidationError errors={state.errors} />
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
}
