import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function fillGridWithWalls(nodes) {
  const newNodes = nodes.slice();
  nodes.map((node) => {
    const htmlLink = document.getElementById(node.id).className;
    const trueRow = node.row * COLUMN_SIZE;
    const newNode = {
      ...node,
      isWall: true,
    };
    newNodes[trueRow + node.column] = newNode;
    document.getElementById(node.id).className = "item-wall";
  });
  return newNodes;
}
