'use client';

import { XStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';

export default function Home() {
    return (
        <XStack className='p-24 justify-center'>
            <XStack className='flex-wrap justify-around gap-y-20 gap-x-20 max-w-[80%]'>
                {[...new Array(5)].map((item, index) => (
                    <FunctionCard key={index} index={index} />
                ))}
            </XStack>
        </XStack>
    );
}
