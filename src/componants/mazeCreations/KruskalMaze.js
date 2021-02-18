import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function kruskalMaze(nodes, visitedMazeCells = new Set()) {
  let positionList = new Map();

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

  //adjacencyListCreation(nodes, positionList, adjacencyList, false);
  adjacencyListCreationMaze(nodes, adjacencyListMaze);

  const gridSize = adjacencyListMaze.size;

  //let nbVisitedCells = 0;

  //let mazeStack = []; // Notre stack de "cell" pour backtrack en cas de cul-de-sac

  const first = positionList.get(JSON.stringify([0, 0]))[1];

  //visitedSet.set(first, "base");

  //mazeStack.push(first);

  //let randomPosition = [];

  let uniqueCells = new Map();

  let visistedMap = new Map();

  let stopCondition = true;

  let kruskalEdgeList = kruskalEdgesCreation(nodes);

  console.log(kruskalEdgeList.length);

  while (kruskalEdgeList.length > 0) {
    // On selectionne un binome(edge) au hasard
    const edge = getRandomEdge(kruskalEdgeList)[0];
    const edgeIdx = getRandomEdge(kruskalEdgeList)[1];
    const core = edge[0];
    const coreNeighbour = edge[1];
    const position = edge[2];

    if (!uniqueCells.has(core.id) && !uniqueCells.has(coreNeighbour.id)) {
      uniqueCells.set(core.id, core.id);
      uniqueCells.set(coreNeighbour.id, core.id);

      visitedMazeCells.add(core);
      wallsDestroyed(core, positionList, position, visitedMazeCells);
      visitedMazeCells.add(coreNeighbour);
    } else if (uniqueCells.has(core.id) && !uniqueCells.has(coreNeighbour.id)) {
      const assignedIdOfcore = uniqueCells.get(core.id);
      uniqueCells.set(coreNeighbour.id, assignedIdOfcore);

      visitedMazeCells.add(core);
      wallsDestroyed(core, positionList, position, visitedMazeCells);
      visitedMazeCells.add(coreNeighbour);
    } else if (!uniqueCells.has(core.id) && uniqueCells.has(coreNeighbour.id)) {
      const assignedIdOfcoreNeighbour = uniqueCells.get(coreNeighbour.id);
      uniqueCells.set(core.id, assignedIdOfcoreNeighbour);

      visitedMazeCells.add(core);
      wallsDestroyed(core, positionList, position, visitedMazeCells);
      visitedMazeCells.add(coreNeighbour);
    } else if (uniqueCells.has(core.id) && uniqueCells.has(coreNeighbour.id)) {
      const coreId = uniqueCells.get(core.id);
      const coreNeighbourId = uniqueCells.get(coreNeighbour.id);

      if (coreId !== coreNeighbourId) {
        uniqueCells.forEach((value, key) => {
          if (value === coreNeighbourId) {
            uniqueCells.set(key, coreId);
          }
        });

        visitedMazeCells.add(core);
        wallsDestroyed(core, positionList, position, visitedMazeCells);
        visitedMazeCells.add(coreNeighbour);
      } else {
        count++;
      }
    }
    console.log(kruskalEdgeList.length);
    kruskalEdgeList = kruskalEdgeList.filter((item) => {
      return item[0].id !== core.id || item[1].id !== coreNeighbour.id;
    });
  }

  console.log(uniqueCells);
  console.log(visitedMazeCells);
  console.log(gridSize);

  let spaceTime = 1;

  setTimeout(() => {
    visitedMazeCells.forEach((node) => {
      spaceTime++;
      //console.log(node);
      const htmlLink = document.getElementById(node.id).className;
      setTimeout(() => {
        document.getElementById(node.id).className = "item--animation kruskal";
      }, 15 * spaceTime);
    });
  }, 2000);
}
