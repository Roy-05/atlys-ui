import { Card } from '@/design-system/card';
import { Input } from '@/design-system/input';
import { XStack, YStack } from '@/design-system/layout';
import { B4, H5 } from '@/design-system/typography';
import { Dispatch, Ref, SetStateAction, useEffect, useRef } from 'react';
import { SvgChainNode } from '../svg/SvgChainNode';
import { validateFunctionInput } from './utils';
import { FUNC_CARD_ACTION_TYPES } from '@/app/actions/FunctionCardsActionTypes';

export const FunctionCard = ({ index, setFnNodeCoords, dispatch }) => {
    const inputNodeRef = useRef<SVGSVGElement>(null);
    const outputNodeRef = useRef<SVGSVGElement>(null);

    const validate = ({ value, onError }: { value: string; onError: Dispatch<SetStateAction<string>> }) => {
        const isValid = validateFunctionInput({ value, onError });

        if (isValid) {
            dispatch({
                type: FUNC_CARD_ACTION_TYPES.UPDATE_CARD_EQ,
                payload: {
                    index,
                    value
                }
            });
        }
    };

    const connectElements = () => {
        const inputNode = inputNodeRef.current;
        const outputNode = outputNodeRef.current;

        if (inputNode && outputNode) {
            const rect1 = inputNode.getBoundingClientRect();
            const rect2 = outputNode.getBoundingClientRect();

            const x1 = rect1.left + rect1.width / 2;
            const y1 = rect1.top + rect1.height / 2;
            const x2 = rect2.left + rect2.width / 2;
            const y2 = rect2.top + rect2.height / 2;

            setFnNodeCoords({
                index,
                value: {
                    inNode: [x1, y1],
                    outNode: [x2, y2]
                }
            });
        }
    };

    useEffect(() => {
        connectElements();
    }, []);

    return (
        <Card className='min-w-60 '>
            <YStack className='gap-y-3 grow'>
                <H5>Function {index + 1}:</H5>
                <Input validate={validate} label={'Equation:'} />
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
