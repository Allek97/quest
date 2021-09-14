import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function growingTreeMaze(nodes, visitedMazeCells = new Set()) {
    //const shortPath = new Set(); // Va contenir les noeuds du chemin le plus rapide

    let positionList = new Map();

    adjacencyListCreation(nodes, positionList);

    let adjacencyListMaze = new Map();

    let visitedSet = new Map();

    let knightRow, knightCol, princessRow, princessCol;

    nodes.map((node, nodeIdx) => {
        if (node.isStart) {
            knightRow = node.row;
            knightCol = node.column;
        }
        if (node.isEnd) {
            princessRow = node.row;
            princessCol = node.column;
        }
    });

    //adjacencyListCreation(nodes, positionList, adjacencyList, false);
    adjacencyListCreationMaze(nodes, adjacencyListMaze);

    const gridSize = adjacencyListMaze.size;

    let vertexList = new Set();

    let keepTrackVisited = new Set();

    const firstCell = getRandomKey(adjacencyListMaze);

    vertexList.add(firstCell);

    visitedMazeCells.add(firstCell);

    keepTrackVisited.add(firstCell);

    while (vertexList.size > 0) {
        const core = getRandomKey(vertexList);
        const neighboursOfCore = adjacencyListMaze.get(core);
        let visitedCount = 0;

        neighboursOfCore.forEach((node, position) => {
            if (!keepTrackVisited.has(node)) {
                visitedCount++;
            }
        });

        if (visitedCount === 0) {
            vertexList.delete(core);
        } else {
            let unvisitedNeighbours = new Map();
            neighboursOfCore.forEach((node, position) => {
                if (!keepTrackVisited.has(node)) {
                    unvisitedNeighbours.set(position, node);
                }
            });
            const randomPositionCell = getRandomKey(unvisitedNeighbours);
            const choosenCell = unvisitedNeighbours.get(randomPositionCell);

            vertexList.add(choosenCell);

            keepTrackVisited.add(choosenCell);

            visitedMazeCells.add(core);
            wallsDestroyed(
                core,
                positionList,
                randomPositionCell,
                visitedMazeCells
            );
            visitedMazeCells.add(choosenCell);
        }
    }

    let spaceTime = 1;

    setTimeout(() => {
        visitedMazeCells.forEach((node) => {
            spaceTime++;
            //console.log(node);
            const htmlLink = document.getElementById(node.id).className;
            setTimeout(() => {
                document.getElementById(node.id).className =
                    "item--animation growingtree";
            }, 15 * spaceTime);
        });
    }, 2000);
}
