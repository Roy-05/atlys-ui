'use client';

import { XStack } from '@/design-system/layout';
import { FunctionCard } from './widgets/functionCard';
import { Input } from '@/design-system/input';
import { useFunctionCards } from '@/app/hooks/useFunctionCards';
import { SvgChainPath } from './widgets/svg/SvgChainPath';
import { Chip } from '@/design-system/chip';
import { SvgChainNode } from './widgets/svg/SvgChainNode';
import { useEffect, useRef } from 'react';
import { getElementPosition } from '@/app/utils/utils';

export default function Home() {
    const { state, dispatch, setFnNodeCoords, setTertiaryNodeCoords, addNode } = useFunctionCards();
    const { outputValue } = state;

    const inputNodeRef = useRef<SVGSVGElement>(null);
    const outputNodeRef = useRef<SVGSVGElement>(null);

    const _updateInitialValue = (evt: React.FocusEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_INITIAL_VALUE',
            payload: { value: evt.target.value }
        });
    };

    const _setTertiaryNodeCoords = () => {
        const inputNode = inputNodeRef.current;
        const outputNode = outputNodeRef.current;

        if (inputNode && outputNode) {
            const outNode = getElementPosition({ node: inputNode });
            const inNode = getElementPosition({ node: outputNode });

            setTertiaryNodeCoords([
                {
                    inNode: null,
                    outNode
                },
                {
                    inNode,
                    outNode: null
                }
            ]);
        }
    };

    useEffect(() => {
        _setTertiaryNodeCoords();
    }, []);

    return (
        <XStack className='py-24 px-16 justify-center'>
            <XStack className='self-center'>
                <Input
                    variant={'lg'}
                    color={'yellow'}
                    type={'number'}
                    className='w-24'
                    label={<Chip className='bg-decorative-yellow-200'>Initial value of x</Chip>}
                    TrailingComponent={<SvgChainNode nodeRef={inputNodeRef} />}
                    onBlur={_updateInitialValue}
                />
            </XStack>
            <XStack className='flex-wrap justify-center gap-20'>
                {state.data.map((item, index: number) => (
                    <FunctionCard
                        item={item}
                        key={index}
                        index={index}
                        setFnNodeCoords={setFnNodeCoords}
                        dispatch={dispatch}
                    />
                ))}
                <svg className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                    {state?.chainPaths?.map((path: string, index: number) => (
                        <SvgChainPath key={index} d={path} />
                    ))}
                </svg>
            </XStack>
            <XStack className='self-center'>
                <Input
                    readOnly
                    variant={'lg'}
                    color={'green'}
                    className='w-24'
                    LeadingComponent={<SvgChainNode nodeRef={outputNodeRef} />}
                    label={<Chip className='bg-decorative-green-200'>Final Output y</Chip>}
                    value={outputValue}
                />
            </XStack>
        </XStack>
    );
}
