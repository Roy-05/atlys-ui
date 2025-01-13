import { colors } from '@/app/utils/colors';
import { Ref } from 'react';

export const SvgChainNode = ({ nodeRef }: { nodeRef?: Ref<SVGSVGElement> }) => (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' ref={nodeRef}>
        <circle cx='7.5' cy='7.5' r='6.5' fill='white' stroke={colors.neutral[300]} strokeWidth='2' />
        <circle cx='7.5' cy='7.5' r='3.5' fill={colors.decorative.blue[50]} />
    </svg>
);
