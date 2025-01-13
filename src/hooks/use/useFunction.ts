import { FunctionList } from '@/app/modules/LinkedList';
import { ActionDispatch, useReducer } from 'react';

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
            const { index, value } = payload;

            let cardPos = [...state.cardPos];
            cardPos[index] = value;

            const traversalOrder = FunctionList.getTraversalOrder();
            let linePaths = [];

            if (cardPos.indexOf(undefined) === -1) {
                linePaths = generateCurvedPaths({ traversalOrder, cardPos });
            }

            console.log(traversalOrder, linePaths, cardPos);

            return {
                ...state,
                cardPos,
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

const updatedLinePaths = ({ traversalOrder, cardPos }) => {
    return traversalOrder.map((currentIndex, idx) => {
        const nextIndex = traversalOrder[idx + 1]; // Get the next index in the traversal order
        return {
            in: cardPos[currentIndex].out,
            out: nextIndex !== undefined ? cardPos[nextIndex].in : null // If there's no next index, set end to null
        };
    });
};

const generateCurvedPaths = ({ traversalOrder, cardPos }) => {
    return traversalOrder
        .map((currentIndex, idx) => {
            const nextIndex = traversalOrder[idx + 1];
            const start = cardPos[currentIndex].out;
            const end = nextIndex !== undefined ? cardPos[nextIndex].in : null;

            if (!end) {
                return null;
            }

            // Determine direction: bottom or right
            const isHorizontal = Math.abs(start[0] - end[0]) >= Math.abs(start[1] - end[1]);

            // Adjust control point based on the direction
            const controlPoint = isHorizontal
                ? [(start[0] + end[0]) / 2, start[1] + 40] // Horizontal curve pointing downward
                : [start[0] + 40, (start[1] + end[1]) / 2]; // Vertical curve pointing right

            return `M ${start[0]} ${start[1]} Q ${controlPoint[0]} ${controlPoint[1]} ${end[0]} ${end[1]}`;
        })
        .filter(Boolean);
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
    let validInputs = 0;
    let output = 0;

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

    const updateCardEquation = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_CARD_EQ, payload });

    const updateInitialValue = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_INITIAL_VALUE, payload });

    const addCardPos = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.ADD_CARD_POS, payload });

    return { state, updateCardEquation, updateInitialValue, addCardPos, dispatch };
};
