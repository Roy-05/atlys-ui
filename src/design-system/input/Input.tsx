import { JSX } from 'react';
import { YStack } from '../layout';
import { SH2 } from '../typography';

type Input = {
    /**
     * Label text for the input component
     */
    label: string;
};

export const Input = ({ label, children, ...props }: Input & JSX.IntrinsicElements['input']) => {
    return (
        <YStack className='gap-y-1'>
            {label && <SH2>{label}</SH2>}
            <input
                className='border border-neutral-400 px-3 py-2 rounded-lg focus:outline-none focus:border focus:border-neutral-500 text-xs leading-3 font-medium text-neutral-700'
                {...props}
            />
        </YStack>
    );
};
