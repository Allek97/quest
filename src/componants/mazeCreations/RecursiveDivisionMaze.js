import React from "react";
import adjacencyListCreation from "../searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./utilityFunctionsMaze/AdjacencyListCreationMaze";
import kruskalEdgesCreation from "./utilityFunctionsMaze/KruskalEdgesCreation";
import minPQ from "../searchAlgorithms/utilitityFunctions/MinPQ";
import wallsDestroyed from "./utilityFunctionsMaze/WallsDestroyed";
import getRandomEdge from "./utilityFunctionsMaze/GetRandomEdge";
import getRandomKey from "./utilityFunctionsMaze/GetRandomKey";

export default function recursiveDivisionMaze(
  nodes,
  adjacencyListMaze,
  visitedMazeCells,
  positionList,
  width,
  height,
  offSet,
  msg
) {
  // Recursion Termination

  if (width - offSet[0] <= 2 || height - offSet[1] <= 2) {
    return;
  }

  // Randomly build the wall either horizontally or vertically

  const isHorizontal = directionTrace(width, height, offSet);

  // Randomly select the position to build the wall (disconnect cells along the line)
  const wallIdx = randomWallBuild(width, height, offSet, isHorizontal);
  const pathIdx = randomPath(width, height, offSet, isHorizontal);

  buildWall(
    nodes,
    visitedMazeCells,
    width,
    height,
    wallIdx,
    pathIdx,
    isHorizontal,
    offSet
  );

  if (isHorizontal) {
    // Top and Bottom areas
    recursiveDivisionMaze(
      nodes,
      adjacencyListMaze,
      visitedMazeCells,
      positionList,
      width,
      wallIdx,
      offSet,
      "top"
    );
    //return;
    recursiveDivisionMaze(
      nodes,
      adjacencyListMaze,
      visitedMazeCells,
      positionList,
      width,
      height,
      [offSet[0], wallIdx],
      "bottom"
    );
  } else {
    // Left and Right areas
    recursiveDivisionMaze(
      nodes,
      adjacencyListMaze,
      visitedMazeCells,
      positionList,
      wallIdx,
      height,
      offSet,
      "left"
    );
    recursiveDivisionMaze(
      nodes,
      adjacencyListMaze,
      visitedMazeCells,
      positionList,
      width,
      height,
      [wallIdx, offSet[1]],
      "right"
    );
  }
}

const directionTrace = (width, height, offSet) => {
  return height - offSet[1] > width - offSet[0] ? true : false;

  /* const randomNumber = Math.random();
  const decision = randomNumber < 0.5 ? true : false;
  return decision;*/
};

const randomWallBuild = (width, height, offSet, isHorizontal) => {
  let randomPosition;
  if (isHorizontal) {
    if (offSet[1] === 0) {
      randomPosition =
        Math.floor(Math.random() * ((height - 2 - (offSet[1] + 2) + 1) / 2)) *
          2 +
        (offSet[1] + 1);
    } else {
      randomPosition =
        Math.floor(Math.random() * ((height - 2 - (offSet[1] + 2) + 1) / 2)) *
          2 +
        (offSet[1] + 2);
    }
  } else {
    if (offSet[0] === 0) {
      randomPosition =
        Math.floor(Math.random() * ((width - 2 - (offSet[0] + 2) + 1) / 2)) *
          2 +
        (offSet[0] + 1);
    } else {
      randomPosition =
        Math.floor(Math.random() * ((width - 2 - (offSet[0] + 2) + 1) / 2)) *
          2 +
        (offSet[0] + 2);
    }
  }

  return randomPosition;
};

const randomPath = (width, height, offSet, isHorizontal) => {
  let randomPosition;
  if (!isHorizontal) {
    if (offSet[1] === 0) {
      randomPosition =
        Math.floor(Math.random() * ((height - 1 - (offSet[1] + 1) + 1) / 2)) *
          2 +
        offSet[1];
    } else {
      randomPosition =
        Math.floor(Math.random() * ((height - 1 - (offSet[1] + 1) + 1) / 2)) *
          2 +
        (offSet[1] + 1);
    }
  } else {
    if (offSet[0] === 0) {
      randomPosition =
        Math.floor(Math.random() * ((width - 1 - (offSet[0] + 1) + 1) / 2)) *
          2 +
        offSet[0];
    } else {
      randomPosition =
        Math.floor(Math.random() * ((width - 1 - (offSet[0] + 1) + 1) / 2)) *
          2 +
        (offSet[0] + 1);
    }
  }
  return randomPosition;
};

const buildWall = (
  nodes,
  visitedMazeCells,
  width,
  height,
  wallIdx,
  pathIdx,
  isHorizontal,
  offSet
) => {
  const xOffSet = offSet[0];
  const yOffSet = offSet[1];
  nodes.map((node, nodeIdx) => {
    if (isHorizontal) {
      if (
        node.column >= xOffSet &&
        node.column < width &&
        node.row === wallIdx &&
        node.column !== pathIdx
      ) {
        visitedMazeCells.set(node, null);
      }
    } else {
      if (
        node.row >= yOffSet &&
        node.row < height &&
        node.column === wallIdx &&
        node.row !== pathIdx
      ) {
        visitedMazeCells.set(node, null);
      }
    }
  });
};
