export default function euclidienDistance(currentNode, goalNode) {
  let h = Math.sqrt(
    Math.abs((currentNode.column - goalNode.column) ^ 2) +
      Math.abs((currentNode.row - goalNode.row) ^ 2)
  );

  return h;
}
