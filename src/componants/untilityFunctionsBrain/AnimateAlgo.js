import {
  BFS,
  DFS,
  dijkstra,
  aStar,
  classicGreedy,
  greedyBFS,
  bellmanFord,
} from "../searchAlgorithms/MainAlgorithmsList";

import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import animateShortestPath from "../untilityFunctionsBrain/AnimateShortestPath";

export default function animateAlgo(
  algorithmName,
  nodes,
  heuristicFunction,
  withDiagonals = false,
  visitedSpeed = 10,
  shortPathSpeed = 50
) {
  const visitedSet = new Set();

  const shortPath = new Set(); // Va contenir les noeuds du chemin le plus rapide

  let positionList = new Map();

  let adjacencyList = new Map();

  let knightRow, knightCol, princessRow, princessCol;

  nodes.map((node, nodeIdx) => {
    const htmlLink = document.getElementById(node.id).className;
    if (htmlLink.includes("start")) {
      knightRow = node.row;
      knightCol = node.column;
    }
    if (htmlLink.includes("end")) {
      princessRow = node.row;
      princessCol = node.column;
    }
  });

  adjacencyListCreation(nodes, positionList, adjacencyList, withDiagonals);

  if (heuristicFunction !== undefined) {
    //console.log(heuristicFunction.name);
    //console.log("With heuristics");
    aStar(
      [knightRow, knightCol],
      [princessRow, princessCol],
      visitedSet,
      adjacencyList,
      positionList,
      shortPath,
      heuristicFunction
    );
  } else {
    //console.log("No heuristics");
    algorithmName(
      [knightRow, knightCol],
      [princessRow, princessCol],
      visitedSet,
      adjacencyList,
      positionList,
      shortPath
    );
  }

  let spaceTime = 1;
  visitedSet.forEach((node) => {
    spaceTime++;
    const htmlLink = document.getElementById(node.id).className;
    setTimeout(() => {
      if (htmlLink.includes("weight")) {
        document.getElementById(node.id).className = "item-visited weight";
      } else if (htmlLink.includes("start")) {
        document.getElementById(node.id).className = "item-visited start";
      } else if (htmlLink.includes("end")) {
        document.getElementById(node.id).className = "item-visited end";
      } else if (htmlLink.includes("shortcut")) {
        document.getElementById(node.id).className = "item-visited shortcut";
      } else {
        document.getElementById(node.id).className = "item-visited";
      }
    }, visitedSpeed * spaceTime);
  });

  setTimeout(() => {
    animateShortestPath(shortPath, shortPathSpeed);
  }, visitedSpeed * spaceTime);

  const shortPathTimeLength = (shortPath.size + 1) * shortPathSpeed + 1500;
  const visitedTimeLength = spaceTime * visitedSpeed;
  const totalTimeLength = visitedTimeLength + shortPathTimeLength;

  return totalTimeLength;
}
