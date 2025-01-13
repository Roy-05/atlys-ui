import { Card } from '@/design-system/card';
import { Input } from '@/design-system/input';
import { XStack, YStack } from '@/design-system/layout';
import { H5 } from '@/design-system/typography';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { validateFunctionInput } from './utils';
import { getElementPosition } from '@/app/utils/utils';
import { ChainingNode } from './ChainingNode';
import { IFunctionCard } from '@/app/types/functionCardTypes';

export const FunctionCard = ({ item, index, setFnNodeCoords, dispatch }: IFunctionCard) => {
    const inputNodeRef = useRef<SVGSVGElement>(null);
    const outputNodeRef = useRef<SVGSVGElement>(null);

    const validate = ({ value, onError }: { value: string; onError: Dispatch<SetStateAction<string>> }) => {
        const isValid = validateFunctionInput({ value, onError });

        if (isValid) {
            dispatch({
                type: 'UPDATE_CARD_EQ',
                payload: {
                    index,
                    value
                }
            });
        }
    };

    const _setFnNodeCoords = () => {
        const inputNode = inputNodeRef.current;
        const outputNode = outputNodeRef.current;

        if (inputNode && outputNode) {
            setFnNodeCoords({
                index,
                value: {
                    inNode: getElementPosition({ node: inputNode }),
                    outNode: getElementPosition({ node: outputNode })
                }
            });
        }
    };

    useEffect(() => {
        _setFnNodeCoords();
    }, []);

    return (
        <Card className='min-w-60 '>
            <YStack className='gap-y-3 grow'>
                <H5>Function {index + 1}:</H5>
                <Input validate={validate} label={'Equation:'} />
                <Input
                    label={'Next function'}
                    value={Boolean(Number(item?.next) + 1) ? `Function: ${Number(item?.next) || 0 + 1}` : '-'}
                    disabled
                />
                <XStack className='justify-between mt-6'>
                    <ChainingNode nodeRef={inputNodeRef} text='input' />
                    <ChainingNode nodeRef={outputNodeRef} text='output' className={'flex-row-reverse'} />
                </XStack>
            </YStack>
        </Card>
    );
};
