import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function cellularMaze(
    nodes,
    visitedMazeCells = new Map(),
    visitedVertexList = new Set(),
    mazeRowSize,
    mazeColumnSize
) {
    let positionList = new Map();

    //adjacencyListCreation(nodes, positionList, adjacencyList, false);
    adjacencyListCreation(nodes, positionList);

    let adjacencyListMaze = new Map();

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

    adjacencyListCreationMaze(nodes, adjacencyListMaze);

    const gridSize = adjacencyListMaze.size;

    let currentRowSets = new Map();
    let nextRowSets = new Map();
    let downWardConnectedSets = new Map();

    let currentRowCount = 0;
    let currentColumnCount;

    /*adjacencyListMaze.forEach((voisins, node) => {
    //console.log(node.row);
    console.log(node.column);
  });*/

    //Initialize current row (First one dans ce cas)
    adjacencyListMaze.forEach((voisins, node) => {
        if (node.row === currentRowCount) {
            currentRowSets.set(node, node.id);
        }
    });

    while (currentRowCount < mazeRowSize - 1) {
        currentColumnCount = 0;
        nextRowSets = new Map();
        const currentRowKeys = [...currentRowSets.keys()];
        downWardConnectedSets = new Map();

        for (const [node, nodeId] of currentRowSets) {
            const adjacentNode = currentRowKeys[currentColumnCount + 1];
            const adjacentNodeId = currentRowSets.get(adjacentNode);

            if (nodeId !== adjacentNodeId) {
                if (fiftyFiftyDecision()) {
                    //currentRowSets.set(adjacentNode, nodeId);
                    currentRowSets.forEach((currentNodeId, currentNode) => {
                        if (currentNodeId === adjacentNodeId) {
                            currentRowSets.set(currentNode, nodeId);
                        }
                    });
                    visitedMazeCells.set(node, null);
                    wallsDestroyed(
                        node,
                        positionList,
                        "east",
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        visitedMazeCells
                    );
                    visitedMazeCells.set(adjacentNode, null);

                    //ICI FAIRE LA CONNEXTION #WALLSDESTROYED
                }
            }

            currentColumnCount++;
            if (currentColumnCount === currentRowKeys.length - 1) {
                break;
            }
        }

        //Initialize next row
        adjacencyListMaze.forEach((voisins, node) => {
            if (node.row === currentRowCount + 2) {
                nextRowSets.set(node, node.id);
            }
        });

        currentRowSets.forEach((nodeId, node) => {
            let FrequencyOfset = downWardConnectedSets.get(nodeId);
            // console.log(FrequencyOfset);
            downWardConnectedSets.set(
                nodeId,
                FrequencyOfset === undefined ? 1 : FrequencyOfset + 1
            );
        });

        downWardConnectedSets.forEach((frequencyOfset, nodeId) => {
            let numberOfConnections = 0;
            frequencyOfset = atLeastOneConnection(frequencyOfset);
            for (const [currentNode, currentNodeId] of currentRowSets) {
                if (
                    currentNodeId === nodeId &&
                    numberOfConnections < frequencyOfset
                ) {
                    for (const [nextNode, nextNodeId] of nextRowSets) {
                        if (nextNode.column === currentNode.column) {
                            nextRowSets.set(nextNode, currentNodeId);
                            visitedMazeCells.set(currentNode, null);
                            wallsDestroyed(
                                currentNode,
                                positionList,
                                "south",
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                visitedMazeCells
                            );
                            visitedMazeCells.set(nextNode, null);
                            break;
                        }
                    }
                    numberOfConnections++;
                }
                if (numberOfConnections === frequencyOfset) {
                    break;
                }
            }
        });

        // console.log(downWardConnectedSets);
        //console.log(nextRowSets);

        currentRowSets = nextRowSets;

        currentRowCount += 2;
    }

    // La derniere row n'est pas assujeté au hasard
    const currentRowKeys = [...currentRowSets.keys()];
    currentColumnCount = 0;
    for (const [node, nodeId] of currentRowSets) {
        const adjacentNode = currentRowKeys[currentColumnCount + 1];
        const adjacentNodeId = currentRowSets.get(adjacentNode);

        if (nodeId !== adjacentNodeId) {
            //currentRowSets.set(adjacentNode, nodeId);
            currentRowSets.forEach((currentNodeId, currentNode) => {
                if (currentNodeId === adjacentNodeId) {
                    currentRowSets.set(currentNode, nodeId);
                }
            });
            visitedMazeCells.set(node, null);
            wallsDestroyed(
                node,
                positionList,
                "east",
                undefined,
                undefined,
                undefined,
                undefined,
                visitedMazeCells
            );
            visitedMazeCells.set(adjacentNode, null);
            //ICI FAIRE LA CONNEXTION #WALLSDESTROYED
        }

        currentColumnCount++;
        if (currentColumnCount === currentRowKeys.length - 1) {
            break;
        }
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

    console.log(currentRowSets);

    let spaceTime = 0;

    setTimeout(() => {
        visitedMazeCells.forEach((previousNode, node, idx) => {
            spaceTime++;

            setTimeout(() => {
                const htmlLink = document.getElementById(node.id).className;

                document.getElementById(previousNode.id).className = "eller";
                document.getElementById(node.id).className = "leadvertex";

                /*console.log("PREVIOUS : ");
        console.log(
          "row : " + previousNode.row + "| col : " + previousNode.column
        );
        console.log("NODE : ");
        console.log("row : " + node.row + "| col : " + node.column);*/
            }, 35 * spaceTime);
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
