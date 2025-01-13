import { computeFunctionChain, getPathsForNodes } from '@/app/utils/utils';
import { FunctionList } from '../modules/LinkedList';
import {
    FunctionCardItem,
    IFunctionCardsReducerAction,
    IFunctionCardsReducerState
} from '@/app/types/functionCardTypes';

export const reducer = (state: IFunctionCardsReducerState, action: IFunctionCardsReducerAction) => {
    const { type, payload = {} } = action;
    const traversalOrder = FunctionList.getTraversalOrder();

    switch (type) {
        case 'ADD_FUNCTION_CARD': {
            FunctionList.append(6);

            const data = [...FunctionList.getNextIndices()].map((index) => ({ eq: '', next: index }));

            return {
                ...state,
                data
            };
        }
        case 'UPDATE_INITIAL_VALUE': {
            const { value: initialValue } = payload;

            let outputValue = state.outputValue;

            const canCompute = state.data.map((item: FunctionCardItem) => item.eq).indexOf('') === -1;

            if (canCompute) {
                outputValue = computeFunctionChain({ traversalOrder, data: state.data, initialValue });
            }

            return {
                ...state,
                initialValue,
                outputValue
            };
        }
        case 'UPDATE_CARD_EQ': {
            const { index, value } = payload;

            const newData = [...state?.data];
            newData[index]['eq'] = value;

            let outputValue = state.outputValue;

            const canCompute = newData.map((item) => item.eq).indexOf('') === -1;
            if (canCompute) {
                outputValue = computeFunctionChain({
                    traversalOrder,
                    data: newData,
                    initialValue: state.initialValue
                });
            }

            return {
                ...state,
                outputValue,
                data: newData
            };
        }
        case 'ADD_CHAIN_PATHS': {
            const { nodes } = payload;

            let chainPaths = getPathsForNodes({
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
