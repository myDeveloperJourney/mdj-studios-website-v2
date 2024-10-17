import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false); // State to control the menu

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu open/close
    };
    
    const router = useRouter();    

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault(); // Prevent default anchor behavior

        if (router.pathname !== "/") {
            router.push("/" + target)
        } else {
            const section = document.querySelector(target); // Select the target section
            if (section) {
                section.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the section
                setMenuOpen(false); // Close the menu after click
            } else {
                console.error(`Section not found: ${target}`); // Log an error if the section is not found
            }
        }
    };


    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen ? "true" : "false"}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 6h18M3 12h18M3 18h18"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/">
                                <Image
                                    className="h-8 w-auto"
                                    src="/images/logo.svg"
                                    alt="MDJ Studios"
                                    height={8}
                                    width={8}
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                
                                { router.pathname !== "/" && 
                                    <a
                                        href="/"
                                        className="rounded-md hover:bg-gray-700 px-3 py-2 text-sm font-medium text-white"
                                        aria-current="page"
                                    >
                                        Home
                                    </a>
                                
                                }
                                <a
                                    href="/#services"
                                    onClick={(e) => handleSmoothScroll(e, "#services")}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Services
                                </a>
                                <a
                                    href="/#contact"
                                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`sm:hidden ${menuOpen ? "block" : "hidden"}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a
                        href="#home"
                        onClick={(e) => handleSmoothScroll(e, "#home")}
                        className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                        aria-current="page"
                    >
                        Home
                    </a>
                    <a
                        href="#services"
                        onClick={(e) => handleSmoothScroll(e, "#services")}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Services
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleSmoothScroll(e, "#contact")}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </nav>
    );
}
