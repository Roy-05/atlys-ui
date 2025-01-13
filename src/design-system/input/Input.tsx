import { JSX } from 'react';
import { XStack, YStack } from '../layout';
import { SH3 } from '../typography';

type Variant = 'base' | 'lg';
type Color = 'neutral' | 'green' | 'yellow';

type Input = {
    color?: Color;
    variant?: Variant;
    /**
     * Label for the input component, can be a string or a JSX Component
     */
    label?: string | React.ReactNode;
    /**
     * Optional Leading Component on the input field
     */
    LeadingComponent?: React.ReactNode;
    /**
     * Optional Trailing Component on the input field
     */
    TrailingComponent?: React.ReactNode;
};

export const Input = ({
    label,
    variant = 'base',
    color = 'neutral',
    className = '',
    LeadingComponent = null,
    TrailingComponent = null,
    children,
    ...props
}: Input & JSX.IntrinsicElements['input']) => {
    return (
        <YStack className='gap-y-1 self-stretch'>
            {Boolean(label) && (typeof label === 'string' ? <SH3>{label}</SH3> : label)}
            <XStack className='items-center'>
                {Boolean(LeadingComponent) && (
                    <XStack
                        className={`rounded-r-none rounded-lg  h-full flex items-center ${
                            variant === 'lg' ? 'rounded-xl px-4 border-2' : 'px-3 rounded-lg border'
                        } ${
                            color === 'green'
                                ? 'border-green-400'
                                : color === 'yellow'
                                ? 'border-yellow-400'
                                : 'border-neutral-400'
                        }`}>
                        {LeadingComponent}
                    </XStack>
                )}

                <input
                    className={`grow focus:outline-none text-neutral-700 h-full ${
                        variant === 'lg'
                            ? 'text-lg leading-5 font-bold py-3 px-4 rounded-xl border-2'
                            : 'text-xs leading-3 font-medium px-3 py-2  rounded-lg border'
                    } ${Boolean(TrailingComponent) ? 'border-r-0 rounded-r-none' : ''} ${
                        Boolean(LeadingComponent) ? 'border-l-0 rounded-l-none' : ''
                    } ${
                        color === 'green'
                            ? 'border-green-400'
                            : color === 'yellow'
                            ? 'border-yellow-400'
                            : 'border-neutral-400'
                    } ${className}`}
                    {...props}
                />
                {Boolean(TrailingComponent) && (
                    <XStack
                        className={`rounded-l-none border-neutral-400 h-full flex items-center ${
                            variant === 'lg' ? 'rounded-xl px-4 border-2' : 'px-3 rounded-lg border'
                        }  ${
                            color === 'green'
                                ? 'border-green-400'
                                : color === 'yellow'
                                ? 'border-yellow-400'
                                : 'border-neutral-400'
                        }`}>
                        {TrailingComponent}
                    </XStack>
                )}
            </XStack>
        </YStack>
    );
};
