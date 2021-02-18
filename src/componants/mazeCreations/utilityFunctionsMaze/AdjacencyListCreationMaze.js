import adjacencyListCreation from "../../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";

export default function adjacencyListCreationMaze(
  nodes,
  adjacencyListMaze = new Map()
) {
  let positionList = new Map();

  let adjacencyList = new Map();

  adjacencyListCreation(nodes, positionList, adjacencyList, false);

  nodes.map((node) => {
    let voisins = new Map();
    if ((node.row + 1) % 2 && (node.column + 1) % 2) {
      const north = positionList.get(
        JSON.stringify([node.row - 2, node.column])
      );
      const south = positionList.get(
        JSON.stringify([node.row + 2, node.column])
      );
      const west = positionList.get(
        JSON.stringify([node.row, node.column - 2])
      );
      const east = positionList.get(
        JSON.stringify([node.row, node.column + 2])
      );

      if (north !== undefined) {
        voisins.set("north", north[1]);
      }
      if (south !== undefined) {
        voisins.set("south", south[1]);
      }
      if (west !== undefined) {
        voisins.set("west", west[1]);
      }
      if (east !== undefined) {
        voisins.set("east", east[1]);
      }

      adjacencyListMaze.set(node, voisins);
    }
  });
}
