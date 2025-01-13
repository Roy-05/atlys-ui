export const getElementPosition = ({ node }: { node: Element & HTMLOrSVGElement }): [number, number] => {
    const rect1 = node.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    return [x1, y1];
};

const getControlPoints = (midX, midY, { vertexHeight, angle, dir = 1 }) => {
    const offsetX = vertexHeight * Math.cos(angle + (Math.PI / 2) * dir);
    const offsetY = vertexHeight * Math.sin(angle + (Math.PI / 2) * dir);

    const controlX = midX + offsetX;
    const controlY = midY + offsetY;

    return [controlX, controlY];
};

export const generateCurvedPath = (start, end) => {
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
            vertexHeight: vertexHeight / 2,
            angle,
            dir: -1
        });

        const secondMidX = (midpointX + endX) / 2;
        const secondMidY = (midpointY + endY) / 2;

        const [controlX2, controlY2] = getControlPoints(secondMidX, secondMidY, {
            vertexHeight: vertexHeight / 2,
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
