import React from 'react';
import Navbar from '@/components/common/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-container">
      <div className="gradient-mesh" />
      <div className="noise-overlay" />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
