import { VALID_EQ_REG_EXP } from '@/utils/constants';
import { Dispatch, SetStateAction } from 'react';

export const validateFunctionInput = ({
    value,
    onError
}: {
    value: string;
    onError: Dispatch<SetStateAction<string>>;
}) => {
    if (!value.includes('x')) {
        onError("Expression does not contain 'x'");
        return;
    }

    let regex = new RegExp(VALID_EQ_REG_EXP);

    if (value.match(regex)) {
        onError('');
        return true;
    }

    onError('Not a valid expression');
    return false;
};
