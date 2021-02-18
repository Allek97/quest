import {
  ROW_SIZE,
  COLUMN_SIZE,
  KNIGHT_ROW,
  KNIGHT_COL,
  PRINCESS_ROW,
  PRINCESS_COL,
} from "../abstracts/GlobalVariables";

export default function randomMaze(nodes, density = 0.5) {
  const newNodes = nodes.slice();

  let knightRow, knightCol, princessRow, princessCol;

  let spaceTime = 1;

  newNodes.map((node, nodeIdx) => {
    const htmlLink = document.getElementById(node.id).className;
    if (htmlLink.includes("start")) {
      knightRow = node.row;
      knightCol = node.column;
    } else if (htmlLink.includes("end")) {
      princessRow = node.row;
      princessCol = node.column;
    }
  });

  newNodes.map((node, nodeIdx) => {
    const htmlLink = document.getElementById(node.id).className;
    if (
      node.row !== knightRow &&
      node.column !== knightCol &&
      node.row !== princessRow &&
      node.column !== princessCol
    ) {
      let rand = Math.random();
      if (rand < density) {
        spaceTime++;
        setTimeout(() => {
          document.getElementById(node.id).className = "item-wall--animation";
        }, 10 * spaceTime);
      }
    }
  });

  return [newNodes, spaceTime];
}
