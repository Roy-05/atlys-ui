import { FunctionList } from '@/app/modules/LinkedList';
import { ActionDispatch, useReducer, useRef } from 'react';

export const ACTION_TYPES = Object.freeze({
    UPDATE_INITIAL_VALUE: 'UPDATE_INITIAL_VALUE',
    UPDATE_CARD_EQ: 'UPDATE_CARD_EQ',
    ADD_CARD_POS: 'ADD_CARD_POS'
});

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION_TYPES.UPDATE_INITIAL_VALUE: {
            const { value: initialValue } = payload;

            let traverseOrder = FunctionList.getTraversalOrder();

            let outputValue = state.outputValue;

            if (state.data.indexOf(undefined) === -1) {
                outputValue = compute({ traverseOrder, data: state.data, initialValue });
            }

            return {
                ...state,
                initialValue,
                outputValue
            };
        }
        case ACTION_TYPES.UPDATE_CARD_EQ: {
            const { index, value } = payload;
            // console.log(index, value);
            const newData = [...state?.data];
            newData[index] = value;

            const traverseOrder = FunctionList.getTraversalOrder();

            let outputValue = state.outputValue;

            if (newData.indexOf(undefined) === -1) {
                outputValue = compute({ traverseOrder, data: newData, initialValue: state.initialValue });
            }

            console.log(outputValue);

            return {
                ...state,
                outputValue,
                data: newData
            };
        }
        case ACTION_TYPES.ADD_CARD_POS: {
            const { fnNodeCoords, tertiaryNodeCoords } = payload;

            // let cardPos = [...state.cardPos];
            // cardPos[index] = value;

            const traversalOrder = FunctionList.getTraversalOrder();
            let linePaths = generateCurvedPaths({
                traversalOrder,
                nodes: [tertiaryNodeCoords[0], ...fnNodeCoords, tertiaryNodeCoords[1]]
            });

            return {
                ...state,
                linePaths
            };
        }
        default:
            return state;
    }
};

const init = () => {
    FunctionList.init([0, 1, 3, 4, 2]);

    return {
        initialValue: 0,
        outputValue: 0,
        cardPos: [...new Array(5)],
        linePaths: [],
        data: [...new Array(5)]
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

const compute = ({ traverseOrder, data, initialValue }) => {
    let output = initialValue;

    console.log(traverseOrder, data, initialValue);
    traverseOrder.forEach((index) => {
        let equation = data[index];
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
        console.log(value);
        let _fnNodeCoords = fnNodeCoords.current;

        tertiaryNodeCoords.current = value;

        // debugger;
        if (_fnNodeCoords.indexOf(undefined) === -1 && tertiaryNodeCoords.current.length === 2) {
            dispatch({
                type: ACTION_TYPES.ADD_CARD_POS,
                payload: {
                    fnNodeCoords: fnNodeCoords.current,
                    tertiaryNodeCoords: tertiaryNodeCoords.current
                }
            });
        }
    };

    const setFnNodeCoords = ({ index, value }) => {
        let _fnNodeCoords = fnNodeCoords.current;

        if (typeof index === 'number') {
            _fnNodeCoords[index] = value;
        }
        fnNodeCoords.current = _fnNodeCoords;

        console.log(tertiaryNodeCoords.current);

        if (_fnNodeCoords.indexOf(undefined) === -1 && tertiaryNodeCoords.current.length === 2) {
            dispatch({
                type: ACTION_TYPES.ADD_CARD_POS,
                payload: {
                    fnNodeCoords: fnNodeCoords.current,
                    tertiaryNodeCoords: tertiaryNodeCoords.current
                }
            });
        }
    };

    const updateCardEquation = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_CARD_EQ, payload });

    const updateInitialValue = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_INITIAL_VALUE, payload });

    const addCardPos = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.ADD_CARD_POS, payload });

    return {
        state,
        updateCardEquation,
        updateInitialValue,
        addCardPos,
        dispatch,
        setFnNodeCoords,
        setTertiaryNodeCoords
    };
};
