import { FUNC_CARD_ACTION_TYPES } from '@/app/actions/functionCardsActionTypes';
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
    type: keyof typeof FUNC_CARD_ACTION_TYPES;
    payload: Record<string, string | any>;
}

export interface IFunctionCard {
    item: FunctionCardItem;
    index: number;
    setFnNodeCoords: ({ index, value }: { index: number; value: ChainNode }) => void;
    dispatch: ActionDispatch<[action: IFunctionCardsReducerAction]>;
}
