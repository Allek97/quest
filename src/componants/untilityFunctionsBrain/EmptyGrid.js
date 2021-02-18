import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function emptyGrid(nodes) {
  const newNodes = nodes.slice();
  nodes.map((node) => {
    const htmlLink = document.getElementById(node.id).className;
    const trueRow = node.row * COLUMN_SIZE;
    const newNode = {
      ...node,
      isWall: false,
      isPressed: false,
      isWeight: false,
      weight: 1,
      isShortcut: false,
      shortcutValue: 1,
      heuristic: Infinity,
      totalDistance: Infinity,
      previousNode: null,
    };
    newNodes[trueRow + node.column] = newNode;
    document.getElementById(node.id).className = "item";
  });
  return newNodes;
}
