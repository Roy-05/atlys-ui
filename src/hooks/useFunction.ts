import { FUNC_CARD_ACTION_TYPES } from '@/app/actions/FunctionCardsActionTypes';
import { FunctionList } from '@/app/modules/LinkedList';
import { generateCurvedPath } from '@/utils/utils';
import { ActionDispatch, useReducer, useRef } from 'react';

export const ACTION_TYPES = Object.freeze({
    UPDATE_INITIAL_VALUE: 'UPDATE_INITIAL_VALUE',
    UPDATE_CARD_EQ: 'UPDATE_CARD_EQ',
    ADD_CARD_POS: 'ADD_CARD_POS'
});

const INITIAL_ORDER = [0, 1, 3, 4, 2];

const reducer = (state, action) => {
    const { type, payload } = action;
    const traversalOrder = FunctionList.getTraversalOrder();

    switch (type) {
        case ACTION_TYPES.UPDATE_INITIAL_VALUE: {
            const { value: initialValue } = payload;

            let outputValue = state.outputValue;

            const canCompute = state.data.map((item) => item.eq).indexOf('') === -1;

            if (canCompute) {
                outputValue = compute({ traversalOrder, data: state.data, initialValue });
            }

            return {
                ...state,
                initialValue,
                outputValue
            };
        }
        case ACTION_TYPES.UPDATE_CARD_EQ: {
            const { index, value } = payload;

            const newData = [...state?.data];
            newData[index]['eq'] = value;

            let outputValue = state.outputValue;

            const canCompute = newData.map((item) => item.eq).indexOf('') === -1;
            if (canCompute) {
                outputValue = compute({ traversalOrder, data: newData, initialValue: state.initialValue });
            }

            return {
                ...state,
                outputValue,
                data: newData
            };
        }
        case ACTION_TYPES.ADD_CARD_POS: {
            const { nodes } = payload;

            let chainPaths = generateCurvedPaths({
                traversalOrder,
                nodes
            });

            return {
                ...state,
                chainPaths
            };
        }
        default:
            return state;
    }
};

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

const generateCurvedPaths = ({ traversalOrder, nodes }) => {
    let chainPaths = [];

    // adding two indexes for entry and exit nodes
    traversalOrder = [0, ...traversalOrder.map((i: number) => i + 1), traversalOrder.length + 1];

    for (let i = 0; i < nodes.length - 1; i++) {
        const currentIndex = traversalOrder[i];
        const nextIndex = traversalOrder[i + 1];

        const start = nodes[currentIndex].outNode;
        const end = nodes[nextIndex].inNode;

        const path = generateCurvedPath(start, end);

        chainPaths.push(path);
    }

    return chainPaths;
};

const compute = ({ traversalOrder, data, initialValue }) => {
    let output = initialValue;

    traversalOrder.forEach((index) => {
        let equation = data[index]['eq'];

        equation = equation
            .replaceAll(/(\d+)(x)/g, '$1*$2')
            .replaceAll('^', '**')
            .replaceAll(/\s+/g, '')
            .replaceAll('x', output);

        // TODO: Use a postfix tokenization logic instead of using `eval()` here
        output = eval(equation);
    });

    return output;
};

export const useFunction = () => {
    const [state, dispatch] = useReducer(
        reducer,
        {
            initialValue: 0,
            outputValue: 0,
            linePaths: [...new Array(5)],
            data: [...new Array(5)]
        },
        init
    );

    const fnNodeCoords = useRef([]);
    const tertiaryNodeCoords = useRef([]);

    const setTertiaryNodeCoords = (value) => {
        tertiaryNodeCoords.current = value;

        if (fnNodeCoords.current.indexOf(undefined) === -1 && tertiaryNodeCoords.current.length === 2) {
            dispatch({
                type: ACTION_TYPES.ADD_CARD_POS,
                payload: {
                    nodes: [tertiaryNodeCoords.current?.[0], ...fnNodeCoords?.current, tertiaryNodeCoords.current?.[1]]
                }
            });
        }
    };

    const setFnNodeCoords = ({ index, value }) => {
        if (typeof index === 'number') {
            fnNodeCoords.current[index] = value;
        }

        if (fnNodeCoords.current.indexOf(undefined) === -1 && tertiaryNodeCoords.current.length === 2) {
            dispatch({
                type: FUNC_CARD_ACTION_TYPES.ADD_CHAIN_PATHS,
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
        setTertiaryNodeCoords
    };
};
