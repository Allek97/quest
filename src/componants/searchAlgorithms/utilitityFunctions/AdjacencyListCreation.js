import React from "react";

export default function adjacencyListCreation(
    nodes,
    positionList = new Map(),
    adjacencyList = new Map(),
    withDiagonals = false
) {
    nodes.map((node, nodeIdx) => {
        positionList.set(JSON.stringify([node.row, node.column]), [
            node.isWall,
            node,
            node.isStart,
            node.isEnd,
        ]);
    });

    nodes.map((node, nodeIdx) => {
        let voisins = [];
        // On regarde chacun des voisins
        if (node.isStart || node.isEnd || !node.isWall) {
            if (!withDiagonals) {
                const north = positionList.get(
                    JSON.stringify([node.row + 1, node.column])
                );
                const south = positionList.get(
                    JSON.stringify([node.row - 1, node.column])
                );
                const west = positionList.get(
                    JSON.stringify([node.row, node.column - 1])
                );
                const east = positionList.get(
                    JSON.stringify([node.row, node.column + 1])
                );

                if (north !== undefined) {
                    if (
                        north[0] === false ||
                        north[2] === true ||
                        north[3] === true
                    ) {
                        voisins.push(north[1]);
                    }
                }
                if (west !== undefined) {
                    if (
                        west[0] === false ||
                        west[2] === true ||
                        west[3] === true
                    ) {
                        voisins.push(west[1]);
                    }
                }
                if (south !== undefined) {
                    if (
                        south[0] === false ||
                        south[2] === true ||
                        south[3] === true
                    ) {
                        voisins.push(south[1]);
                    }
                }

                if (east !== undefined) {
                    if (
                        east[0] === false ||
                        east[2] === true ||
                        east[3] === true
                    ) {
                        voisins.push(east[1]);
                    }
                }

                adjacencyList.set(node, voisins);
            } else {
                const north = positionList.get(
                    JSON.stringify([node.row + 1, node.column])
                );
                const south = positionList.get(
                    JSON.stringify([node.row - 1, node.column])
                );
                const west = positionList.get(
                    JSON.stringify([node.row, node.column - 1])
                );
                const east = positionList.get(
                    JSON.stringify([node.row, node.column + 1])
                );
                const northWest = positionList.get(
                    JSON.stringify([node.row + 1, node.column - 1])
                );
                const northEast = positionList.get(
                    JSON.stringify([node.row + 1, node.column + 1])
                );
                const southEast = positionList.get(
                    JSON.stringify([node.row - 1, node.column + 1])
                );
                const southWest = positionList.get(
                    JSON.stringify([node.row - 1, node.column - 1])
                );

                if (north !== undefined) {
                    if (
                        north[0] === false ||
                        north[2] === true ||
                        north[3] === true
                    ) {
                        voisins.push(north[1]);
                    }
                }
                if (south !== undefined) {
                    if (
                        south[0] === false ||
                        south[2] === true ||
                        south[3] === true
                    ) {
                        voisins.push(south[1]);
                    }
                }
                if (west !== undefined) {
                    if (
                        west[0] === false ||
                        west[2] === true ||
                        west[3] === true
                    ) {
                        voisins.push(west[1]);
                    }
                }
                if (east !== undefined) {
                    if (
                        east[0] === false ||
                        east[2] === true ||
                        east[3] === true
                    ) {
                        voisins.push(east[1]);
                    }
                }

                if (northWest !== undefined) {
                    if (
                        northWest[0] === false ||
                        northWest[2] === true ||
                        northWest[3] === true
                    ) {
                        voisins.push(northWest[1]);
                    }
                }

                if (northEast !== undefined) {
                    if (
                        northEast[0] === false ||
                        northEast[2] === true ||
                        northEast[3] === true
                    ) {
                        voisins.push(northEast[1]);
                    }
                }

                if (southEast !== undefined) {
                    if (
                        southEast[0] === false ||
                        southEast[2] === true ||
                        southEast[3] === true
                    ) {
                        voisins.push(southEast[1]);
                    }
                }

                if (southWest !== undefined) {
                    if (
                        southWest[0] === false ||
                        southWest[2] === true ||
                        southWest[3] === true
                    ) {
                        voisins.push(southWest[1]);
                    }
                }

                adjacencyList.set(node, voisins);
            }
        }
    });
}
