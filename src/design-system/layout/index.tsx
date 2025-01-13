import { JSX } from 'react';

export const XStack = ({ children, className = '', ...props }: JSX.IntrinsicElements['div']): React.ReactNode => (
    <div className={`flex flex-row ${className}`} {...props}>
        {children}
    </div>
);

export const YStack = ({ children, className = '', ...props }: JSX.IntrinsicElements['div']): React.ReactNode => (
    <div className={`flex flex-col ${className}`} {...props}>
        {children}
    </div>
);
