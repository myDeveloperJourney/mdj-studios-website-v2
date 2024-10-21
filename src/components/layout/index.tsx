import Hero from "./HeroBanner";
import Main from "./Main";
import Footer from "./Footer";
import Navbar from "../ui/Navbar";
import React, { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

interface LayoutProps {
    children: ReactNode;
    coverImageSourceURL?: string;
    articleTitle?: string;

}

const Layout: React.FC<LayoutProps> = ({ children, coverImageSourceURL, articleTitle }) => {
    return (
        <div id="top" className="layout-container">
            <Navbar />
            <Hero coverImageSourceURL={coverImageSourceURL} articleTitle={articleTitle} />
            <Main>
                {children}
                <SpeedInsights />
                <Analytics />
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;