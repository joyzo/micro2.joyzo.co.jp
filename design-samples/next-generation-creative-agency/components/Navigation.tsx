
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'TOP', path: '/' },
  { name: 'CREATOR', path: '/creator' },
  { name: 'TOPICS', path: '/topics' },
  { name: 'COMPANY', path: '/company' },
  { name: 'CONTACT', path: '/contact' },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full md:w-1/3 lg:w-1/4 shadow-lg`}
    >
      <nav className="flex flex-col justify-center h-full pl-12">
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.name} className="mb-8">
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `text-3xl font-bold tracking-wider transition-colors duration-300 hover:text-gray-500 ${isActive ? 'text-black' : 'text-gray-400'}`
                }
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
