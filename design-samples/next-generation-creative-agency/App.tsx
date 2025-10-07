
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Top from './pages/Top';
import Company from './pages/Company';
import Creator from './pages/Creator';
import Topics from './pages/Topics';
import Contact from './pages/Contact';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="bg-white min-h-screen">
        <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
        <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
        <main>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/company" element={<Company />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
