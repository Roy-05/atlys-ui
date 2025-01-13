import { FUNC_CARD_ACTION_TYPES } from '@/app/actions/FunctionCardsActionTypes';
import { FunctionList } from '@/app/modules/LinkedList';
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

    // adding a two indexes for entry and exit nodes
    traversalOrder = [0, ...traversalOrder.map((i) => i + 1), traversalOrder.length + 1];

    for (let i = 0; i < nodes.length - 1; i++) {
        const currentIndex = traversalOrder[i];
        const nextIndex = traversalOrder[i + 1];

        const start = nodes[currentIndex].outNode;
        const end = nodes[nextIndex].inNode;

        const startX = start[0];
        const startY = start[1];
        const endX = end[0];
        const endY = end[1];

        // Calculate the midpoint
        const midpointX = (startX + endX) / 2;
        const midpointY = (startY + endY) / 2;

        // Calculate the angle of the line (in radians)
        const angle = Math.atan2(endY - startY, endX - startX);

        // Calculate the offset perpendicular to the line at the midpoint (this will control the curve direction)
        const offsetX = 120 * Math.cos(angle + Math.PI / 2);
        const offsetY = 80 * Math.sin(angle + Math.PI / 2);

        // Adjust the midpoint for the curve height (this makes the curve bend upwards or downwards)
        const controlX = midpointX + offsetX;
        const controlY = midpointY + offsetY;

        // Construct the path using a quadratic Bézier curve
        chainPaths.push(`M${startX} ${startY} Q${controlX} ${controlY} ${endX} ${endY}`);
    }

    console.log(chainPaths);

    return chainPaths;
};

const compute = ({ traversalOrder, data, initialValue }) => {
    let output = initialValue;

    traversalOrder.forEach((index) => {
        let equation = data[index]['eq'];
        let replaced = equation?.replaceAll('x', output);
        console.log('Computing index ', index, ' with Equation ', replaced);

        output = eval(replaced);
        console.log('New output: ', output);
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

    const updateCardEquation = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_CARD_EQ, payload });

    const updateInitialValue = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_INITIAL_VALUE, payload });

    return {
        state,
        updateCardEquation,
        updateInitialValue,
        dispatch,
        setFnNodeCoords,
        setTertiaryNodeCoords
    };
};
