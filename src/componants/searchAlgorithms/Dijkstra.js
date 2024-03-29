import React from "react";
import AdjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

export default function dijkstra(
  start,
  end,
  visitedSet = new Set(), // Element visités
  adjacencyList = new Map(),
  positionList = new Map(),
  shortPath = new Set()
) {
  const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node
  const last = positionList.get(JSON.stringify([end[0], end[1]]))[1]; //start node

  let priorityQ = new Map(); // Va contenir notre minPQ

  //On me le premier node start dans le visitedSet
  first.previousNode = first;
  first.totalDistance = 0;
  visitedSet.add(first);

  while (!visitedSet.has(last)) {
    const core = Array.from(visitedSet).pop();
    const neighboursOfCore = adjacencyList.get(core);

    for (const neighbour of neighboursOfCore) {
      if (!visitedSet.has(neighbour)) {
        if (!priorityQ.has(neighbour)) {
          const newDistance = core.totalDistance + neighbour.weight;
          neighbour.previousNode = core;
          neighbour.totalDistance = newDistance;
          priorityQ.set(neighbour, newDistance);
        } else {
          const newDistance = core.totalDistance + neighbour.weight;

          const distanceInPQ = priorityQ.get(neighbour);

          if (newDistance < distanceInPQ) {
            neighbour.previousNode = core;
            neighbour.totalDistance = newDistance;
            priorityQ.set(neighbour, newDistance);
          }
        }
      }
    }
    const minNode = minPQ(priorityQ);

    if (minNode === undefined) {
      return;
    }

    visitedSet.add(minNode);

    priorityQ.delete(minNode);
  }

  let tempNode = Array.from(visitedSet).pop();

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
