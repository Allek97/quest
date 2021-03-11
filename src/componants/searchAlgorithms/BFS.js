import React from "react";
import AdjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

export default function BFS(
    start,
    end,
    visitedSet = new Set(),
    adjacencyList = new Map(),
    positionList = new Map(),
    shortPath = new Set()
) {
    // start et end vont etre les coordonnes [x,y] du debut/fin

    let visited = new Map();

    const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node

    const last = positionList.get(JSON.stringify([end[0], end[1]]))[1]; //start node

    let queue = [first];

    let step = 0; // step pour trouver le chemin le plus rapide

    visited.set(first, 0); // node et la step

    // let visitedSet = new Set(); // contenir tous les nodes visités en ordre

    visitedSet.add(first);

    while (queue.length > 0) {
        const priorityQ = queue.shift();

        const neighboursOfNode = adjacencyList.get(priorityQ);

        step++;

        for (const node of neighboursOfNode) {
            if (!visited.has(node)) {
                queue.push(node);
                visited.set(node, step);
                visitedSet.add(node);
                if (node === last) {
                    shortestPathBFS(
                        start,
                        end,
                        visited,
                        adjacencyList,
                        positionList,
                        shortPath
                    );

                    return;
                }
            }
        }
    }
}

/* */

function shortestPathBFS(
    start,
    end,
    visited,
    adjacencyList,
    positionList,
    shortPath
) {
    const first = positionList.get(JSON.stringify([start[0], start[1]]))[1];

    const last = positionList.get(JSON.stringify([end[0], end[1]]))[1];

    let neighbour = adjacencyList.get(last);

    while (!shortPath.has(first)) {
        let minStepNeighbour = [""];
        let minStep = Infinity;

        for (const city of neighbour) {
            const stepCity = visited.get(city);
            if (stepCity < minStep) {
                minStepNeighbour.push(city);
                minStep = stepCity;
                minStepNeighbour.shift();
            }
        }
        shortPath.add(minStepNeighbour[0]);
        neighbour = adjacencyList.get(Array.from(shortPath).pop());
    }

    const lastSet = Array.from(shortPath).pop();

    let reversedPath = Array.from(shortPath).reverse();
    shortPath.clear();

    reversedPath.map((element, elementIdx) => {
        shortPath.add(element);
    });
    // Cas particulier pour BFS
    last.totalDistance = shortPath.size;
    shortPath.add(last);

    //Reverse the HashMap
}
