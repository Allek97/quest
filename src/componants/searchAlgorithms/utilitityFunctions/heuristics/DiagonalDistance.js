export default function diagonalDistance(currentNode, goalNode) {
  let h = Math.max(
    Math.abs(currentNode.column - goalNode.column),
    Math.abs(currentNode.row - goalNode.row)
  );

  return h;
}
