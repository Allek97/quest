import {
    ROW_SIZE,
    COLUMN_SIZE,
    KNIGHT_ROW,
    KNIGHT_COL,
    PRINCESS_ROW,
    PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function updateStateBeforeAlgoStart(
    nodes,
    isWeightReset = false
) {
    const newNodes = nodes.slice();
    const weightValue = document.getElementById("rs-range-line-weight").value;
    const rewardValue = document.getElementById("rs-range-line-reward").value;

    nodes.map((node, nodeIdx) => {
        const htmlLink = document.getElementById(node.id).className;
        const trueRow = node.row * COLUMN_SIZE;
        if (htmlLink.includes("wall")) {
            const newNode = {
                ...node,
                weight: 1,
                isWall: true,
                isWeight: false,
                isShortcut: false,
                isStart: false,
                isEnd: false,
                heuristic: Infinity,
                totalDistance: Infinity,
                previousNode: null,
            };

            newNodes[trueRow + node.column] = newNode;
        } else if (htmlLink.includes("weight")) {
            const newNode = {
                ...node,
                weight: +weightValue,
                isWeight: true,
                isWall: false,
                isShortcut: false,
                isStart: false,
                isEnd: false,
                heuristic: Infinity,
                totalDistance: Infinity,
                previousNode: null,
            };

            newNodes[trueRow + node.column] = newNode;
        } else if (htmlLink.includes("shortcut")) {
            const newNode = {
                ...node,
                weight: +rewardValue,
                isShortcut: true,
                isWeight: false,
                isWall: false,
                isStart: false,
                isEnd: false,
                heuristic: Infinity,
                totalDistance: Infinity,
                previousNode: null,
            };

            newNodes[trueRow + node.column] = newNode;
        } else if (htmlLink.includes("start")) {
            const newNode = isWeightReset
                ? {
                      ...node,
                      weight: 1,
                      isShortcut: false,
                      isWeight: false,
                      //  isWall: false,
                      isStart: true,
                      isEnd: false,
                      heuristic: Infinity,
                      totalDistance: Infinity,
                      previousNode: null,
                  }
                : {
                      ...node,
                      weight: 1,
                      /*isShortcut: false,
                         isWeight: false,
                         isWall: false,*/
                      isStart: true,
                      isEnd: false,
                      heuristic: Infinity,
                      totalDistance: Infinity,
                      previousNode: null,
                  };

            newNodes[trueRow + node.column] = newNode;
        } else if (htmlLink.includes("end")) {
            const newNode = isWeightReset
                ? {
                      ...node,
                      weight: 1,
                      isShortcut: false,
                      isWeight: false,
                      // isWall: false,
                      isStart: false,
                      isEnd: true,
                      heuristic: Infinity,
                      totalDistance: Infinity,
                      previousNode: null,
                  }
                : {
                      ...node,
                      weight: 1,
                      /*isShortcut: true,
                        isWeight: false,
                        isWall: false,*/
                      isStart: false,
                      isEnd: true,
                      heuristic: Infinity,
                      totalDistance: Infinity,
                      previousNode: null,
                  };

            newNodes[trueRow + node.column] = newNode;
        } else {
            const newNode = {
                ...node,
                weight: 1,
                isWeight: false,
                isWall: false,
                isShortcut: false,
                isStart: false,
                isEnd: false,
                heuristic: Infinity,
                totalDistance: Infinity,
                previousNode: null,
            };

            newNodes[trueRow + node.column] = newNode;
        }
    });
    return newNodes;
}
