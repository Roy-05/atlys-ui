import { FunctionList } from '@/app/modules/LinkedList';
import { ActionDispatch, useReducer } from 'react';

export const ACTION_TYPES = Object.freeze({
    UPDATE_INITIAL_VALUE: 'UPDATE_INITIAL_VALUE',
    UPDATE_CARD_EQ: 'UPDATE_CARD_EQ'
});

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION_TYPES.UPDATE_INITIAL_VALUE: {
            const { value: initialValue } = payload;

            let traverseOrder = FunctionList.display();

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
        case ACTION_TYPES.UPDATE_CARD_EQ:
            const { index, value } = payload;
            // console.log(index, value);
            const newData = [...state?.data];
            newData[index] = value;

            let traverseOrder = FunctionList.display();

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
        default:
            return state;
    }
};

const init = () => {
    FunctionList.append(0);
    FunctionList.append(1);
    FunctionList.append(3);
    FunctionList.append(4);
    FunctionList.append(2);

    return {
        initialValue: 0,
        outputValue: 0,
        data: [...new Array(5)]
    };
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
            data: [...new Array(5)]
        },
        init
    );

    const updateCardEquation = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_CARD_EQ, payload });

    const updateInitialValue = ({ payload = {} }: { payload: Record<string, string | number> }) =>
        dispatch({ type: ACTION_TYPES.UPDATE_INITIAL_VALUE, payload });

    return { state, updateCardEquation, updateInitialValue };
};
