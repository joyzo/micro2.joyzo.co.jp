
import React from 'react';
import Section from '../components/Section';

const InputField: React.FC<{ label: string; type?: string; placeholder: string; required?: boolean; isTextArea?: boolean }> = ({ label, type = 'text', placeholder, required = false, isTextArea = false }) => {
  const commonClasses = "w-full bg-transparent border-b border-black py-3 focus:outline-none focus:border-gray-500 transition-colors";
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-gray-500">*</span>}
      </label>
      {isTextArea ? (
        <textarea placeholder={placeholder} required={required} className={`${commonClasses} h-32 resize-none`}></textarea>
      ) : (
        <input type={type} placeholder={placeholder} required={required} className={commonClasses} />
      )}
    </div>
  );
};


const Contact: React.FC = () => {
  return (
    <div className="pt-32">
        <Section>
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">CONTACT</h1>
                <p>We'd love to hear from you. Get in touch with us.</p>
            </div>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                    <InputField label="NAME" placeholder="Your Name" required />
                    <InputField label="COMPANY" placeholder="Your Company Name" />
                    <InputField label="EMAIL" type="email" placeholder="your@email.com" required />
                    <InputField label="SUBJECT" placeholder="Regarding..." required />
                    <InputField label="MESSAGE" placeholder="Your message here..." required isTextArea />

                    <div className="text-center mt-12">
                        <button type="submit" className="inline-block bg-black text-white px-20 py-4 hover:bg-gray-800 transition-colors duration-300 tracking-widest">
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </Section>
    </div>
  );
};

export default Contact;
