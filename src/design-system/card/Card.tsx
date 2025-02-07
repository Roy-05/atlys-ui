import React from 'react';

export const Card = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
    return (
        <div className={`py-4 px-5 bg-neutral-0 border border-neutral-200 rounded-2xl flex w-fit shadow ${className}`}>
            {children}
        </div>
    );
};
