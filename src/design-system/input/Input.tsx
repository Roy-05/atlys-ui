import { JSX } from 'react';
import { YStack } from '../layout';
import { SH3 } from '../typography';

type Input = {
    /**
     * Label for the input component, can be a string or a JSX Component
     */
    label?: string | React.ReactNode;
};

export const Input = ({ label, children, ...props }: Input & JSX.IntrinsicElements['input']) => {
    return (
        <YStack className='gap-y-1'>
            {Boolean(label) && (typeof label === 'string' ? <SH3>{label}</SH3> : label)}
            <input
                className='border border-neutral-400 px-3 py-2 rounded-lg focus:outline-none focus:border focus:border-neutral-500 text-xs leading-3 font-medium text-neutral-700'
                {...props}
            />
        </YStack>
    );
};
