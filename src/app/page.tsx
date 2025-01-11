'use client';

import { XStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';
import { Input } from '@/design-system/input';
import { SH2 } from '@/design-system/typography';

export default function Home() {
    return (
        <XStack className='p-24 justify-center'>
            <Input
                type={'number'}
                label={
                    <div>
                        <SH2>Initial value of x</SH2>
                    </div>
                }
            />
            <XStack className='flex-wrap justify-around gap-y-20 gap-x-20 max-w-[80%]'>
                {[...new Array(5)].map((item, index) => (
                    <FunctionCard key={index} index={index} />
                ))}
            </XStack>
            <Input
                label={
                    <div>
                        <SH2>Final Output y</SH2>
                    </div>
                }
            />
        </XStack>
    );
}
