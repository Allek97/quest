import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function activateWeights(nodes, row, col) {
  const newNodes = nodes.slice();
  const trueRow = row * COLUMN_SIZE;

  if (row === KNIGHT_ROW && col === KNIGHT_COL) {
    return nodes;
  }

  if (row === PRINCESS_ROW && col === PRINCESS_COL) {
    return nodes;
  }

  const myNode = nodes[trueRow + col];

  const htmlLink = document.getElementById(myNode.id).className;

  if (htmlLink !== "item-weight") {
    document.getElementById(myNode.id).className = "item-weight";
  } else {

    document.getElementById(myNode.id).className = "item";
  }

  /*const newNode = {
    ...myNode,
    weight: myNode.isWeight === false ? 5 : 1,
    isWeight: !myNode.isWeight,
    isWall: false,
  };

  newNodes[trueRow + col] = newNode;

  return newNodes;*/
}
