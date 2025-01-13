import { ActionDispatch } from 'react';

export type Coords = [number, number];

export type ChainNode = {
    inNode: Coords | null;
    outNode: Coords | null;
};

export type FunctionCardItem = {
    eq: string;
    next: number | null;
};

export interface IFunctionCardsReducerState {
    initialValue: number;
    outputValue: number;
    chainPaths: Array<string>;
    data: Array<FunctionCardItem>;
}

export interface IFunctionCardsReducerAction {
    type: 'ADD_FUNCTION_CARD' | 'ADD_CHAIN_PATHS' | 'UPDATE_INITIAL_VALUE' | 'UPDATE_CARD_EQ';
    // "@ts-expect-error"
    payload?: Record<string, any>;
}

export interface IFunctionCard {
    item: FunctionCardItem;
    index: number;
    setFnNodeCoords: ({ index, value }: { index: number; value: ChainNode }) => void;
    dispatch: ActionDispatch<[action: IFunctionCardsReducerAction]>;
}
