import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function activateWalls(nodes, row, col, id) {
  /*const newNodes = nodes.slice();
  const trueRow = row * COLUMN_SIZE;*/
  const htmlLink = document.getElementById(id).className;

  if (htmlLink.includes("start")) {
    return nodes;
  }

  if (htmlLink.includes("end")) {
    return nodes;
  }

  if (htmlLink !== "item-wall") {
    document.getElementById(id).className = "item-wall";
  } else {
    document.getElementById(id).className = "item";
  }

  /*const newNode = {
      ...myNode,
      weight: 1,
      isWall: !myNode.isWall,
      isWeight: false,
    };
  
    newNodes[trueRow + col] = newNode;
  
    return newNodes;*/
}
