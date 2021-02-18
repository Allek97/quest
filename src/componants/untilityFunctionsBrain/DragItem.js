import {
  BFS,
  DFS,
  dijkstra,
  aStar,
  classicGreedy,
  greedyBFS,
  bellmanFord,
} from "../searchAlgorithms/MainAlgorithmsList";

import animateAlgo from "./AnimateAlgo";
import animateBellmanFord from "./AnimateBellmanFord";
import resetCSS from "./ResetCSS";

export default function dragItem(nodes, id, itemName, whichAlgoRunning) {
  const htmlDraggedLink = document.getElementById(id).className;
  const entries = Object.entries(whichAlgoRunning);
  let runningAlgo;

  if (itemName === "knight") {
    if (htmlDraggedLink.includes("end")) {
      return;
    }

    /*
    breathFS: false,
        depthFS: false,
        dijkstra: false,
        aStarManhattan: false,
        aStarDiagonal: false,
        aStarEuclidien: false,
        aStarEuclidienCarre: false,
        greedyBFS: false,
        basicGreedy: false,
        bellmanFord: false,
    */
    if (htmlDraggedLink === "item-visited") {
      document.getElementById(id).className = "item-visited start";
      //console.log("jan");
    } else if (htmlDraggedLink === "item-short-path") {
      document.getElementById(id).className = "item-short-path start";
    } else {
      document.getElementById(id).className = "item-start";
    }
    nodes.map((node, nodeIdx) => {
      const htmlLink = document.getElementById(node.id).className;

      if (node.id !== id && htmlLink.includes("start")) {
        if (node.isWall) {
          //console.log("here");
          document.getElementById(node.id).className = "item-wall";
        } else if (node.isEnd) {
          document.getElementById(node.id).className = "item-end";
        } else if (node.isWeight) {
          document.getElementById(node.id).className = "item-weight";
        } else if (node.isShortcut) {
          document.getElementById(node.id).className = "item-shortcut";
        } else {
          document.getElementById(node.id).className = "item";
        }
      }
    });
    /*setTimeout(() => {
      for (const [algoName, status] of entries) {
        if (status) {
          runningAlgo = algoName;
          break;
        }
      }
      switch (runningAlgo) {
        case "breathFS":
          resetCSS(nodes);
          animateAlgo(BFS, nodes, undefined, false, 0, 0);
          console.log("hey");
          break;
      }
    }, 0);*/
  } else if (itemName === "princess") {
    console.log("testing");
    if (htmlDraggedLink.includes("start")) {
      return;
    }

    nodes.map((node, nodeIdx) => {
      const htmlLink = document.getElementById(node.id).className;

      if (node.id !== id && htmlLink.includes("end")) {
        if (node.isWall) {
          document.getElementById(node.id).className = "item-wall";
        } else if (node.start) {
          document.getElementById(node.id).className = "item-start";
        } else if (node.isWeight) {
          document.getElementById(node.id).className = "item-weight";
        } else if (node.isShortcut) {
          document.getElementById(node.id).className = "item-shortcut";
        } else {
          document.getElementById(node.id).className = "item";
        }
      }
    });

    document.getElementById(id).className = "item-end";
  }
}
