import React from 'react';
import ImageGallery from './ImageGallery';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <h1 className="title">My Gallery</h1>
            <ImageGallery />
            <PerformanceAnalysis />
        </div>
    );
};

export default App;
