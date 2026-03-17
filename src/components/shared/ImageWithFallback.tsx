'use client';

import { useState } from 'react';

interface ImageWithFallbackProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackType?: 'avatar' | 'placeholder';
    showBorder?: boolean;
}

/**
 * Image component with built-in fallback to placeholder
 * Handles 404 errors gracefully
 */
export function ImageWithFallback({
    src,
    alt,
    fallbackType = 'placeholder',
    showBorder = false,
    className = '',
    ...props
}: ImageWithFallbackProps) {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    // Fallback SVG placeholders
    const avatarPlaceholder = (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <circle cx="20" cy="20" r="20" fill="#E8E8E8" />
            <circle cx="20" cy="13" r="5" fill="#999" />
            <path
                d="M 10 28 Q 20 22 30 28"
                stroke="#999"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );

    const genericPlaceholder = (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <rect width="200" height="200" fill="#F0F0F0" />
            <circle cx="100" cy="70" r="25" fill="#D0D0D0" />
            <path
                d="M 50 150 Q 100 120 150 150"
                stroke="#D0D0D0"
                strokeWidth="3"
                fill="none"
            />
            <text
                x="100"
                y="190"
                textAnchor="middle"
                fill="#999"
                fontSize="16"
                fontFamily="sans-serif"
            >
                No image
            </text>
        </svg>
    );

    if (hasError) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 ${showBorder ? 'border border-gray-300' : ''
                    } ${className}`}
                title={alt || 'Image failed to load'}
            >
                {fallbackType === 'avatar' ? avatarPlaceholder : genericPlaceholder}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={handleError}
            className={showBorder ? `border border-gray-300 ${className}` : className}
            {...props}
        />
    );
}
