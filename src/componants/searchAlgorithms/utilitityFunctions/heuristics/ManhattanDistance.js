export default function manhattanDistance(currentNode, goalNode) {
  let h =
    Math.abs(currentNode.column - goalNode.column) +
    Math.abs(currentNode.row - goalNode.row);

  return h;
}
