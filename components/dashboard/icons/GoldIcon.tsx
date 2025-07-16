
import React from 'react';

const GoldIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6v5.5c0 5.25 3.4 9.85 8 10.95c4.6-1.1 8-5.7 8-10.95V6L12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3z" opacity="0.6"/>
        <path d="M12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3s3 1.34 3 3s-1.34 3-3 3z" fill="url(#goldGradient)"/>
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#FFA500', stopOpacity:1}} />
            </linearGradient>
        </defs>
    </svg>
);

export default GoldIcon;
