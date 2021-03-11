import {
    BFS,
    DFS,
    dijkstra,
    aStar,
    classicGreedy,
    greedyBFS,
    bellmanFord,
} from "../searchAlgorithms/MainAlgorithmsList";

import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import animateShortestPath from "../untilityFunctionsBrain/AnimateShortestPath";

export default function animateBellmanFord(
    nodes,
    withDiagonals = false,
    informationPackage,
    visitedSpeed = 6,
    shortPathSpeed = 50
) {
    const shortPath = new Set(); // Va contenir les noeuds du chemin le plus rapide

    let positionList = new Map();

    let adjacencyList = new Map();

    let knightRow, knightCol, princessRow, princessCol;

    // For the information package
    let totalPathCost, relaxationCount, negativeCycle;
    // Will have number of relaxation and if negative cycles have been detected
    let statusBF = [];

    nodes.map((node, nodeIdx) => {
        const htmlLink = document.getElementById(node.id).className;
        if (htmlLink.includes("start")) {
            knightRow = node.row;
            knightCol = node.column;
        } else if (htmlLink.includes("end")) {
            princessRow = node.row;
            princessCol = node.column;
        }
    });

    adjacencyListCreation(nodes, positionList, adjacencyList, withDiagonals);

    bellmanFord(
        [knightRow, knightCol],
        [princessRow, princessCol],
        adjacencyList,
        positionList,
        shortPath,
        statusBF
    );
    let spaceTime = 1;
    adjacencyList.forEach((v, node) => {
        spaceTime++;
        const htmlLink = document.getElementById(node.id).className;
        setTimeout(() => {
            if (htmlLink.includes("weight")) {
                document.getElementById(node.id).className =
                    "item-visited weight";
            } else if (htmlLink.includes("start")) {
                document.getElementById(node.id).className =
                    "item-visited start";
            } else if (htmlLink.includes("end")) {
                document.getElementById(node.id).className = "item-visited end";
            } else if (htmlLink.includes("shortcut")) {
                document.getElementById(node.id).className =
                    "item-visited shortcut";
            } else {
                document.getElementById(node.id).className = "item-visited";
            }
        }, visitedSpeed * spaceTime);
    });
    //console.log("I'v eneded !");

    setTimeout(() => {
        animateShortestPath(shortPath, shortPathSpeed);
    }, visitedSpeed * spaceTime);

    // Determiner la distance total du path
    adjacencyList.forEach((v, node) => {
        const htmlLink = document.getElementById(node.id).className;
        if (htmlLink.includes("end")) {
            // On prends la distance total a la fin de chaque algo
            totalPathCost = node.totalDistance;
        }
    });

    ///////////////////Information Package///////////////////////
    relaxationCount = statusBF[0];
    negativeCycle = statusBF[1];

    informationPackage[0] = totalPathCost;
    informationPackage[1] = relaxationCount;
    informationPackage[2] = negativeCycle;
    ///////////////////////////////////////////////////////////////

    const shortPathTimeLength = (shortPath.size + 1) * shortPathSpeed + 1500;
    const visitedTimeLength = spaceTime * visitedSpeed;
    const totalTimeLength = visitedTimeLength + shortPathTimeLength;

    return totalTimeLength;
}
