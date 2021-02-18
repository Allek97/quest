import React from "react";
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

  let backTrackStack = [first];

  //DFSR(first, visitedSet, adjacencyList, last);
  visitedSet.add(first);
  backTrackStack.push(first);

  while (!visitedSet.has(last)) {
    const core = Array.from(visitedSet).shift();
    const neighboursOfCore = adjacencyList.get(core);
    let deadEndCount = 0;

    neighboursOfCore.map((neighbour) => {
      if (!visitedSet.has(neighbour)) {
        deadEndCount++;
      }
    });

    if (deadEndCount === 0) {
      let noSolutionCount = 0;
      for (var i = backTrackStack.length - 1; i >= 0; i--) {
        let deadEndCountBackTrack = 0;
        const neighboursOfStackNode = adjacencyList.get(backTrackStack[i]);

        neighboursOfStackNode.map((neighbour) => {
          if (!visitedSet.has(neighbour)) {
            deadEndCountBackTrack++;
          }
        });
        if (deadEndCountBackTrack !== 0) {
          for (const neighbour of neighboursOfStackNode) {
            if (!visitedSet.has(neighbour)) {
              neighbour.previousNode = backTrackStack[i];
              visitedSet.add(neighbour);
              backTrackStack.push(neighbour);
              noSolutionCount++;
            }
          }
          break;
        }
      }
      if (noSolutionCount === 0) {
        return;
      }
    }

    for (const neighbour of neighboursOfCore) {
      if (!visitedSet.has(neighbour)) {
        neighbour.previousNode = core;
        visitedSet.add(neighbour);
        backTrackStack.push(neighbour);
      }
    }
  }

  let tempNode = last;

  console.log(last.previousNode);

  while (!tempNode.isStart) {
    shortPath.add(tempNode);
    tempNode = tempNode.previousNode;
    console.log("dilio");
  }
  shortPath.add(first);

  let reversedPath = Array.from(shortPath).reverse();
  shortPath.clear();

  reversedPath.map((element, elementIdx) => {
    shortPath.add(element);
  });
}

/*while (stack.length > 0) {
    const priorityQ = stack.pop();

    if (!visitedSet.has(priorityQ)) {
      visitedSet.add(priorityQ);
      if (priorityQ === last) {
        Array.from(visitedSet).map((element) => {
          shortPath.add(element);
        });

        return;
      }
    }*/

/*const neighboursOfNode = adjacencyList.get(priorityQ);

    for (const node of neighboursOfNode) {
      if (!visitedSet.has(node)) {
        stack.push(node);
      }
    }
  }*/
//}
//}

const DFSR = (node, visitedSet, adjacencyList, last) => {
  if (visitedSet.has(node)) return;
  visitedSet.add(node);

  const neighboursOfNode = adjacencyList.get(node);

  for (const neighbour of neighboursOfNode) {
    neighbour.previousNode = node;
    DFSR(neighbour, visitedSet, adjacencyList);
  }
};
