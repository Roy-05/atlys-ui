export const getElementPosition = ({ node }: { node: Element & HTMLOrSVGElement }): [number, number] => {
    const rect1 = node.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    return [x1, y1];
};
