import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import { ReactComponent as AlgoIcon } from "../../svgs/alchemy.svg";
import { ReactComponent as Maze } from "../../svgs/maze.svg";
import { ReactComponent as DownArrow } from "../../svgs/downArrow.svg";
import { ReactComponent as RightArrow } from "../../svgs/rightArrow.svg";

import useOuterClick from "../utilityComponants/UseOuterClick.js";

export default function SubNav(props) {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);

  const toggle1 = () => {
    if (isOpen2) toggle2();
    setIsOpen1(!isOpen1);
    setIsOpen3(false);
  };
  const toggle2 = () => {
    if (isOpen1) toggle1();
    setIsOpen2(!isOpen2);
    setIsOpen3(false);
  };

  const toggle3 = (e) => {
    e.stopPropagation(); // Important pour que le menu ne se ferme pas quand on click sur un boutton
    setIsOpen3(!isOpen3);
  };

  const closeWhenOutsideAlgo = () => {
    setIsOpen1(false);
  };

  const closeWhenOutsideMaze = () => {
    setIsOpen2(false);
  };

  // Fermer les dropdown lorsqu'on click a l'exterieur

  const wrapperRefAlgoDrop = useRef(null);
  const wrapperRefMazeDrop = useRef(null);
  useOuterClick(wrapperRefAlgoDrop, closeWhenOutsideAlgo);
  useOuterClick(wrapperRefMazeDrop, closeWhenOutsideMaze);

  const classNameAlgo = isOpen1 ? "algo-dash-down" : "void-space";
  const classNameMaze = isOpen2 ? "maze-dash-down" : "void-space";
  const classNameAStar = isOpen3 ? "algo-dash-down--astar" : "void-space";

  /*{isOpen1 === true ? <AStarList /> : null}*/
  const AlgoList = () => (
    <>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise BFS!");
        }}
      >
        <a href="#" className="btn btn--sub">
          Breath-First Search
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise DFS!");
        }}
      >
        <a href="#" className="btn btn--sub">
          Depth-First Search
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise Dijkstra!");
        }}
      >
        <a href="#" className="btn btn--sub">
          Dikjstra Algorithme
        </a>
      </li>
      <li
        onClick={(e) => {
          toggle3(e);
        }}
        style={{
          backgroundColor: isOpen3 === true ? "#1abc9c" : "",
          color: isOpen3 === true ? "white" : "",
        }}
      >
        <a href="#" className="btn btn--sub">
          A* Algorithme
          <ul className={classNameAStar}>
            <AStarHeuristics />
          </ul>
          <span className="a-star-arrow">
            {isOpen3 === true ? <RightArrow /> : <DownArrow />}
          </span>
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise Greedy BFS!");
        }}
      >
        <a href="#" className="btn btn--sub">
          Greedy BFS
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise Basic Greedy!");
        }}
      >
        <a href="#" className="btn btn--sub">
          Basic Greedy Algorithm
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.setAlgo("Visualise Bellman Ford!");
        }}
      >
        <a href="#" className="btn btn--sub">
          BellmanFord
        </a>
      </li>
      <li>
        <a href="#" className="btn btn--sub">
          F* Algorithme
        </a>
      </li>
    </>
  );

  const AStarHeuristics = () => (
    <>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress)
            props.setAlgo("Visualise A* avec Distance Manhattan!");
          setIsOpen1(false);
        }}
      >
        <a href="#" className="btn btn--sub">
          Distance de Manhattan
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress)
            props.setAlgo("Visualise A* avec Distance Diagonale!");
          setIsOpen1(false);
        }}
      >
        <a href="#" className="btn btn--sub">
          Distance Diagonale
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress)
            props.setAlgo("Visualise A* avec Distance Euclidienne!");
          setIsOpen1(false);
        }}
      >
        <a href="#" className="btn btn--sub">
          Distance Euclidienne
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress)
            props.setAlgo("Visualise A* avec Distance Euclidienne au Carré!");
          setIsOpen1(false);
        }}
      >
        <a href="#" className="btn btn--sub">
          Distance Euclidienne au carrée
        </a>
      </li>
    </>
  );

  const MazeList = () => (
    <>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addRandomMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Random Maze generator
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addBacktrackingMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Recursive Backtracking Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addKruskalMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Kruskal's Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addPrimMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Prim's Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addAldousBroderMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Aldous Broder Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addGrowingTreeMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Growing Tree Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addHuntAndKillMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Hunt and Kill Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addWilsonMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Wilson Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addEllerMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Eller Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addRecursiveDivisionMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Recursive Division Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addSidewinderMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Sidewinder Algorithm Maze
        </a>
      </li>
      <li
        onClick={() => {
          if (!props.isAlgoInProgress) props.addBinaryTreeMaze();
        }}
      >
        <a href="#" className="btn btn--sub">
          Binary Tree Maze
        </a>
      </li>
    </>
  );

  let buttonMazeClassName = "maze-button";

  if (isOpen2) {
    buttonMazeClassName += " active-tip";
  }

  return (
    <div>
      <li
        className={"algo-button"}
        ref={wrapperRefAlgoDrop}
        onClick={() => {
          toggle1();
        }}
        style={{
          backgroundColor: isOpen1 === true ? "#1abc9c" : "",
          color: isOpen1 === true ? "white " : "",
          hover: "white",
        }}
      >
        <AlgoIcon />
        <a href="#" className="btn">
          Algorithms
        </a>
        <span className="arrow">
          {isOpen1 === true ? <RightArrow /> : <DownArrow />}
        </span>
        <ul className={classNameAlgo}>
          {isOpen1 === true ? <AlgoList /> : null}
        </ul>
      </li>

      <li
        className={buttonMazeClassName}
        ref={wrapperRefMazeDrop}
        onClick={() => {
          toggle2();
        }}
        style={{
          backgroundColor: isOpen2 === true ? "#1abc9c" : "",
          color: isOpen2 === true ? "white" : "",
        }}
      >
        <Maze />
        <a href="#" className="btn">
          Mazes &
          <br />
          Patterns
        </a>
        <span className="arrow">
          {isOpen2 === true ? <RightArrow /> : <DownArrow />}
        </span>
        <ul className={classNameMaze}>
          {isOpen2 === true ? <MazeList /> : null}
        </ul>
      </li>
    </div>
  );
}

//ReactDOM.render(<SubNav />, document.getElementById("root"));
