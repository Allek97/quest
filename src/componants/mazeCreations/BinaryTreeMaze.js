import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function binaryTreeMaze(nodes, visitedMazeCells = new Map()) {
    let positionList = new Map();

    //adjacencyListCreation(nodes, positionList, adjacencyList, false);
    adjacencyListCreation(nodes, positionList);

    let adjacencyListMaze = new Map();

    adjacencyListCreationMaze(nodes, adjacencyListMaze);

    const gridSize = adjacencyListMaze.size;

    let cellsTracking = new Set();

    adjacencyListMaze.forEach((voisins, node) => {
        cellsTracking.add(node);
    });

    // NorthWest Bias
    while (cellsTracking.size > 0) {
        const randomCoreCell = getRandomKey(cellsTracking);

        const voisins = adjacencyListMaze.get(randomCoreCell);

        let biasDirections = new Set();
        const westNeighbour = voisins.get("west");
        const northNeighour = voisins.get("north");

        visitedMazeCells.set(randomCoreCell, null);

        if (westNeighbour !== undefined) {
            biasDirections.add(westNeighbour);
        }
        if (northNeighour !== undefined) {
            biasDirections.add(northNeighour);
        }
        if (biasDirections.size !== 0) {
            const randomNeighbour = getRandomKey(biasDirections);
            if (westNeighbour !== undefined) {
                if (randomNeighbour.id === westNeighbour.id) {
                    wallsDestroyed(
                        randomCoreCell,
                        positionList,
                        "west",
                        ...Array(4),
                        visitedMazeCells
                    );
                }
            }
            if (northNeighour !== undefined) {
                if (randomNeighbour.id === northNeighour.id) {
                    wallsDestroyed(
                        randomCoreCell,
                        positionList,
                        "north",
                        ...Array(4),
                        visitedMazeCells
                    );
                }
            }
            visitedMazeCells.set(randomNeighbour, null);
        }
        cellsTracking.delete(randomCoreCell);
    }

    const visitedMazeCellsKeys = [...visitedMazeCells.keys()];
    let pairingCount = 0;

    visitedMazeCells.forEach((previousNode, node) => {
        if (pairingCount === 0) {
            visitedMazeCells.set(node, visitedMazeCellsKeys[0]);
        } else {
            visitedMazeCells.set(node, visitedMazeCellsKeys[pairingCount - 1]);
        }
        pairingCount++;
    });

    let spaceTime = 0;

    setTimeout(() => {
        visitedMazeCells.forEach((previousNode, node) => {
            spaceTime++;

            setTimeout(() => {
                const htmlLink = document.getElementById(node.id).className;

                document.getElementById(previousNode.id).className =
                    "binarytree";
                document.getElementById(node.id).className = "leadvertex";
            }, 5 * spaceTime);
        });
    }, 2000);
}

const fiftyFiftyDecision = () => {
    const randomNumber = Math.random();
    const decision = randomNumber < 0.5 ? true : false;
    return decision;
};

const atLeastOneConnection = (setLength) => {
    return Math.floor(Math.random() * setLength) + 1;
};
