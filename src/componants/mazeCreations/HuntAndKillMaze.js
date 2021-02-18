import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

import { v4 as uuidv4 } from "uuid";

export default function huntAndKillMaze(
  nodes,
  visitedMazeCells = new Map(),
  rowSizeMaze,
  columnSizeMaze
) {
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

  let huntMaze = new Map();

  const firstCell = getRandomKey(adjacencyListMaze);

  vertexList.add(firstCell);

  huntMaze.set(firstCell, ["Unhunted", null]);

  visitedMazeCells.set(firstCell, ["Unhunted", null]);

  let isModeHunt = true;

  //keepTrackVisited.add(firstCell);

  while (isModeHunt) {
    const core = Array.from(vertexList).pop();
    const neighboursOfCore = adjacencyListMaze.get(core);

    let visitedCount = 0;
    let nodeIdx = 0;

    neighboursOfCore.forEach((neighbour, position) => {
      if (!vertexList.has(neighbour)) {
        visitedCount++;
      }
    });

    if (visitedCount === 0) {
      nodeIdx = 0;
      //On commence le hunt
      for (const [core, neighboursOfCore] of adjacencyListMaze) {
        if (vertexList.has(core)) {
          //console.log(core);
          const eastNeighbour = neighboursOfCore.get("east");
          const westNeighbour = neighboursOfCore.get("west");

          if (westNeighbour !== undefined && !vertexList.has(westNeighbour)) {
            vertexList.add(westNeighbour);

            wallsDestroyed(
              core,
              positionList,
              "west",
              undefined,
              undefined,
              visitedMazeCells,
              true
            );
            visitedMazeCells.set(westNeighbour, ["Hunted", westNeighbour.row]);
            break;
          } else if (
            eastNeighbour !== undefined &&
            !vertexList.has(eastNeighbour)
          ) {
            let lastHuntedRow = Math.floor(nodeIdx / columnSizeMaze);

            vertexList.add(eastNeighbour);

            wallsDestroyed(
              core,
              positionList,
              "east",
              undefined,
              undefined,
              visitedMazeCells,
              true
            );
            visitedMazeCells.set(eastNeighbour, ["Hunted", eastNeighbour.row]);
            break;
          }

          nodeIdx++;
          if (nodeIdx === adjacencyListMaze.size) {
            isModeHunt = false;
          }
        }
      }
    } else {
      let unvisitedNeighbours = new Map();
      neighboursOfCore.forEach((node, position) => {
        if (!vertexList.has(node)) {
          unvisitedNeighbours.set(position, node);
        }
      });
      const randomPositionCell = getRandomKey(unvisitedNeighbours);
      const choosenCell = unvisitedNeighbours.get(randomPositionCell);

      vertexList.add(choosenCell);

      //keepTrackVisited.add(choosenCell);

      wallsDestroyed(
        core,
        positionList,
        randomPositionCell,
        undefined,
        undefined,
        visitedMazeCells,
        false
      );
      visitedMazeCells.set(choosenCell, ["Unhunted", null]);
    }
  }

  //console.log(visitedMazeCells);

  let spaceTime = 1;
  let totalTimeLength = 0;
  const animationSpeed = 10;
  const scanAnimationSpeed = 100;
  let huntedWallId;
  let mazeCellsCount = 0;
  setTimeout((totalTimeLength) => {
    visitedMazeCells.forEach((status, node) => {
      spaceTime++;
      const htmlLink = document.getElementById(node.id).className;
      mazeCellsCount++;

      // console.log(spaceTime);
      setTimeout(() => {
        if (status[0] === "Wall") {
          huntFunction(nodes, status[1], scanAnimationSpeed);
          setTimeout(() => {
            document.getElementById(node.id).className = "huntandkill";
            //document.getElementById(node.id).setAttribute("id", uuidv4());
          }, scanAnimationSpeed * (status[1] + 1));
        } else {
          mazeCellsCount++;
          document.getElementById(node.id).className = "huntandkill";
          //document.getElementById(node.id).setAttribute("id", uuidv4());
        }
      }, animationSpeed * spaceTime);

      if (status[0] === "Wall") {
        spaceTime += (scanAnimationSpeed * (status[1] + 1)) / animationSpeed;
        //console.log(spaceTime);
        huntedWallId = node.id;
      }
    });
  }, 2000);

  return [animationSpeed, scanAnimationSpeed];
}

const huntFunction = (nodes, lastHuntedRow, speedHunt, timeOut) => {
  let spaceTime = 0;
  nodes.some((node, nodeIdx) => {
    const htmlLink = document.getElementById(node.id).className;
    spaceTime = node.row;
    if (node.row === lastHuntedRow + 1) {
      console.log("HUNT HAS ENDED");
      return true;
    }
    setTimeout(() => {
      if (htmlLink === "huntandkill") {
        document.getElementById(node.id).className = "huntscan passage";
      } else if (htmlLink === "huntscan passage") {
        document.getElementById(node.id).className = "huntscan passagestate";
      } else if (htmlLink === "huntscan passagestate") {
        document.getElementById(node.id).className = "huntscan passage";
      } else if (htmlLink === "item-wall") {
        document.getElementById(node.id).className = "huntscan wall";
      } else if (htmlLink === "huntscan wall") {
        document.getElementById(node.id).className = "huntscan wallstate";
      } else if (htmlLink === "huntscan wallstate") {
        document.getElementById(node.id).className = "huntscan wall";
      }
    }, speedHunt * spaceTime);
  });
  return nodes;
};
