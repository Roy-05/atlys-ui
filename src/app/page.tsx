'use client';

import { XStack, YStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';
import { Input } from '@/design-system/input';
import { SH2 } from '@/design-system/typography';
import { useFunction } from '@/hooks/use/useFunction';
import { SvgChainPath } from './widgets/svg/SvgChainPath';
import { Chip } from '@/design-system/chip';

export default function Home() {
    const { state, updateCardEquation, updateInitialValue, addCardPos, dispatch } = useFunction();
    const { outputValue } = state;

    const _updateInitialValue = (evt) => {
        updateInitialValue({ payload: { value: evt.target.value } });
    };

    return (
        <XStack className='py-24 justify-center'>
            <Input
                type={'number'}
                label={<Chip className='bg-decorative-yellow-200'>Initial value x</Chip>}
                onBlur={_updateInitialValue}
            />
            <XStack className='flex-wrap justify-around gap-y-20 gap-x-20'>
                {state.data.map((item, index) => (
                    <FunctionCard
                        key={index}
                        index={index}
                        updateCardEquation={updateCardEquation}
                        dispatch={dispatch}
                    />
                ))}

                <svg className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                    {state?.linePaths?.map((path, index) => (
                        <SvgChainPath key={index} d={path} />
                    ))}
                </svg>
            </XStack>
            <YStack>
                <Input
                    disabled
                    label={<Chip className='bg-decorative-green-200'>Final Output y</Chip>}
                    value={outputValue}></Input>
            </YStack>
        </XStack>
    );
}
