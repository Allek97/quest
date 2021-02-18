import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function updateWallsState(nodes) {
  const newNodes = nodes.slice();

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
    }
  });
  return newNodes;
}
