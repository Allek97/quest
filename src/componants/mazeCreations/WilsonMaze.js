import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function wilsonMaze(
  nodes,
  visitedMazeCells = new Map(),
  visitedVertexList = new Set()
) {
  let positionList = new Map();

  //adjacencyListCreation(nodes, positionList, adjacencyList, false);
  adjacencyListCreation(nodes, positionList);

  let adjacencyListMaze = new Map();

  let visitedSet = new Map();

  let knightRow, knightCol, princessRow, princessCol;

  let count = 0;

  nodes.map((node, nodeIdx) => {
    if (node.isStart) {
      knightRow = node.row;
      knightCol = node.column;
    }
    if (node.isEnd) {
      princessRow = node.row;
      princessCol = node.column;
    }
  });

  adjacencyListCreationMaze(nodes, adjacencyListMaze);

  const gridSize = adjacencyListMaze.size;

  const firstCell = getRandomKey(adjacencyListMaze);

  visitedVertexList.add(firstCell); // Vertexs principales

  visitedMazeCells.set(firstCell, null); // Vertexes + Edges principales

  let unvisitedVerticesTracker = [...adjacencyListMaze.keys()]; // Enlever les nodes qui sont deja dans visitedVertexList

  unvisitedVerticesTracker = unvisitedVerticesTracker.filter((node) => {
    return !visitedVertexList.has(node);
  });

  let verticesTrackerArrows = new Map(); // Keep track of each node with its arrow direction

  let traversalTillVisited = new Map();

  while (visitedVertexList.size < gridSize) {
    const core = getRandomEdge(unvisitedVerticesTracker)[0];
    const neighboursOfCore = adjacencyListMaze.get(core);
    let randomDirection = getRandomKey(neighboursOfCore);
    let randomNeighbour = neighboursOfCore.get(randomDirection);
    verticesTrackerArrows.set(core, randomDirection);

    let traversalCore = randomNeighbour;
    while (!visitedVertexList.has(traversalCore)) {
      const neighboursOfTraversalCore = adjacencyListMaze.get(traversalCore);
      randomDirection = getRandomKey(neighboursOfTraversalCore);
      verticesTrackerArrows.set(traversalCore, randomDirection);
      traversalCore = neighboursOfTraversalCore.get(randomDirection);
    }

    let pathCore = core;

    visitedMazeCells.set(core, null);
    visitedVertexList.add(core);

    while (true) {
      const neighbourOfPathCore = adjacencyListMaze.get(pathCore);

      const direction = verticesTrackerArrows.get(pathCore);
      const neighbour = neighbourOfPathCore.get(direction);

      if (visitedVertexList.has(neighbour)) {
        const pathCoreWall = wallsDestroyed(
          pathCore,
          positionList,
          direction,
          undefined,
          undefined,
          undefined,
          undefined,
          visitedMazeCells
        );
        visitedMazeCells.set(neighbour, pathCoreWall);
        traversalTillVisited.set(neighbour, [pathCore, direction]);
        break;
      }

      traversalTillVisited.set(neighbour, [pathCore, direction]);

      pathCore = neighbour;
    }

    traversalTillVisited.forEach((coreInfo, neighbour) => {
      visitedVertexList.add(neighbour);
      const pathCoreWall = wallsDestroyed(
        coreInfo[0],
        positionList,
        coreInfo[1],
        undefined,
        undefined,
        undefined,
        undefined,
        visitedMazeCells
      );
      visitedMazeCells.set(neighbour, pathCoreWall);
    });

    unvisitedVerticesTracker = unvisitedVerticesTracker.filter((node) => {
      return !visitedVertexList.has(node);
    });
  }

  let spaceTime = 1;

  const visitedMazeCellsKeys = [...visitedMazeCells.keys()];
  let pairingCount = 0;

  visitedMazeCells.forEach((previousNode, node) => {
    if (pairingCount === 0) {
      visitedMazeCells.set(node, visitedMazeCellsKeys[0]);
    } else {
      visitedMazeCells.set(node, visitedMazeCellsKeys[pairingCount - 1]);
    }
    pairingCount++;
  });

  setTimeout(() => {
    visitedMazeCells.forEach((previousNode, node, idx) => {
      spaceTime++;

      setTimeout(() => {
        const htmlLink = document.getElementById(node.id).className;

        document.getElementById(previousNode.id).className = "wilson";
        document.getElementById(node.id).className = "leadvertex";

        /*console.log("PREVIOUS : ");
        console.log(
          "row : " + previousNode.row + "| col : " + previousNode.column
        );
        console.log("NODE : ");
        console.log("row : " + node.row + "| col : " + node.column);*/
      }, 30 * spaceTime);
    });
  }, 2000);
}

let verticesTrackerArrows = new Map(); // Keep track of each node with its arrow direction

let traversalTillVisited = new Map();
