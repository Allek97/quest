import React from "react";
import adjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

import manhattanDistance from "./utilitityFunctions/heuristics/ManhattanDistance";
import euclidienDistance from "./utilitityFunctions/heuristics/EuclidienDistance";
import diagonalDistance from "./utilitityFunctions/heuristics/DiagonalDistance";
import compareAdjacencyList from "./utilitityFunctions/CompareAdjacencyList";

export default function bellmanFord(
  start,
  end,
  adjacencyList = new Map(),
  positionList = new Map(),
  shortPath = new Set()
) {
  const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node
  const last = positionList.get(JSON.stringify([end[0], end[1]]))[1]; //start node

  //let priorityQ = new Map(); // Va contenir notre minPQ

  //On me le premier node start dans le visitedSet
  first.previousNode = first;
  first.totalDistance = 0;
  const maxRelaxations = adjacencyList.size;
  let nbRelaxations = 0;
  // visitedSet.add(first);

  while (nbRelaxations <= maxRelaxations) {
    let changeIndicator = 0;
    for (const [coreNode] of adjacencyList) {
      // console.log("row : ", coreNode.row + "|| col : ", coreNode.column);
      const neighboursOfCore = adjacencyList.get(coreNode);
      for (const neighbour of neighboursOfCore) {
        const newDistance = coreNode.totalDistance + neighbour.weight;
        if (newDistance < neighbour.totalDistance) {
          //console.log("infinite loop ? ");
          changeIndicator++;
          neighbour.totalDistance = newDistance;
          neighbour.previousNode = coreNode;
        }
      }
    }

    nbRelaxations++;

    if (changeIndicator === 0) {
      break;
    }
  }

  console.log(nbRelaxations);
  console.log(maxRelaxations);

  if (nbRelaxations >= maxRelaxations) {
    console.log("Infite cycle MY DUDE");
    return;
  }

  let tempNode = { ...last };

  console.log(last);

  let zob = 0;

  while (!tempNode.isStart) {
    shortPath.add(tempNode);
    tempNode = tempNode.previousNode;
  }

  shortPath.add(first);

  let reversedPath = Array.from(shortPath).reverse();
  shortPath.clear();

  reversedPath.map((element, elementIdx) => {
    shortPath.add(element);
  });
}

function getNodesByID(adjacencyList) {
  let myHash = new Map();

  adjacencyList.forEach((v, k) => {
    myHash.set(k.id, k);
  });

  return myHash;
}
