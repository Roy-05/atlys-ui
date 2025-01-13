import { FunctionList } from '@/app/modules/LinkedList';
import { reducer } from '@/app/reducers/functionCardsReducer';
import { ChainNode } from '@/app/types/functionCardTypes';
import { useReducer, useRef } from 'react';

const INITIAL_ORDER = [0, 1, 3, 4, 2];

const init = () => {
    FunctionList.init(INITIAL_ORDER);

    const data = [...FunctionList.getNextIndices()].map((index) => ({ eq: '', next: index }));

    return {
        initialValue: 0,
        outputValue: 0,
        chainPaths: [],
        data
    };
};

export const useFunctionCards = () => {
    const [state, dispatch] = useReducer(
        reducer,
        {
            initialValue: 0,
            outputValue: 0,
            linePaths: [],
            data: []
        },
        init
    );

    const fnNodeCoords = useRef<Array<ChainNode | undefined>>([]);
    const tertiaryNodeCoords = useRef<Array<ChainNode | undefined>>([]);

    const addNode = () => {
        dispatch({
            type: 'ADD_FUNCTION_CARD'
        });
    };

    const setTertiaryNodeCoords = (value: Array<ChainNode>) => {
        tertiaryNodeCoords.current = value;

        if (fnNodeCoords.current?.indexOf(undefined) === -1 && tertiaryNodeCoords.current?.length === 2) {
            dispatch({
                type: 'ADD_CHAIN_PATHS',
                payload: {
                    nodes: [tertiaryNodeCoords.current?.[0], ...fnNodeCoords?.current, tertiaryNodeCoords.current?.[1]]
                }
            });
        }
    };

    const setFnNodeCoords = ({ index, value }: { index: number; value: ChainNode }) => {
        if (typeof index === 'number') {
            fnNodeCoords.current[index] = value;
        }

        if (fnNodeCoords.current.indexOf(undefined) === -1 && tertiaryNodeCoords.current.length === 2) {
            dispatch({
                type: 'ADD_CHAIN_PATHS',
                payload: {
                    nodes: [tertiaryNodeCoords.current?.[0], ...fnNodeCoords?.current, tertiaryNodeCoords.current?.[1]]
                }
            });
        }
    };

    return {
        state,
        dispatch,
        setFnNodeCoords,
        setTertiaryNodeCoords,
        addNode
    };
};
