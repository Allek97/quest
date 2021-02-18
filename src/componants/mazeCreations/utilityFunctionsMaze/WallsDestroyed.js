export default function wallsDestroyed(
  node,
  positionList,
  position,
  visitedMazeCells = new Set(),
  visitedVertexList = [],
  huntAndKillMazeCells = new Map(),
  isWallHunted,
  mazeCellWithPreviousNode = new Map()
) {
  const north = positionList.get(JSON.stringify([node.row - 1, node.column]));
  const south = positionList.get(JSON.stringify([node.row + 1, node.column]));
  const east = positionList.get(JSON.stringify([node.row, node.column + 1]));
  const west = positionList.get(JSON.stringify([node.row, node.column - 1]));

  if (position === "north") {
    if (!(north === undefined)) {
      visitedMazeCells.add(north[1]);
      visitedVertexList.push(north[1]);
      isWallHunted
        ? huntAndKillMazeCells.set(north[1], ["Wall", north[1].row])
        : huntAndKillMazeCells.set(north[1], ["Unhunted", null]);
      mazeCellWithPreviousNode.set(north[1], null);
      return north[1];
    }
  } else if (position === "south") {
    if (!(south === undefined)) {
      visitedMazeCells.add(south[1]);
      visitedVertexList.push(south[1]);
      isWallHunted
        ? huntAndKillMazeCells.set(south[1], ["Wall", south[1].row])
        : huntAndKillMazeCells.set(south[1], ["Unhunted", null]);
      mazeCellWithPreviousNode.set(south[1], null);
      return south[1];
    }
  } else if (position === "east") {
    if (!(east === undefined)) {
      visitedMazeCells.add(east[1]);
      visitedVertexList.push(east[1]);
      isWallHunted
        ? huntAndKillMazeCells.set(east[1], ["Wall", east[1].row])
        : huntAndKillMazeCells.set(east[1], ["Unhunted", null]);
      mazeCellWithPreviousNode.set(east[1], null);
      return east[1];
    }
  } else if (position === "west") {
    if (!(west === undefined)) {
      visitedMazeCells.add(west[1]);
      visitedVertexList.push(west[1]);
      isWallHunted
        ? huntAndKillMazeCells.set(west[1], ["Wall", west[1].row])
        : huntAndKillMazeCells.set(west[1], ["Unhunted", null]);
      mazeCellWithPreviousNode.set(west[1], null);
      return west[1];
    }
  }
}
