'use client';

import { XStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';
import { Input } from '@/design-system/input';
import { SH2 } from '@/design-system/typography';
import { useState } from 'react';
import { FunctionList } from './modules/LinkedList';

let validInputs = 0;
let output = 0;

FunctionList.append(1);
FunctionList.append(2);
FunctionList.append(4);
FunctionList.append(5);
FunctionList.append(3);

export default function Home() {
    const [state, setState] = useState([]);
    const [initialValue, setInitialValue] = useState();

    let order = FunctionList.display();

    const getInitialValue = (evt) => {
        setInitialValue(evt.target.value);
    };

    const compute = () => {
        console.log('Order of iteration:', order);
        order.forEach((value, index) => {
            let equation = state[value - 1];

            let replaced = equation?.replaceAll('x', index === 0 ? initialValue : output);
            console.log('Computing index ', value - 1, ' with Equation ', replaced);

            output = eval(replaced);
            console.log('New output: ', output);
        });
    };

    return (
        <XStack className='p-24 justify-center'>
            <Input
                type={'number'}
                label={
                    <div>
                        <SH2>Initial value of x</SH2>
                    </div>
                }
                onBlur={getInitialValue}
            />
            <XStack className='flex-wrap justify-around gap-y-20 gap-x-20 max-w-[80%]'>
                {[...new Array(5)].map((item, index) => (
                    <FunctionCard key={index} index={index} set={setState} />
                ))}
            </XStack>
            <Input
                disabled
                label={
                    <div>
                        <SH2>Final Output y</SH2>
                    </div>
                }
            />
            <button onClick={compute}>Submit</button>
        </XStack>
    );
}
