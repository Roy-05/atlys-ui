import { ChainNode, Coords, FunctionCardItem } from '@/app/types/functionCardTypes';

export const getElementPosition = ({ node }: { node: Element & HTMLOrSVGElement }): [number, number] => {
    const rect1 = node.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    return [x1, y1];
};

const getControlPoints = (
    midX: number,
    midY: number,
    {
        vertexHeight,
        angle,
        dir = 1
    }: {
        vertexHeight: number;
        angle: number;
        dir: 1 | -1;
    }
) => {
    const offsetX = vertexHeight * Math.cos(angle + (Math.PI / 2) * dir);
    const offsetY = vertexHeight * Math.sin(angle + (Math.PI / 2) * dir);

    const controlX = midX + offsetX;
    const controlY = midY + offsetY;

    return [controlX, controlY];
};

const generateCurvedPath = (start: Coords, end: Coords) => {
    const startX = start[0];
    const startY = start[1];
    const endX = end[0];
    const endY = end[1];

    const CURVE_TRESHOLD = 450;

    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const vertexHeight = Math.ceil(distance / 3);

    // Calculate the midpoint
    const midpointX = (startX + endX) / 2;
    const midpointY = (startY + endY) / 2;

    // Calculate the angle of the line (in radians)
    const angle = Math.atan2(endY - startY, endX - startX);

    // Calculate the control points
    if (distance > CURVE_TRESHOLD) {
        // Split the path into two curves
        const firstMidX = (startX + midpointX) / 2;
        const firstMidY = (startY + midpointY) / 2;

        const [controlX1, controlY1] = getControlPoints(firstMidX, firstMidY, {
            vertexHeight: vertexHeight / 3,
            angle,
            dir: -1
        });

        const secondMidX = (midpointX + endX) / 2;
        const secondMidY = (midpointY + endY) / 2;

        const [controlX2, controlY2] = getControlPoints(secondMidX, secondMidY, {
            vertexHeight: vertexHeight / 3,
            angle,
            dir: 1
        });

        // Construct the sine wave path with two quadratic Bézier curves
        return `M${startX} ${startY} Q${controlX1} ${controlY1} ${midpointX} ${midpointY} Q${controlX2} ${controlY2} ${endX} ${endY}`;
    } else {
        const [controlX, controlY] = getControlPoints(midpointX, midpointY, {
            vertexHeight,
            angle,
            dir: 1
        });

        return `M${startX} ${startY} Q${controlX} ${controlY} ${endX} ${endY}`;
    }
};

export const getPathsForNodes = ({
    traversalOrder,
    nodes
}: {
    traversalOrder: Array<number>;
    nodes: Array<ChainNode>;
}) => {
    const chainPaths = [];

    // adding two indexes for entry and exit nodes
    traversalOrder = [0, ...traversalOrder.map((i: number) => i + 1), traversalOrder.length + 1];

    for (let i = 0; i < nodes.length - 1; i++) {
        const currentIndex = traversalOrder[i];
        const nextIndex = traversalOrder[i + 1];

        const start = nodes[currentIndex]?.outNode;
        const end = nodes[nextIndex]?.inNode;

        if (start && end) {
            const path = generateCurvedPath(start, end);

            chainPaths.push(path);
        }
    }

    return chainPaths;
};

export const computeFunctionChain = ({
    traversalOrder,
    data,
    initialValue
}: {
    traversalOrder: Array<number>;
    data: Array<FunctionCardItem>;
    initialValue: number;
}) => {
    let output = initialValue;

    traversalOrder.forEach((index: number) => {
        let equation = data[index]['eq'];

        equation = equation
            .replaceAll(/(\d+)(x)/g, '$1*$2')
            .replaceAll('^', '**')
            .replaceAll(/\s+/g, '')
            .replaceAll('x', output.toString());

        // TODO: Use a postfix tokenization logic instead of using `eval()` here
        output = eval(equation);
    });

    return output;
};
