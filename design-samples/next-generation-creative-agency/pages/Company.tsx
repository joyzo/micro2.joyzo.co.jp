
import React from 'react';
import Section from '../components/Section';

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col md:flex-row border-b border-gray-200 py-4">
    <dt className="w-full md:w-1/4 font-bold text-gray-500">{label}</dt>
    <dd className="w-full md:w-3/4">{value}</dd>
  </div>
);

const Company: React.FC = () => {
  return (
    <div className="pt-32">
        <Section>
            <div className="text-center mb-24">
                <h1 className="text-5xl font-bold mb-4">COMPANY</h1>
                <p>Shaping the future of creativity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                <div>
                    <h2 className="text-3xl font-bold mb-4">OUR MISSION</h2>
                    <p className="text-base leading-relaxed">
                        To discover, nurture, and promote the next generation of creative talent. We believe in the power of fresh ideas and unique perspectives to drive culture forward. By providing a platform for emerging artists, we aim to create new value and unforgettable experiences that resonate globally.
                    </p>
                </div>
                <img src="https://picsum.photos/seed/company1/800/600" alt="Company Mission" className="w-full h-auto object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <img src="https://picsum.photos/seed/company2/800/600" alt="Company Vision" className="w-full h-auto object-cover order-last md:order-first" />
                <div>
                    <h2 className="text-3xl font-bold mb-4">OUR VISION</h2>
                    <p className="text-base leading-relaxed">
                        To build a global creative ecosystem where artists and brands collaborate to push the boundaries of innovation. We envision a world where creativity is the primary currency, connecting people and communities through shared stories and inspiring content.
                    </p>
                </div>
            </div>
        </Section>
        
        <Section>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">COMPANY PROFILE</h2>
                <dl>
                    <InfoRow label="Company Name" value="Next Generation Creative Inc." />
                    <InfoRow label="Established" value="October 1, 2020" />
                    <InfoRow label="CEO" value="Taro Yamada" />
                    <InfoRow label="Address" value="1-23-4 Shinjuku, Shinjuku-ku, Tokyo, Japan 123-4567" />
                    <InfoRow label="Business" value="Talent Management, Content Production, Event Planning, Brand Consulting" />
                </dl>
            </div>
        </Section>
    </div>
  );
};

export default Company;
