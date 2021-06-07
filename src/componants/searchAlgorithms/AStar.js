import React from "react";
import adjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

import manhattanDistance from "./utilitityFunctions/heuristics/ManhattanDistance";
import euclidienDistance from "./utilitityFunctions/heuristics/EuclidienDistance";
import diagonalDistance from "./utilitityFunctions/heuristics/DiagonalDistance";

export default function aStar(
    start,
    end,
    visitedSet = new Set(), // Element visités
    adjacencyList = new Map(),
    positionList = new Map(),
    shortPath = new Set(),
    heuristicFunction = manhattanDistance
) {
    const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node
    const last = positionList.get(JSON.stringify([end[0], end[1]]))[1]; //end node

    let priorityQ = new Map(); // Va contenir notre minPQ

    //On met le premier node start dans le visitedSet
    first.previousNode = first;
    first.totalDistance = 0;
    first.heuristic = 0;
    visitedSet.add(first);

    while (!visitedSet.has(last)) {
        const core = Array.from(visitedSet).pop();
        const neighboursOfCore = adjacencyList.get(core);

        for (const neighbour of neighboursOfCore) {
            if (!visitedSet.has(neighbour)) {
                if (!priorityQ.has(neighbour)) {
                    const heuristicNeighbour = heuristicFunction(
                        neighbour,
                        last
                    );
                    const newDistance = core.totalDistance + neighbour.weight;
                    const f = newDistance + heuristicNeighbour; // F = G + H

                    neighbour.previousNode = core;
                    neighbour.totalDistance = newDistance;
                    neighbour.heuristic = heuristicNeighbour;
                    priorityQ.set(neighbour, f); // Dans AStar F va differencier les noeuds prioritaires
                } else {
                    const newDistance = core.totalDistance + neighbour.weight;

                    const f = newDistance + neighbour.heuristic; // F = G + H

                    const distanceInPQ = priorityQ.get(neighbour);

                    if (f < distanceInPQ) {
                        neighbour.previousNode = core;
                        neighbour.totalDistance = newDistance;
                        priorityQ.set(neighbour, f);
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
