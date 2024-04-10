import React, { useEffect } from 'react';

const PerformanceAnalysis = () => {
    useEffect(() => {
        const { timing } = window.performance;
        console.log('Page Load Time:', timing.loadEventEnd - timing.navigationStart, 'ms');
        console.log('Resource Load Time:', timing.responseEnd - timing.requestStart, 'ms');
    }, []);

    return (
        <div className="performance-analysis">
            <p>Check the console for performance data.</p>
        </div>
    );
};

export default PerformanceAnalysis;
