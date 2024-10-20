import Link from "next/link";
import React from "react";

interface HeroProps {
    coverImageSourceURL?: string;
    articleTitle?: string;
}

const Hero: React.FC<HeroProps> = ({ coverImageSourceURL, articleTitle }) => {
    return (
        <div className="relative bg-gray-800 h-[300px] md:h-[500px] flex items-center justify-center text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: coverImageSourceURL ? `url(${coverImageSourceURL})` : "url('/images/hero-background.webp')",
                }}
            ></div>

            {/* Overlay */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Company Name */}
                <h1 className="text-5xl font-bold">{articleTitle ? articleTitle : "MDJ Studios"}</h1>
                {
                    !articleTitle && (
                        <>
                            {/* Tagline */}
                            <p className="text-xl">Innovative Software Solutions</p>

                            {/* Contact Button */}
                            <Link
                                href="/#contact"
                                className="mt-6 px-6 py-2 bg-black text-white font-semibold hover:bg-gray-700 transition duration-300 rounded-md"
                            >
                                Contact Us
                            </Link>
                        </>
                    )
                }

            </div>
        </div>
    );
}

export default Hero;
