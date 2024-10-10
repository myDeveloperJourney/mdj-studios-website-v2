import Hero from "./HeroBanner";
import Main from "./Main";
import Footer from "./Footer";
import Navbar from "../ui/Navbar";
import React, { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div id="top" className="layout-container">
            <Navbar />
            <Hero />
            <Main>
                {children}
                <SpeedInsights />
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;