import { XStack } from '@/design-system/layout';
import { Ref } from 'react';
import { SvgChainNode } from '../svg/SvgChainNode';
import { B4 } from '@/design-system/typography';

export const ChainingNode = ({
    nodeRef = null,
    text = '',
    className = ''
}: {
    nodeRef: Ref<SVGSVGElement>;
    text: string;
    className?: string;
}) => {
    return (
        <XStack className={`gap-x-1 items-center ${className}`}>
            <SvgChainNode nodeRef={nodeRef} />
            <B4>{text}</B4>
        </XStack>
    );
};
