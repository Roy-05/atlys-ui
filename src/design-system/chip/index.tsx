import { JSX } from 'react';
import { SH2 } from '../typography';

export const Chip = ({ children, className = '', ...props }: JSX.IntrinsicElements['div']) => {
    return (
        <div className={`px-3 py-1 rounded-2xl w-fit flex text-neutral-0 ${className}`} {...props}>
            <SH2>{children}</SH2>
        </div>
    );
};
