
import React from 'react';
import type { Creator } from '../types';

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <div className="group relative overflow-hidden">
      <img src={creator.imageUrl} alt={creator.name} className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <span className="text-white text-lg tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">VIEW MORE</span>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">{creator.name}</h3>
        <p className="text-sm text-gray-500">{creator.category}</p>
      </div>
    </div>
  );
};

export default CreatorCard;
