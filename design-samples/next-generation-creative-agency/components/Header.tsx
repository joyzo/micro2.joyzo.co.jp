
import React from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="fixed top-0 right-0 p-8 z-50">
      <button 
        onClick={onMenuToggle} 
        className="text-black font-medium text-lg tracking-widest focus:outline-none transition-transform duration-300 hover:scale-105"
      >
        {isMenuOpen ? 'CLOSE' : 'MENU'}
      </button>
    </header>
  );
};

export default Header;
