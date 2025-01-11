import { JSX } from 'react';

export const Input = ({ children, ...props }: JSX.IntrinsicElements['input']) => {
    return (
        <input
            className='border border-neutral-400 px-3 py-2 rounded-lg focus:outline-none focus:border focus:border-neutral-500 text-xs leading-3 font-medium text-neutral-700'
            {...props}
        />
    );
};
