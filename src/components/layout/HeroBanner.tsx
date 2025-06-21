import Link from "next/link";
import React from "react";

interface HeroProps {
    coverImageSourceURL?: string;
    articleTitle?: string;
}

const Hero: React.FC<HeroProps> = ({ coverImageSourceURL, articleTitle }) => {
    return (
        <section
            className="relative h-[300px] md:h-[350px] flex items-center justify-center text-white overflow-hidden"
            role="banner"
            aria-label="Hero section for MDJ Studios"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${coverImageSourceURL || '/images/hero-background.webp'})`,
                }}
                aria-hidden="true"
            />

            {/* Foreground */}
            <div className="relative z-10 text-center px-4 w-full max-w-screen-md mx-auto animate-fade-in-up">
                <h1 className="text-white font-bold text-[clamp(2rem,6vw,3rem)] leading-tight">
                    {articleTitle || "MDJ Studios"}
                </h1>

                {!articleTitle && (
                    <>
                        <p className="mt-2 text-[clamp(1rem,2vw,1.5rem)] text-gray-200 font-light">
                            We build tailored solutions for your digital success.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-block mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium rounded-md"
                        >
                            Let’s Talk
                        </Link>
                    </>
                )}
            </div>
        </section>

    );
};

export default Hero;
