export default function diagonalDistance(currentNode, goalNode) {
  let dx = Math.abs(currentNode.column - goalNode.column);
  let dy = Math.abs(currentNode.row - goalNode.row);

  let h = dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy);

  return h;
}
