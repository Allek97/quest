export default function PathTracking(
    shortPath,
    visitedSpeed,
    spaceTime,
    shortPathSpeed
) {
    const shortPathArray = [...shortPath];
    setTimeout(() => {
        let i = 1;
        shortPathArray.map((node, nodeIdx) => {
            i++;
            const htmlLink = document.getElementById(node.id).className;
            setTimeout(() => {
                if (nodeIdx !== shortPathArray.length - 1) {
                    const neighbourRow = shortPathArray[nodeIdx + 1].row;
                    const neighbourColumn = shortPathArray[nodeIdx + 1].column;

                    /* document.getElementById(node.id).style.zIndex =
                        "" + (shortPathArray.length - nodeIdx);*/
                    if (node.row > neighbourRow) {
                        document.getElementById(node.id).className +=
                            " topTrack";
                    } else if (node.row < neighbourRow) {
                        document.getElementById(node.id).className +=
                            " bottomTrack";
                    } else if (node.column > neighbourColumn) {
                        document.getElementById(node.id).className +=
                            " leftTrack";
                    } else if (node.column < neighbourColumn) {
                        document.getElementById(node.id).className +=
                            " rightTrack";
                    }

                    if (nodeIdx === 0) {
                        document.getElementById(node.id).className +=
                            " startTrack";
                    }
                }
            }, shortPathSpeed * i);
        });
    }, visitedSpeed * spaceTime + 300);
}
