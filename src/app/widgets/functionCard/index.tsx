import { Card } from '@/design-system/card';
import { Input } from '@/design-system/input';
import { XStack, YStack } from '@/design-system/layout';
import { B4, H5 } from '@/design-system/typography';
import { colors } from '@/utils/colors';
import { VALID_EQ_REG_EXP } from '@/utils/constants';
import { Ref, useEffect, useRef } from 'react';
import { SvgChainNode } from '../svg/SvgChainNode';

export const FunctionCard = ({ index, updateCardEquation, dispatch }) => {
    const validateInput = (evt) => {
        if (!evt.target.value.includes('x')) {
            console.log('expression does not contain x');
            return;
        }

        let regex = new RegExp(VALID_EQ_REG_EXP);

        if (evt.target.value.match(regex)) {
            updateCardEquation({
                payload: {
                    index,
                    value: evt.target.value
                }
            });
        } else {
            console.log('Not a valid expression');
        }
    };

    const inputNodeRef = useRef(null);
    const outputNodeRef = useRef(null);

    const connectElements = () => {
        const inputNode = inputNodeRef.current;
        const outputNode = outputNodeRef.current;

        if (inputNode && outputNode) {
            const rect1 = inputNode?.getBoundingClientRect();
            const rect2 = outputNode?.getBoundingClientRect();

            // Calculate the center points of each div
            const x1 = rect1.left + rect1.width / 2;
            const y1 = rect1.top + rect1.height / 2;
            const x2 = rect2.left + rect2.width / 2;
            const y2 = rect2.top + rect2.height / 2;

            dispatch({
                type: 'ADD_CARD_POS',
                payload: {
                    index,
                    value: {
                        in: [x1, y1],
                        out: [x2, y2]
                    }
                }
            });
        }
    };

    useEffect(() => {
        connectElements();
    }, []);

    return (
        <Card className='min-w-60 '>
            <YStack className='gap-y-5 grow'>
                <H5>Function {index + 1}:</H5>
                <Input onBlur={validateInput} label={'Equation:'} />
                <Input label={'Next function'} />
                <XStack className='justify-between mt-6'>
                    <ChainingNode nodeRef={inputNodeRef} text='input' />
                    <ChainingNode nodeRef={outputNodeRef} text='output' className={'flex-row-reverse'} />
                </XStack>
            </YStack>
        </Card>
    );
};

const ChainingNode = ({
    nodeRef = null,
    text = '',
    className = ''
}: {
    nodeRef: Ref<SVGSVGElement>;
    text: string;
    className?: string;
}) => {
    return (
        <XStack className={`gap-x-1 items-center ${className}`}>
            <SvgChainNode nodeRef={nodeRef} />
            <B4>{text}</B4>
        </XStack>
    );
};
