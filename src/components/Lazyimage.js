import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(imageRef.current);
                }
            });
        });

        observer.observe(imageRef.current);

        const currentImageRef = imageRef.current;

        return () => {
            if (currentImageRef) {
                observer.unobserve(currentImageRef);
            }
        };
    }, []);

    return (
        <img ref={imageRef} src={isVisible ? src : ''} alt={alt} className="lazy-image" />
    );
};

export default LazyImage;
