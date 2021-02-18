import React from "react";
import AdjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

//Dans ce fichier on a la version recursive et une version hybride pour l'exploration du graph
// A AJOUTER

export default function DFS(
  start,
  end,
  visitedSet = new Set(),
  adjacencyList = new Map(),
  positionList = new Map(),
  shortPath = new Set()
) {
  const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node

  const last = positionList.get(JSON.stringify([end[0], end[1]]))[1];

  let stack = [first];

  DFSR(first, visitedSet, adjacencyList, last);

  while (stack.length > 0) {
    const priorityQ = stack.pop();

    if (!visitedSet.has(priorityQ)) {
      visitedSet.add(priorityQ);
      if (priorityQ === last) {
        Array.from(visitedSet).map((element) => {
          shortPath.add(element);
        });

        return;
      }
    }

    /*const neighboursOfNode = adjacencyList.get(priorityQ);

    for (const node of neighboursOfNode) {
      if (!visitedSet.has(node)) {
        stack.push(node);
      }
    }
  }*/
  }
}

const DFSR = (node, visitedSet, adjacencyList, last) => {
  if (visitedSet.has(node)) return;
  visitedSet.add(node);

  const neighboursOfNode = adjacencyList.get(node);

  for (const neighbour of neighboursOfNode) {
    if (neighbour === last) return;
    DFSR(neighbour, visitedSet, adjacencyList);
  }
};

const DFSR = (node, visitedSet) => {
  if (visitedSet.has(node)) return;
  visitedSet.add(node);

  const neighboursOfNode = adjacencyList.get(node);

  for (const neighbour of neighboursOfNode) {
    DFSR = (node, visitedSet);
  }
};

/* import React from "react";
import AdjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

export default function DFS(
  start,
  end,
  visitedSet = new Set(),
  adjacencyList = new Map(),
  positionList = new Map(),
  shortPath = new Set()
) {
  const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node

  const last = positionList.get(JSON.stringify([end[0], end[1]]))[1];

  let stack = [first];

  while (stack.length > 0) {
    const priorityQ = stack.pop();

    if (!visitedSet.has(priorityQ)) {
      visitedSet.add(priorityQ);
      if (priorityQ === last) {
        Array.from(visitedSet).map((element) => {
          shortPath.add(element);
        });

        return;
      }
    }

    const neighboursOfNode = adjacencyList.get(priorityQ);

    for (const node of neighboursOfNode) {
      if (!visitedSet.has(node)) {
        stack.push(node);
      }
    }
  }
}
*/
