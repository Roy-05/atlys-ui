'use client';

import { XStack, YStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';
import { Input } from '@/design-system/input';
import { SH2 } from '@/design-system/typography';
import { useState } from 'react';
import { FunctionList } from './modules/LinkedList';
import { useFunction } from '@/hooks/use/useFunction';

export default function Home() {
    const { state, updateCardEquation, updateInitialValue } = useFunction();
    const { outputValue } = state;

    const _updateInitialValue = (evt) => {
        updateInitialValue({ payload: { value: evt.target.value } });
    };

    return (
        <XStack className='py-24 justify-center'>
            <Input
                type={'number'}
                label={
                    <div>
                        <SH2>Initial value of x</SH2>
                    </div>
                }
                onBlur={_updateInitialValue}
            />
            <XStack className='flex-wrap justify-around gap-y-20 gap-x-20'>
                {state.data.map((item, index) => (
                    <FunctionCard key={index} index={index} updateCardEquation={updateCardEquation} />
                ))}
            </XStack>
            <YStack>
                <Input
                    disabled
                    label={
                        <div>
                            <SH2>Final Output y</SH2>
                        </div>
                    }
                    value={outputValue}></Input>
            </YStack>
        </XStack>
    );
}
