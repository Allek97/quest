import React from "react";
import adjacencyListCreation from "./utilitityFunctions/AdjacencyListCreation";
import minPQ from "./utilitityFunctions/MinPQ";

export default function IDDFS(
    start,
    end,
    //Will store all the nodes at every new depth level
    // key = vertices and value = depth level
    newThresholdVertices = new Map(),
    visitedSet = new Set(),
    adjacencyList = new Map(),
    positionList = new Map(),
    shortPath = new Set()
) {
    const first = positionList.get(JSON.stringify([start[0], start[1]]))[1]; //start node
    const last = positionList.get(JSON.stringify([end[0], end[1]]))[1];

    let depthLevel = 0;
    let maxDepth = 1800;

    //This will keep an eye on the order on which nodes are removed from the frontier
    // key = node and value = depth level
    let verticesDepth = new Map();

    first.previousNode = first;
    let visitedVertices = new Set();

    visitedSet.add(first);
    first.totalDistance = 0;

    // Set of nodes for every depthLevel
    let depthLevelVertices = new Set();

    while (!visitedSet.has(last) && depthLevel < maxDepth) {
        let frontier = [];
        frontier.push(first);
        //This will keep an eye on the order on which nodes are removed from the frontier
        // key = node and value = depth level
        verticesDepth.clear();
        verticesDepth.set(first, 0);

        // This will keep track of visited nodes after each new Depth level
        visitedVertices.clear();
        visitedVertices.add(first);

        depthLevelVertices = new Set();

        while (frontier.length > 0) {
            const currentNode = frontier.shift();
            //  console.log(currentNode.id);
            visitedSet.add(currentNode);
            visitedVertices.add(currentNode);
            depthLevelVertices.add(currentNode);
            let currentNodeDepth = verticesDepth.get(currentNode);
            currentNode.weight = currentNodeDepth;

            if (currentNode.id === last.id) {
                visitedVertices.add(currentNode);
                visitedSet.add(currentNode);
                verticesDepth.set(currentNode, currentNodeDepth);
                break;
            }
            if (currentNodeDepth < depthLevel) {
                const neighbourOfNode = adjacencyList.get(currentNode);
                let neighbourArray = [];
                neighbourOfNode.map((neighbour) => {
                    if (!visitedVertices.has(neighbour)) {
                        neighbour.weight = currentNode + 1;
                        neighbourArray.push(neighbour);
                        verticesDepth.set(neighbour, currentNodeDepth + 1);
                    }
                });
                frontier = neighbourArray.concat(frontier);
            }
        }
        newThresholdVertices.set(depthLevelVertices, depthLevel);
        console.log("depth level :" + depthLevel);
        depthLevel++;
    }

    if (depthLevel === maxDepth && !visitedSet.has(last)) {
        return;
    }

    let tempNode = last;

    shortPath.add(tempNode);
    while (!shortPath.has(first)) {
        const neighboursOfNode = adjacencyList.get(tempNode);
        tempNode = neighbourWithSmallestDepth(neighboursOfNode, verticesDepth);
        shortPath.add(tempNode);
    }

    let reversedPath = Array.from(shortPath).reverse();
    // On capture la total distance du final Path
    const totalDistance = shortPath.size - 1;
    shortPath.clear();

    reversedPath.map((element, elementIdx) => {
        if (element.id === last.id) {
            last.totalDistance = totalDistance;
        }
        shortPath.add(element);
    });
}
// Nos fontions

const neighbourWithSmallestDepth = (neighboursOfNode, verticesDepth) => {
    let neighboursDepth = new Map();
    neighboursOfNode.map((neighbour) => {
        const depth = verticesDepth.get(neighbour);
        neighboursDepth.set(neighbour, depth);
    });
    const minDepthNeighbour = minPQ(neighboursDepth);
    return minDepthNeighbour;
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
