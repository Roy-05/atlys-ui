import { Dispatch, JSX, SetStateAction, useState } from 'react';
import { XStack, YStack } from '../layout';
import { B4, SH3 } from '../typography';

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
     * Optional function to validate input on blur
     * @returns boolean value indicating if data is valid
     */
    validate?: ({ value, onError }: { value: string; onError?: Dispatch<SetStateAction<string>> }) => boolean;
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
    validate = () => true,
    children,
    onBlur,
    ...props
}: Input & JSX.IntrinsicElements['input']) => {
    const [error, onError] = useState('');

    const _onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (typeof validate === 'function') {
            validate({
                value: e.target.value,
                onError
            });
        }

        if (typeof onBlur === 'function') {
            onBlur(e);
        }
    };

    return (
        <YStack className='gap-y-1 self-stretch'>
            {Boolean(label) && (typeof label === 'string' ? <SH3>{label}</SH3> : label)}
            <XStack className='items-center'>
                {Boolean(LeadingComponent) && (
                    <XStack
                        className={`rounded-r-none rounded-lg  h-full flex items-center ${
                            variant === 'lg' ? 'rounded-xl px-4 border-2' : 'px-3 rounded-lg border'
                        } ${
                            Boolean(error)
                                ? 'border-error-100'
                                : color === 'green'
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
                        Boolean(error)
                            ? 'border-error-100'
                            : color === 'green'
                            ? 'border-green-400'
                            : color === 'yellow'
                            ? 'border-yellow-400'
                            : 'border-neutral-400'
                    } ${className}`}
                    {...props}
                    onBlur={_onBlur}
                />
                {Boolean(TrailingComponent) && (
                    <XStack
                        className={`rounded-l-none border-neutral-400 h-full flex items-center ${
                            variant === 'lg' ? 'rounded-xl px-4 border-2' : 'px-3 rounded-lg border'
                        }  ${
                            Boolean(error)
                                ? 'border-error-100'
                                : color === 'green'
                                ? 'border-green-400'
                                : color === 'yellow'
                                ? 'border-yellow-400'
                                : 'border-neutral-400'
                        }`}>
                        {TrailingComponent}
                    </XStack>
                )}
            </XStack>
            <XStack className='min-h-3 text-error-100'>
                <B4>{error}</B4>
            </XStack>
        </YStack>
    );
};
