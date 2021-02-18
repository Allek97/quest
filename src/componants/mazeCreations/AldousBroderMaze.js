import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function aldousBroderMaze(
  nodes,
  visitedMazeCells = new Set(),
  visitedVertexList = []
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

  visitedVertexList.push(firstCell);

  visitedMazeCells.add(firstCell);

  let keepTracker = [];

  keepTracker.push(firstCell);

  while (visitedMazeCells.size < gridSize) {
    const core = [...keepTracker].pop();
    //console.log(core);
    const neighboursOfCore = adjacencyListMaze.get(core);
    //console.log(neighboursOfCore);
    const randomPositionCell = getRandomKey(neighboursOfCore);
    const choosenCell = neighboursOfCore.get(randomPositionCell);

    visitedVertexList.push(choosenCell);
    keepTracker.push(choosenCell);

    let addedWall = wallsDestroyed(
      core,
      positionList,
      randomPositionCell,
      undefined,
      [...visitedVertexList]
    );

    if (visitedVertexList.includes(addedWall)) {
      wallsDestroyed(
        core,
        positionList,
        randomPositionCell,
        undefined,
        visitedVertexList
      );
    }

    if (!visitedMazeCells.has(choosenCell)) {
      visitedMazeCells.add(core);

      wallsDestroyed(
        core,
        positionList,
        randomPositionCell,
        undefined,
        visitedVertexList
      );
      visitedMazeCells.add(choosenCell);
    }
  }

  console.log(visitedVertexList);

  /*while (vertexList.size < gridSize) {
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
  }*/

  let spaceTime = 1;

  setTimeout(() => {
    visitedVertexList.map((node, nodeIdx) => {
      spaceTime++;

      setTimeout(() => {
        const htmlLink = document.getElementById(node.id).className;
        if (nodeIdx === 0) {
          document.getElementById(node.id).className = "leadvertex";
        } else {
          document.getElementById(visitedVertexList[nodeIdx - 1].id).className =
            "aldousbroder";
          document.getElementById(node.id).className = "leadvertex";
        }
        /* if (htmlLink === "aldousbroder") {
          document.getElementById(node.id).className =
            "aldousbroder afterpassage";
        } else {
          document.getElementById(node.id).className = "aldousbroder";
        }*/
      }, 5 * spaceTime);
    });
  }, 2000);
}
