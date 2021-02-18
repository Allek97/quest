import adjacencyListCreation from "../../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./AdjacencyListCreationMaze";

// On cree un array de tous les edges dans le maze
export default function kruskalEdgesCreation(nodes) {
  let positionList = new Map();

  let adjacencyList = new Map();

  let kruskalEdgeList = [];

  adjacencyListCreation(nodes, positionList, adjacencyList, false);

  nodes.map((node) => {
    //let voisins = new Map();
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
        kruskalEdgeList.push([node, north[1], "north"]);
      }
      if (south !== undefined) {
        kruskalEdgeList.push([node, south[1], "south"]);
      }
      if (west !== undefined) {
        kruskalEdgeList.push([node, west[1], "west"]);
      }
      if (east !== undefined) {
        kruskalEdgeList.push([node, east[1], "east"]);
      }
    }
  });

  return kruskalEdgeList;
}
