
import React, { useState, useMemo } from 'react';
import type { Creator } from '../types';
import CreatorCard from '../components/CreatorCard';
import Section from '../components/Section';

const allCreators: Creator[] = [
  { id: 1, name: 'John Doe', category: 'Illustrator', imageUrl: 'https://picsum.photos/seed/creator1/600/600' },
  { id: 2, name: 'Jane Smith', category: 'Photographer', imageUrl: 'https://picsum.photos/seed/creator2/600/600' },
  { id: 3, name: 'Mike Johnson', category: 'Videographer', imageUrl: 'https://picsum.photos/seed/creator3/600/600' },
  { id: 4, name: 'Emily White', category: 'Illustrator', imageUrl: 'https://picsum.photos/seed/creator4/600/600' },
  { id: 5, name: 'Chris Green', category: 'Musician', imageUrl: 'https://picsum.photos/seed/creator5/600/600' },
  { id: 6, name: 'Sarah Black', category: 'Photographer', imageUrl: 'https://picsum.photos/seed/creator6/600/600' },
  { id: 7, name: 'David Brown', category: 'Videographer', imageUrl: 'https://picsum.photos/seed/creator7/600/600' },
  { id: 8, name: 'Lisa Yellow', category: 'Musician', imageUrl: 'https://picsum.photos/seed/creator8/600/600' },
  { id: 9, name: 'Tom Grey', category: 'Illustrator', imageUrl: 'https://picsum.photos/seed/creator9/600/600' },
];

const categories = ['ALL', 'Illustrator', 'Photographer', 'Videographer', 'Musician'];

const Creator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredCreators = useMemo(() => {
    if (activeCategory === 'ALL') {
      return allCreators;
    }
    return allCreators.filter(creator => creator.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32">
        <Section>
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">CREATOR</h1>
                <p>Meet our talented artists and visionaries.</p>
            </div>

            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 border border-black text-sm font-medium transition-colors duration-300 ${
                            activeCategory === category
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredCreators.map(creator => (
                    <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
        </Section>
    </div>
  );
};

export default Creator;
