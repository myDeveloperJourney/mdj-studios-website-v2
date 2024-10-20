import Hero from "./HeroBanner";
import Main from "./Main";
import Footer from "./Footer";
import Navbar from "../ui/Navbar";
import React, { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;