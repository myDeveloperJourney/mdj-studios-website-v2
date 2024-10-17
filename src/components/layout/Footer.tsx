import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
    const router = useRouter();
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="text-center">
                <p className="py-2">
                    Copyright &copy; 2021 All Rights Reserved MDJ Studios
                </p>
                {
                    router.pathname !== "/privacy-policy" &&
                    <p>
                        <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
                            Our Privacy Policy
                        </Link>
                    </p>
                }
                <br />
                <p>
                    <a href="#top" className="text-indigo-400 hover:text-indigo-300">
                        Navigate to top
                    </a>
                </p>
            </div>
        </footer>
    );
}
