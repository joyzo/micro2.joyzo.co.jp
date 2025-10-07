
import React, { useRef, useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }
        
        return () => {
            if(textRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(textRef.current);
            }
        };
    }, []);

    return (
        <div ref={textRef} className={`flex flex-wrap ${className}`}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="inline-block"
                    style={{
                        animation: isVisible ? `text-scramble 1s ease-out forwards` : 'none',
                        animationDelay: `${index * 0.03}s`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s, transform 0.5s',
                        transitionDelay: `${index * 0.03}s`,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default AnimatedText;
