
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Creator, Topic } from '../types';
import CubeLoader from '../components/CubeLoader';
import Section from '../components/Section';
import AnimatedText from '../components/AnimatedText';
import CreatorCard from '../components/CreatorCard';


const topCreators: Creator[] = [
  { id: 1, name: 'John Doe', category: 'Illustrator', imageUrl: 'https://picsum.photos/seed/creator1/600/600' },
  { id: 2, name: 'Jane Smith', category: 'Photographer', imageUrl: 'https://picsum.photos/seed/creator2/600/600' },
  { id: 3, name: 'Mike Johnson', category: 'Videographer', imageUrl: 'https://picsum.photos/seed/creator3/600/600' },
];

const topTopics: Topic[] = [
  { id: 1, date: '2024.07.20', category: 'NEWS', title: 'Our new project "Future Scape" has launched.' },
  { id:2, date: '2024.07.15', category: 'EVENT', title: 'Upcoming workshop on creative AI.' },
  { id: 3, date: '2024.07.10', category: 'RELEASE', title: 'Creator Jane Smith releases new photo book.' },
];

const Top: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <CubeLoader onLoaded={() => setLoading(false)} />}
      
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <AnimatedText text="WE CREATE THE NEXT GENERATION CREATIVE." className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter" />
      </div>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CREATOR</h2>
          <p>We support the next generation of creators.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topCreators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/creator" className="inline-block border border-black text-black px-12 py-3 hover:bg-black hover:text-white transition-colors duration-300">
            VIEW MORE
          </Link>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">TOPICS</h2>
          <p>The latest news and updates from our agency.</p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {topTopics.map(topic => (
            <div key={topic.id} className="border-b border-black py-4 flex flex-col md:flex-row justify-between items-start">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <span className="text-sm text-gray-600">{topic.date}</span>
                    <span className="text-xs font-bold border border-black px-2 py-1">{topic.category}</span>
                </div>
                <p className="font-medium text-left md:text-right flex-1">{topic.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/topics" className="inline-block border border-black text-black px-12 py-3 hover:bg-black hover:text-white transition-colors duration-300">
            VIEW MORE
          </Link>
        </div>
      </Section>
      
      <Section>
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">COMPANY</h2>
            <p className="max-w-2xl mx-auto mb-8">
                We are a creative agency that discovers and nurtures the talents of the next generation, creating new value and experiences.
            </p>
            <Link to="/company" className="inline-block border border-black text-black px-12 py-3 hover:bg-black hover:text-white transition-colors duration-300">
                ABOUT US
            </Link>
        </div>
      </Section>
    </div>
  );
};

export default Top;
