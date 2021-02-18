export default function squaredEuclidienDistance(currentNode, goalNode) {
  // Squared Euclidien distance is not a good/admissible heuristic

  let h =
    (Math.abs(currentNode.column - goalNode.column) ^ 2) +
    (Math.abs(currentNode.row - goalNode.row) ^ 2);
  return h;
}
