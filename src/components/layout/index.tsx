import Hero from "./HeroBanner";
import Main from "./Main";
import Footer from "./Footer";
import Navbar from "../ui/Navbar";
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <Hero />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;