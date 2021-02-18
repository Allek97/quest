import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function backtrackingMaze(nodes, visitedMazeCells = new Set()) {
  //const shortPath = new Set(); // Va contenir les noeuds du chemin le plus rapide

  let positionList = new Map();

  adjacencyListCreation(nodes, positionList);

  let adjacencyListMaze = new Map();

  let visitedSet = new Map();

  //adjacencyListCreation(nodes, positionList, adjacencyList, false);
  adjacencyListCreationMaze(nodes, adjacencyListMaze);

  const gridSize = adjacencyListMaze.size;

  let nbVisitedCells = 0;

  let mazeStack = []; // Notre stack de "cell" pour backtrack en cas de cul-de-sac

  const first = positionList.get(JSON.stringify([0, 0]))[1];

  visitedSet.set(first, "base");

  mazeStack.push(first);

  let randomPosition = [];

  while (nbVisitedCells < gridSize - 1) {
    const core = Array.from(visitedSet.keys()).pop();
    const neighboursOfCore = adjacencyListMaze.get(core);

    visitedMazeCells.add(core);

    neighboursOfCore.forEach((neighbour, position) => {
      if (!visitedSet.has(neighbour)) {
        randomPosition.push(position);
      }
    });

    if (randomPosition.length === 0) {
      for (var i = mazeStack.length - 1; i >= 0; i--) {
        const neighboursOfStackCell = adjacencyListMaze.get(mazeStack[i]);

        neighboursOfStackCell.forEach((neighbour, position) => {
          if (!visitedSet.has(neighbour)) {
            randomPosition.push(position);
          }
        });

        if (randomPosition.length !== 0) {
          var randomNumber = Math.floor(
            Math.random() * (randomPosition.length - 1 + 1)
          );

          const randomNeighbour = neighboursOfStackCell.get(
            randomPosition[randomNumber]
          );

          visitedSet.set(randomNeighbour, randomPosition[randomNumber]);

          mazeStack.push(randomNeighbour);

          wallsDestroyed(
            mazeStack[i],
            positionList,
            randomPosition[randomNumber],
            visitedMazeCells
          );

          visitedMazeCells.add(randomNeighbour);

          nbVisitedCells++;

          randomPosition = [];

          break;
        }
      }
    } else if (randomPosition.length !== 0) {
      var randomNumber = Math.floor(
        Math.random() * (randomPosition.length - 1 + 1)
      );

      const randomNeighbour = neighboursOfCore.get(
        randomPosition[randomNumber]
      );

      visitedSet.set(randomNeighbour, randomPosition[randomNumber]);

      mazeStack.push(randomNeighbour);

      wallsDestroyed(
        core,
        positionList,
        randomPosition[randomNumber],
        visitedMazeCells
      );

      visitedMazeCells.add(randomNeighbour);

      randomPosition = [];

      nbVisitedCells++;
    }
  }

  console.log(visitedMazeCells);

  let spaceTime = 1;

  setTimeout(() => {
    visitedMazeCells.forEach((node) => {
      spaceTime++;
      //console.log(node);
      const htmlLink = document.getElementById(node.id).className;
      setTimeout(() => {
        document.getElementById(node.id).className = "item--animation";
      }, 15 * spaceTime);
    });
  }, 2000);
}
