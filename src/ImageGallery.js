import React, { useState, useEffect } from 'react';
import "./App.css";

const SearchForm = ({ handleSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = event => {
        setQuery(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        handleSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className= "search"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for images..."
            />
            <button className="btn-del" type="submit">Search</button>
        </form>
    );
};

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loadTime, setLoadTime] = useState(null);
    const [imageLoadTimes, setImageLoadTimes] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const startTime = performance.now();
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=Xv20KUqp3dddQVHXT6zk4rDn3BFfhh4w6X4M0FjOHj8`);
            const data = await response.json();
            setImages(data.results);
            const endTime = performance.now();
            const timeTaken = endTime - startTime;
            setLoadTime(timeTaken);
        };

        if (searchQuery) {
            fetchImages();
        }
    }, [searchQuery]);

    const handleSearch = query => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const imageLoadStartTimes = {};
        images.forEach(image => {
            const img = new Image();
            img.onload = () => {
                const endTime = performance.now();
                const timeTaken = endTime - imageLoadStartTimes[image.id];
                setImageLoadTimes(prevState => ({
                    ...prevState,
                    [image.id]: timeTaken
                }));
            };
            imageLoadStartTimes[image.id] = performance.now();
            img.src = image.urls.small;
        });
    }, [images]);

    return (
        <div className="image-gallery-container">
            <SearchForm handleSearch={handleSearch} />
            {loadTime && <div className="load-time">Load Time: {loadTime.toFixed(2)} milliseconds</div>}
            <div className="image-gallery">
                {images.map(image => (
                    <div key={image.id} className="image-item">
                        <img src={image.urls.small} alt={image.alt_description} />
                        {imageLoadTimes[image.id] && (
                            <div className="image-load-time">Image Load Time: {imageLoadTimes[image.id].toFixed(2)} milliseconds</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
