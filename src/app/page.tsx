'use client';

import { Card } from '@/design-system/card';
import { Input } from '@/design-system/input';
import { YStack } from '@/design-system/layout';
import { H4 } from '@/design-system/typography';
import { VALID_EQ_REG_EXP } from '@/utils/constants';

export default function Home() {
    const validateInput = (evt) => {
        if (!evt.target.value.includes('x')) {
            console.log('expression does not contain x');
            return;
        }

        let regex = new RegExp(VALID_EQ_REG_EXP);

        if (evt.target.value.match(regex)) {
            let str = evt.target.value.replaceAll('x', 10);
            console.log(str);
            console.log(eval(str));
        } else {
            console.log('Not a valid expression');
        }
    };

    return (
        <Card>
            <YStack className='gap-y-2'>
                <H4>Function 1:</H4>
                <Input onBlur={validateInput} />
            </YStack>
        </Card>
    );
}
