import {
    BFS,
    DFS,
    dijkstra,
    aStar,
    classicGreedy,
    greedyBFS,
    bellmanFord,
    IDDFS,
    IDA,
} from "../searchAlgorithms/MainAlgorithmsList";

import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import animateShortestPath from "../untilityFunctionsBrain/AnimateShortestPath";

import pathTracking from "../untilityFunctionsBrain/PathTracking";

export default function animateIDAlgo(
    algorithmName,
    nodes,
    heuristicFunction,
    withDiagonals = false,
    informationPackage = [],
    visitedSpeed = 400,
    shortPathSpeed = 50,
    resetSpeed = 350
) {
    const visitedSet = new Set();

    const shortPath = new Set(); // Va contenir les noeuds du chemin le plus rapide

    const newThresholdVertices = new Map();

    let positionList = new Map();

    let adjacencyList = new Map();

    let knightRow, knightCol, princessRow, princessCol;

    // For the information package IDDFS and IDA
    let totalPathCost, lastDepthLevel, lastThreshold, thresholdCount;

    nodes.map((node, nodeIdx) => {
        const htmlLink = document.getElementById(node.id).className;
        if (htmlLink.includes("start")) {
            knightRow = node.row;
            knightCol = node.column;
        }
        if (htmlLink.includes("end")) {
            princessRow = node.row;
            princessCol = node.column;
        }
    });

    adjacencyListCreation(nodes, positionList, adjacencyList, withDiagonals);

    if (algorithmName === IDA) {
        algorithmName(
            [knightRow, knightCol],
            [princessRow, princessCol],
            heuristicFunction,
            newThresholdVertices,
            visitedSet,
            adjacencyList,
            positionList,
            shortPath
        );
    } else {
        algorithmName(
            [knightRow, knightCol],
            [princessRow, princessCol],
            newThresholdVertices,
            visitedSet,
            adjacencyList,
            positionList,
            shortPath
        );
    }

    let spaceTime = 1;
    let lastTresholdTracker = 0;
    newThresholdVertices.forEach((level, verticesSet) => {
        // level = depthLevel in IDDFS or tresholdValue in IDA*
        spaceTime++;
        setTimeout(() => {
            verticesSet.forEach((node) => {
                spaceTime++;
                const htmlLink = document.getElementById(node.id).className;
                // setTimeout(() => {
                if (htmlLink.includes("weight")) {
                    document.getElementById(node.id).className =
                        "revisited weight";
                } else if (htmlLink.includes("start")) {
                    document.getElementById(node.id).className =
                        "revisited start";
                } else if (htmlLink.includes("end")) {
                    document.getElementById(node.id).className =
                        "revisited end";
                } else if (htmlLink.includes("shortcut")) {
                    document.getElementById(node.id).className =
                        "revisited shortcut";
                } else {
                    document.getElementById(node.id).className = "revisited";
                }
                // }, 0 * spaceTime);
            });

            setTimeout(() => {
                if (lastTresholdTracker !== newThresholdVertices.size - 1) {
                    fastReset(verticesSet);
                    // Dans les deux cas : IDA et IDDFS
                } else {
                    verticesSet.forEach((node) => {
                        const htmlLink = document.getElementById(node.id)
                            .className;
                        // setTimeout(() => {
                        if (htmlLink.includes("weight")) {
                            document.getElementById(node.id).className =
                                "revisited weight";
                        } else if (htmlLink.includes("start")) {
                            document.getElementById(node.id).className =
                                "revisited start";
                        } else if (htmlLink.includes("end")) {
                            document.getElementById(node.id).className =
                                "revisited end";
                        } else if (htmlLink.includes("shortcut")) {
                            document.getElementById(node.id).className =
                                "revisited shortcut";
                        } else {
                            document.getElementById(node.id).className =
                                "revisited";
                        }
                        // }, 0 * spaceTime);
                    });
                }
                lastTresholdTracker++;
            }, resetSpeed);
        }, visitedSpeed * spaceTime);
    });

    setTimeout(() => {
        animateShortestPath(shortPath, shortPathSpeed);
    }, visitedSpeed * spaceTime + 1000);

    // Determiner la distance total du path
    visitedSet.forEach((node) => {
        const htmlLink = document.getElementById(node.id).className;
        if (htmlLink.includes("end")) {
            // On prends la distance total a la fin de chaque algo
            totalPathCost = node.totalDistance;
        }
    });

    //Determiner lastTreshold et lastDepthLevel
    let levelCount = 0;
    newThresholdVertices.forEach((level, verticesSet) => {
        if (levelCount === newThresholdVertices.size - 1) {
            console.log(level);
            lastThreshold = level;
            lastDepthLevel = level;
        }
        levelCount++;
    });

    ///////////////////Information Package///////////////////////
    informationPackage[0] = totalPathCost;
    if (algorithmName === IDA) {
        thresholdCount = newThresholdVertices.size;
        //  console.log(thresholdCount);
        informationPackage[1] = lastThreshold;
        informationPackage[2] = thresholdCount;
    } else {
        informationPackage[1] = lastDepthLevel;
    }

    ///////////////////////////////////////////////////////////////

    //Trouver une meilleur methode pour tracer les chemin
    //  pathTracking(shortPath, visitedSpeed, spaceTime, shortPathSpeed);

    const shortPathTimeLength = (shortPath.size + 1) * shortPathSpeed + 1500;
    const visitedTimeLength = spaceTime * visitedSpeed;
    const totalTimeLength = visitedTimeLength + shortPathTimeLength + 1000;

    console.log(totalTimeLength / 1000);

    return totalTimeLength;
}

const fastReset = (verticesSet) => {
    verticesSet.forEach((node) => {
        const htmlLink = document.getElementById(node.id).className;
        if (htmlLink === "revisited") {
            document.getElementById(node.id).className = "item";
        } else if (htmlLink.includes("weight")) {
            document.getElementById(node.id).className = "item-weight";
        } else if (htmlLink.includes("start")) {
            document.getElementById(node.id).className = "item-start";
        } else if (htmlLink.includes("end")) {
            document.getElementById(node.id).className = "item-end";
        } else if (htmlLink.includes("shortcut")) {
            document.getElementById(node.id).className = "item-shortcut";
        }
    });
};
