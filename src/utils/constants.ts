export const VALID_EQ_REG_EXP = /^((\d+|x|([2-9]|[1-9]\d+)x))((\s)*(\+|\-|\*|\/|\^)(\s)*(\d+|x|([2-9]|[1-9]\d+)x))*$/gi;

export const ACTION_TYPES = Object.freeze({
    UPDATE_INITIAL_VALUE: 'UPDATE_INITIAL_VALUE',
    UPDATE_CARD_EQ: 'UPDATE_CARD_EQ'
});
