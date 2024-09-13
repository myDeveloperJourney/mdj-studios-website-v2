import Header from "./Header";
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
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;