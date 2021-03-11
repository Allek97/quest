import React from "react";
import adjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

import manhattanDistance from "./utilitityFunctions/heuristics/ManhattanDistance";
import euclidienDistance from "./utilitityFunctions/heuristics/EuclidienDistance";
import diagonalDistance from "./utilitityFunctions/heuristics/DiagonalDistance";

export default function IDDFS(
    start,
    end,
    heuristicFunction,
    //Will store all the nodes at every new threshold cutoff
    // key = vertices and value = f cutoff
    newThresholdVertices = new Map(),
    visitedSet = new Set(),
    adjacencyList = new Map(),
    positionList = new Map(),
    shortPath = new Set()
) {
    const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node
    const last = positionList.get(JSON.stringify([end[0], end[1]]))[1];

    //This will keep an eye on the f value of each node for the trashhold cut-off
    // key = node and value = fvalue
    let verticesFValue = new Set();

    first.previousNode = first;
    const heuristicFirst = heuristicFunction(first, last);
    first.totalDistance = 0;
    first.heuristic = heuristicFirst;

    // Keep track of the already visited vertices to avoid useless memory space and loops/cycles
    let visitedVertices = new Set();

    // f = g + h
    let threshold = heuristicFirst + first.totalDistance;
    //let threshold = Infinity;
    // Initialize our visitedSet with the start value
    visitedSet.add(first);

    // Cycles maximum d'exploration si last n'est pas atteignable
    let cycleLevel = 0;
    const maxCycle = 10000;

    // Set of nodes for every newThreshold
    let thresholdVertices = new Set();

    while (!visitedSet.has(last) && cycleLevel < maxCycle) {
        let frontier = [];
        frontier.push(first);
        //This will keep an eye on the order on which nodes are removed from the frontier
        // key = node and value = depth level
        verticesFValue.clear();
        verticesFValue.add(heuristicFirst);

        // This will keep track of visited nodes after each new Depth level
        visitedVertices.clear();
        visitedVertices.add(first);

        thresholdVertices = new Set();

        // console.log("threshold : " + threshold);

        while (frontier.length > 0) {
            /* console.log(
                "/////////////////////////////////////////////////////////"
            );*/
            //console.log(frontier[0]);
            const currentNode = frontier.shift();
            visitedSet.add(currentNode);
            visitedVertices.add(currentNode);
            thresholdVertices.add(currentNode);

            let currentNodeFValue =
                currentNode.totalDistance + currentNode.heuristic;

            /* console.log(currentNode);
            console.log("currentNodeFValue : " + currentNodeFValue);
            console.log("threshhold : " + threshold);*/

            if (currentNode.id === last.id) {
                visitedVertices.add(currentNode);
                visitedSet.add(currentNode);
                break;
            }

            if (currentNodeFValue <= threshold) {
                //Sort neighbours from smallest to biggest FValue
                const neighbourOfNode = adjacencyList.get(currentNode);
                let neighboursFValues = new Map();
                neighbourOfNode.map((neighbour) => {
                    if (!visitedVertices.has(neighbour)) {
                        const heuristicNeighbour = heuristicFunction(
                            neighbour,
                            last
                        );

                        const newDistance =
                            currentNode.totalDistance + neighbour.weight;

                        neighbour.totalDistance = newDistance;
                        neighbour.heuristic = heuristicNeighbour;

                        const neighbourFValue =
                            newDistance + heuristicNeighbour;

                        neighboursFValues.set(neighbour, neighbourFValue);
                    }
                });

                neighboursFValues = new Map(
                    [...neighboursFValues.entries()].sort((a, b) => a[1] - b[1])
                );

                //    console.log(neighboursFValues);

                let neighbourArray = [];
                neighboursFValues.forEach((neighbourFValue, neighbour) => {
                    if (!visitedVertices.has(neighbour)) {
                        neighbour.shortcutValue = neighbourFValue;
                        neighbourArray.push(neighbour);
                        verticesFValue.add(neighbourFValue);
                        neighbour.previousNode = currentNode;
                    }
                });
                frontier = neighbourArray.concat(frontier);
            }
            //console.log(verticesFValue);
        }
        newThresholdVertices.set(thresholdVertices, threshold);

        threshold = newThreshold(verticesFValue, threshold);

        //  console.log("NEW THRESHHOLD : " + threshold);
        /* console.log(
            "/////////////////////////////////////////////////////////"
        );*/

        cycleLevel++;
    }
    // console.log(cycleLevel);

    if (cycleLevel === maxCycle && !visitedSet.has(last)) {
        return;
    }

    let tempNode = last;

    while (!tempNode.isStart) {
        shortPath.add(tempNode);
        tempNode = tempNode.previousNode;
        if (tempNode === null) {
            return;
        }
    }
    shortPath.add(first);

    let reversedPath = Array.from(shortPath).reverse();
    shortPath.clear();

    reversedPath.map((element, elementIdx) => {
        shortPath.add(element);
    });
}

const newThreshold = (yourSet, oldThreshhold) => {
    let valuesSet = [...yourSet.keys()];

    valuesSet = valuesSet.filter((value) => value > oldThreshhold);

    // console.log(`my valueSet is ${valuesSet}`);

    const minValue = Math.min(...valuesSet);

    //console.log(`my minvalue in valueSet is ${minValue}`);

    return minValue;
};

const neighbourWithSmallestDistance = (neighboursOfNode) => {
    let min = Infinity;
    let choosenNeighbour;

    let minNeighbour = [];

    neighboursOfNode.map((neighbour) => {
        if (neighbour.totalDistance < min) {
            min = neighbour.totalDistance;
            minNeighbour.push(neighbour);
        }
    });

    return minNeighbour.pop();
};

/*const neighbourWithSmallestDepth = (neighboursOfNode, verticesDepth) => {
    let neighboursDepth = new Map();
    neighboursOfNode.map((neighbour) => {
        const depth = verticesDepth.get(neighbour);
        neighboursDepth.set(neighbour, depth);
    });
    const minDepthNeighbour = minPQ(neighboursDepth);
    return minDepthNeighbour;
};*/
