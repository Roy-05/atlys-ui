import { colors } from '@/utils/colors';
import { JSX } from 'react';

export const SvgChainPath = ({ ...props }: JSX.IntrinsicElements['path']) => {
    return <path stroke={colors.decorative.blue[100]} strokeWidth={6} strokeOpacity={0.3} fill='none' {...props} />;
};
