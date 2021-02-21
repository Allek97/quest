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

    const classNameAlgo = isOpen1 ? "algo-list" : "algo-list algo-list--closed";
    const classNameMaze = isOpen2 ? "maze-list" : "maze-list maze-list--closed";
    const classNameAStar = isOpen3 ? "astar-list" : "astar-list astar-list--closed";

    //VOIR ROOT POUR LES COULEURS
    const colorSecondary = "#55c57a";

    /*{isOpen1 === true ? <AStarList /> : null}*/

    ////////////////////////////////////
    // ALGO LIST

    const AlgoList = () => (
        <>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise BFS!");
                }}
            >
                <a href="#" className="algo-list__link">
                    Breath-First Search
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise DFS!");
                }}
            >
                <a href="#" className="algo-list__link">
                    Depth-First Search
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise Dijkstra!");
                }}
            >
                <a href="#" className="algo-list__link">
                    Dikjstra Algorithme
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={(e) => {
                    toggle3(e);
                }}
                style={{
                    backgroundColor: isOpen3 === true ? colorSecondary : "",
                    color: isOpen3 === true ? "white" : "",
                }}
            >
                <a href="#" className="algo-list__link">
                    A* Algorithme
                    <nav className="astar-nav">
                        <ul className={classNameAStar}>{<AStarHeuristics />}</ul>
                    </nav>
                    <span className="algo-list__arrow-container">
                        {isOpen3 === true ? (
                            <DownArrow className="algo-list__arrow-icon algo-list__arrow-icon--up" />
                        ) : (
                            <DownArrow className="algo-list__arrow-icon algo-list__arrow-icon--down" />
                        )}
                    </span>
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise Greedy BFS!");
                }}
            >
                <a href="#" className="algo-list__link">
                    Greedy BFS
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise Basic Greedy!");
                }}
            >
                <a href="#" className="algo-list__link">
                    Basic Greedy Algorithm
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.setAlgo("Visualise Bellman Ford!");
                }}
            >
                <a href="#" className="algo-list__link">
                    BellmanFord
                </a>
            </li>
            <li className="algo-list__item">
                <a href="#" className="algo-list__link">
                    F* Algorithme
                </a>
            </li>
        </>
    );

    ////////////////////////////////////
    // ASTAR HEURISTICS LIST

    const AStarHeuristics = () => (
        <>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress)
                        props.setAlgo("Visualise A* avec Distance Manhattan!");
                    setIsOpen1(false);
                }}
            >
                <a href="#" className="astar-list__link">
                    Distance de Manhattan
                </a>
            </li>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress)
                        props.setAlgo("Visualise A* avec Distance Diagonale!");
                    setIsOpen1(false);
                }}
            >
                <a href="#" className="astar-list__link">
                    Distance Diagonale
                </a>
            </li>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress)
                        props.setAlgo("Visualise A* avec Distance Euclidienne!");
                    setIsOpen1(false);
                }}
            >
                <a href="#" className="astar-list__link">
                    Distance Euclidienne
                </a>
            </li>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress)
                        props.setAlgo("Visualise A* avec Distance Euclidienne au Carré!");
                    setIsOpen1(false);
                }}
            >
                <a href="#" className="astar-list__link">
                    Distance Euclidienne au carrée
                </a>
            </li>
        </>
    );

    ////////////////////////////////////
    // MAZE LIST

    const MazeList = () => (
        <>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addBacktrackingMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Recursive Backtracking Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addKruskalMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Kruskal's Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addPrimMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Prim's Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addAldousBroderMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Aldous Broder Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addGrowingTreeMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Growing Tree Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addHuntAndKillMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Hunt and Kill Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addWilsonMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Wilson Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addEllerMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Eller Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addRecursiveDivisionMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Recursive Division Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addSidewinderMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Sidewinder Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addBinaryTreeMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Binary Tree Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addRandomMaze();
                }}
            >
                <a href="#" className="maze-list__link">
                    Random Maze generator
                </a>
            </li>
        </>
    );

    let buttonMazeClassName = "maze-button";

    if (isOpen2) {
        buttonMazeClassName += " active-tip";
    }

    return (
        <>
            <li
                className="side-nav__item side-nav__item--algo-button"
                ref={wrapperRefAlgoDrop}
                onClick={() => {
                    toggle1();
                }}
                style={{
                    backgroundColor: isOpen1 === true ? colorSecondary : "",
                }}
            >
                <a href="#" className="side-nav__link">
                    <AlgoIcon className="side-nav__icon" />
                    Algorithms
                    <span className="side-nav__arrow-container">
                        {isOpen1 === true ? (
                            <DownArrow className="side-nav__arrow-icon side-nav__arrow-icon--up" />
                        ) : (
                            <DownArrow className="side-nav__arrow-icon side-nav__arrow-icon--down" />
                        )}
                    </span>
                </a>
                <nav className={isOpen2 === true ? "algo-nav" : "algo-nav algo-nav--closed"}>
                    <ul className={classNameAlgo}>{isOpen1 === true ? <AlgoList /> : null}</ul>
                </nav>
            </li>

            <li
                className="side-nav__item side-nav__item--maze-button" //{buttonMazeClassName}
                ref={wrapperRefMazeDrop}
                onClick={() => {
                    toggle2();
                }}
                style={{
                    backgroundColor: isOpen2 === true ? colorSecondary : "",
                }}
            >
                <a href="#" className="side-nav__link">
                    <Maze className="side-nav__icon" />
                    Mazes & Patterns
                    <span className="side-nav__arrow-container">
                        {isOpen2 === true ? (
                            <DownArrow className="side-nav__arrow-icon side-nav__arrow-icon--up" />
                        ) : (
                            <DownArrow className="side-nav__arrow-icon side-nav__arrow-icon--down" />
                        )}
                    </span>
                </a>
                <nav className={isOpen2 === true ? "maze-nav" : "maze-nav maze-nav--closed"}>
                    <ul className={classNameMaze}>{isOpen2 === true ? <MazeList /> : null}</ul>
                </nav>
            </li>
        </>
    );
}

//ReactDOM.render(<SubNav />, document.getElementById("root"));
