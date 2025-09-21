
import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a href="#" className="text-black hover:opacity-70 transition-opacity">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-16 px-8 md:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">NGC.</h3>
            <p className="text-sm">
              1-23-4 Shinjuku, Shinjuku-ku, Tokyo, Japan 123-4567
            </p>
            <p className="text-sm mt-2">TEL: 03-1234-5678</p>
          </div>
          <div className="md:col-span-1 flex flex-col items-start md:items-center">
            <ul className="text-sm space-y-2">
              <li><Link to="/creator" className="hover:underline">CREATOR</Link></li>
              <li><Link to="/topics" className="hover:underline">TOPICS</Link></li>
              <li><Link to="/company" className="hover:underline">COMPANY</Link></li>
              <li><Link to="/contact" className="hover:underline">CONTACT</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1 flex flex-col items-start md:items-end">
             <div className="flex space-x-4 mb-4">
               <SocialIcon>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
               </SocialIcon>
               <SocialIcon>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
               </SocialIcon>
               <SocialIcon>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </SocialIcon>
             </div>
             <p className="text-xs">&copy; 2024 NEXT GENERATION CREATIVE. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
