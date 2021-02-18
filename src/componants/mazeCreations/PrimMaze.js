import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function primMaze(nodes, visitedMazeCells = new Set()) {
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

  let vertexList = new Set();

  let vertexWithNeighbours = new Set();

  const firstCell = getRandomKey(adjacencyListMaze);

  vertexList.add(firstCell);

  vertexWithNeighbours.add(firstCell);

  while (vertexList.size < gridSize) {
    const core = getRandomKey(vertexWithNeighbours);
    const neighboursOfCore = adjacencyListMaze.get(core);
    const randomPositionCell = getRandomKey(neighboursOfCore);
    const choosenCell = neighboursOfCore.get(randomPositionCell);

    if (neighboursOfCore.size === 0) {
      vertexWithNeighbours.delete(core);
    } else if (!vertexWithNeighbours.has(choosenCell)) {
      vertexList.add(choosenCell);
      vertexWithNeighbours.add(choosenCell);

      visitedMazeCells.add(core);
      wallsDestroyed(core, positionList, randomPositionCell, visitedMazeCells);
      visitedMazeCells.add(choosenCell);

      neighboursOfCore.delete(randomPositionCell);
      adjacencyListMaze.set(core, neighboursOfCore);
    }
  }

  let spaceTime = 1;

  setTimeout(() => {
    visitedMazeCells.forEach((node) => {
      spaceTime++;
      //console.log(node);
      const htmlLink = document.getElementById(node.id).className;
      setTimeout(() => {
        document.getElementById(node.id).className = "item--animation prim";
      }, 15 * spaceTime);
    });
  }, 2000);
}
