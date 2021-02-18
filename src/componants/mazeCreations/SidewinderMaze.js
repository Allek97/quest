import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function sidewinderMaze(nodes, visitedMazeCells = new Map()) {
  let positionList = new Map();

  //adjacencyListCreation(nodes, positionList, adjacencyList, false);
  adjacencyListCreation(nodes, positionList);

  let adjacencyListMaze = new Map();

  adjacencyListCreationMaze(nodes, adjacencyListMaze);

  const gridSize = adjacencyListMaze.size;

  // First row, everything is carved #autoroute
  adjacencyListMaze.forEach((voisins, node) => {
    if (node.row === 0) {
      visitedMazeCells.set(node, null);
      wallsDestroyed(node, positionList, "east", ...Array(4), visitedMazeCells);
    }
  });

  let currentRow = 2;

  let currentRunSet = new Set();
  while (currentRow < gridSize) {
    adjacencyListMaze.forEach((voisins, node) => {
      const eastNeighbour = voisins.get("east");
      if (node.row === currentRow) {
        visitedMazeCells.set(node, null);
        currentRunSet.add(node);
        if (fiftyFiftyDecision() && eastNeighbour !== undefined) {
          visitedMazeCells.set(node, null);
          currentRunSet.add(node);
          wallsDestroyed(
            node,
            positionList,
            "east",
            ...Array(4),
            visitedMazeCells
          );
          if (eastNeighbour !== undefined) {
            visitedMazeCells.set(eastNeighbour, null);
            currentRunSet.add(eastNeighbour);
          }
        } else {
          console.log(currentRunSet);
          const choosenCellToCarveNorth = getRandomKey(currentRunSet);
          wallsDestroyed(
            choosenCellToCarveNorth,
            positionList,
            "north",
            ...Array(4),
            visitedMazeCells
          );
          currentRunSet = new Set();
        }
      }
    });

    currentRow += 2;
  }

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

  let spaceTime = 0;

  setTimeout(() => {
    visitedMazeCells.forEach((previousNode, node) => {
      spaceTime++;

      setTimeout(() => {
        const htmlLink = document.getElementById(node.id).className;

        document.getElementById(previousNode.id).className = "eller";
        document.getElementById(node.id).className = "leadvertex";

        /*console.log("PREVIOUS : ");
        console.log(
          "row : " + previousNode.row + "| col : " + previousNode.column
        );
        console.log("NODE : ");
        console.log("row : " + node.row + "| col : " + node.column);*/
      }, 10 * spaceTime);
    });
  }, 2000);
}

const fiftyFiftyDecision = () => {
  const randomNumber = Math.random();
  const decision = randomNumber < 0.5 ? true : false;
  return decision;
};

const atLeastOneConnection = (setLength) => {
  return Math.floor(Math.random() * setLength) + 1;
};
