import { Card } from '@/design-system/card';
import { Input } from '@/design-system/input';
import { XStack, YStack } from '@/design-system/layout';
import { B4, H5 } from '@/design-system/typography';
import { VALID_EQ_REG_EXP } from '@/utils/constants';

export const FunctionCard = ({ index, set }) => {
    const validateInput = (evt) => {
        if (!evt.target.value.includes('x')) {
            console.log('expression does not contain x');
            return;
        }

        let regex = new RegExp(VALID_EQ_REG_EXP);

        if (evt.target.value.match(regex)) {
            set((prev) => {
                let a = [...prev];
                a[index] = evt.target.value;
                return a;
            });
            let str = evt.target.value.replaceAll('x', 10);
        } else {
            console.log('Not a valid expression');
        }
    };

    return (
        <Card className='min-w-60 '>
            <YStack className='gap-y-5 grow'>
                <H5>Function {index + 1}:</H5>
                <Input onBlur={validateInput} label={'Equation:'} />
                <Input label={'Next function'} />
                <XStack className='justify-between mt-6'>
                    <B4>input</B4>
                    <B4>output</B4>
                </XStack>
            </YStack>
        </Card>
    );
};
