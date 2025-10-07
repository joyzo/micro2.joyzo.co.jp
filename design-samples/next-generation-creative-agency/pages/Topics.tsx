
import React from 'react';
import type { Topic } from '../types';
import Section from '../components/Section';

const allTopics: Topic[] = [
  { id: 1, date: '2024.07.20', category: 'NEWS', title: 'Our new project "Future Scape" has launched.' },
  { id: 2, date: '2024.07.15', category: 'EVENT', title: 'Upcoming workshop on creative AI.' },
  { id: 3, date: '2024.07.10', category: 'RELEASE', title: 'Creator Jane Smith releases new photo book.' },
  { id: 4, date: '2024.07.05', category: 'NEWS', title: 'We are hiring a new project manager.' },
  { id: 5, date: '2024.06.28', category: 'EVENT', title: 'Recap of our summer creator showcase.' },
  { id: 6, date: '2024.06.20', category: 'RELEASE', title: 'John Doe\'s illustration series now available as prints.' },
  { id: 7, date: '2024.06.15', category: 'NEWS', title: 'Partnership with a leading tech company announced.' },
  { id: 8, date: '2024.06.10', category: 'OTHER', title: 'Our office will be closed for a national holiday.' },
];

const Topics: React.FC = () => {
  return (
    <div className="pt-32">
        <Section>
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">TOPICS</h1>
                <p>The latest updates from our creative world.</p>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
                {allTopics.map(topic => (
                    <div key={topic.id} className="border-b border-gray-300 py-6 flex flex-col md:flex-row md:items-center hover:bg-gray-50 transition-colors duration-300 px-4">
                        <div className="flex items-center space-x-6 mb-3 md:mb-0 md:w-1/3">
                            <span className="text-sm text-gray-500">{topic.date}</span>
                            <span className="text-xs font-bold border border-black px-3 py-1 tracking-wider">{topic.category}</span>
                        </div>
                        <p className="font-semibold text-base md:w-2/3">{topic.title}</p>
                    </div>
                ))}
            </div>
        </Section>
    </div>
  );
};

export default Topics;
