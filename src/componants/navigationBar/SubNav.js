/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import { ReactComponent as AlgoIcon } from "../../svgs/alchemy.svg";
import { ReactComponent as Maze } from "../../svgs/maze.svg";
import { ReactComponent as Arrow } from "../../svgs/downArrow.svg";
import { ReactComponent as RightArrow } from "../../svgs/rightArrow.svg";

import useOuterClick from "../utilityComponants/UseOuterClick.js";

export default function SubNav(props) {
    const [isOpen1, setIsOpen1] = React.useState(false); // Algorithms
    const [isOpen2, setIsOpen2] = React.useState(false); // Mazes
    const [isOpen3, setIsOpen3] = React.useState(false); // A*
    const [isOpen4, setIsOpen4] = React.useState(false); // IDA*

    const toggle1 = () => {
        if (isOpen2) toggle2();
        setIsOpen1(!isOpen1);
        setIsOpen3(false);
        setIsOpen4(false);
    };
    const toggle2 = () => {
        if (isOpen1) toggle1();
        setIsOpen2(!isOpen2);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    const toggle3 = (e) => {
        // Important pour que le menu ne se ferme pas quand on click sur un boutton
        if (e !== undefined) {
            e.stopPropagation();
        }
        if (isOpen4) toggle4();

        setIsOpen3(!isOpen3);
    };

    const toggle4 = (e) => {
        if (e !== undefined) {
            e.stopPropagation();
        }
        if (isOpen3) toggle3();
        setIsOpen4(!isOpen4);
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
    const classNameAStar =
        isOpen3 || isOpen4 ? "astar-list" : "astar-list astar-list--closed";

    //VOIR ROOT POUR LES COULEURS
    const colorSecondary = "#09c199";

    /*{isOpen1 === true ? <AStarList /> : null}*/

    ////////////////////////////////////
    // ALGO LIST

    const AlgoList = () => (
        <>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise BFS!");
                        // Enlever les poids/rewards
                        props.setIsWeighted(false);
                        props.addResetWeights(true);
                        //Information text about algo
                        props.updateSelectedAlgo("BFS");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Breath-First Search
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise DFS!");
                        props.setIsWeighted(false);
                        props.addResetWeights(true);
                        props.updateSelectedAlgo("DFS");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Depth-First Search
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise Dijkstra!");
                        props.setIsWeighted(true);
                        props.addResetWeights(false);
                        props.updateSelectedAlgo("Dijkstra");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Dijkstra Algorithme
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={(e) => {
                    toggle3(e);
                    props.setIsWeighted(true);
                    props.addResetWeights(false);
                }}
                style={{
                    backgroundColor: isOpen3 === true ? colorSecondary : "",
                    color: isOpen3 === true ? "white" : "",
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    A* Algorithme
                    <nav className="astar-nav">
                        {isOpen3 && (
                            <ul className={classNameAStar}>
                                {<AStarHeuristics />}
                            </ul>
                        )}
                    </nav>
                    <span className="algo-list__arrow-container">
                        {isOpen3 === true ? (
                            <Arrow className="algo-list__arrow-icon algo-list__arrow-icon--up" />
                        ) : (
                            <Arrow className="algo-list__arrow-icon algo-list__arrow-icon--down" />
                        )}
                    </span>
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise Bellman Ford!");
                        props.setIsWeighted(true);
                        props.addResetWeights(false);
                        props.updateSelectedAlgo("Bellman Ford");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    BellmanFord
                </a>
            </li>
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise IDDFS!");
                        props.setIsWeighted(false);
                        props.addResetWeights(true);
                        props.updateSelectedAlgo("IDDFS");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    IDDFS
                </a>
            </li>

            <li
                className="algo-list__item"
                onClick={(e) => {
                    toggle4(e);
                    props.setIsWeighted(true);
                    props.addResetWeights(false);
                }}
                style={{
                    backgroundColor: isOpen4 === true ? colorSecondary : "",
                    color: isOpen4 === true ? "white" : "",
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    IDA*
                    <nav className="astar-nav">
                        {isOpen4 && (
                            <ul className={classNameAStar}>
                                {<AStarHeuristics />}
                            </ul>
                        )}
                    </nav>
                    <span className="algo-list__arrow-container">
                        {isOpen4 === true ? (
                            <Arrow className="algo-list__arrow-icon algo-list__arrow-icon--up" />
                        ) : (
                            <Arrow className="algo-list__arrow-icon algo-list__arrow-icon--down" />
                        )}
                    </span>
                </a>
            </li>

            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise Greedy BFS!");
                        props.setIsWeighted(false);
                        props.addResetWeights(true);
                        props.updateSelectedAlgo("Greedy BFS");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Greedy BFS
                </a>
            </li>

            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise Weighted Greedy BFS!");
                        props.setIsWeighted(true);
                        props.addResetWeights(false);
                        props.updateSelectedAlgo("Weighted Greedy BFS");
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Weighted Greedy BFS
                </a>
            </li>

            {/*
            <li
                className="algo-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        props.setAlgo("Visualise Basic Greedy!");
                        props.setIsWeighted(false);
                        props.addResetWeights(true);
                    }
                }}
            >
                <a href="javascript:void(0)" className="algo-list__link">
                    Basic Greedy Algorithm
                </a>
            </li>
            */}
        </>
    );

    ////////////////////////////////////
    // ASTAR HEURISTICS LIST

    const AStarHeuristics = () => (
        <>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        isOpen3
                            ? props.setAlgo(
                                  "Visualise A* avec Distance Manhattan!"
                              )
                            : props.setAlgo(
                                  "Visualise IDA* avec Distance Manhattan!"
                              );
                        isOpen3
                            ? props.updateSelectedAlgo(
                                  "A* avec Distance Manhattan"
                              )
                            : props.updateSelectedAlgo(
                                  "IDA* avec Distance Manhattan"
                              );
                    }
                    setIsOpen1(false);
                    //Open Option Wheel
                    props.setOptionWheel(true);
                }}
            >
                <a href="javascript:void(0)" className="astar-list__link">
                    Distance de Manhattan
                </a>
            </li>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        isOpen3
                            ? props.setAlgo(
                                  "Visualise A* avec Distance Diagonale!"
                              )
                            : props.setAlgo(
                                  "Visualise IDA* avec Distance Diagonale!"
                              );
                        isOpen3
                            ? props.updateSelectedAlgo(
                                  "A* avec Distance Diagonale"
                              )
                            : props.updateSelectedAlgo(
                                  "IDA* avec Distance Diagonale"
                              );
                    }
                    setIsOpen1(false);
                    //Open Option Wheel
                    props.setOptionWheel(true);
                }}
            >
                <a href="javascript:void(0)" className="astar-list__link">
                    Distance Diagonale
                </a>
            </li>
            {!isOpen4 && (
                <li
                    className="astar-list__item"
                    onClick={() => {
                        if (!props.isAlgoInProgress) {
                            isOpen3
                                ? props.setAlgo(
                                      "Visualise A* avec Distance Euclidienne!"
                                  )
                                : props.setAlgo(
                                      "Visualise IDA* avec Distance Euclidienne!"
                                  );
                            isOpen3
                                ? props.updateSelectedAlgo(
                                      "A* avec Distance Euclidienne"
                                  )
                                : props.updateSelectedAlgo(
                                      "IDA* avec Distance Euclidienne"
                                  );
                        }
                        setIsOpen1(false);
                        //Open Option Wheel
                        props.setOptionWheel(true);
                    }}
                >
                    <a href="javascript:void(0)" className="astar-list__link">
                        Distance Euclidienne
                    </a>
                </li>
            )}
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        isOpen3
                            ? props.setAlgo(
                                  "Visualise A* avec Distance Octile!"
                              )
                            : props.setAlgo(
                                  "Visualise IDA* avec Distance Octile!"
                              );
                        isOpen3
                            ? props.updateSelectedAlgo(
                                  "A* avec Distance Octile"
                              )
                            : props.updateSelectedAlgo(
                                  "IDA* avec Distance Octile"
                              );
                    }
                    setIsOpen1(false);
                    //Open Option Wheel
                    props.setOptionWheel(true);
                }}
            >
                <a href="javascript:void(0)" className="astar-list__link">
                    Distance Octile
                </a>
            </li>
            <li
                className="astar-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) {
                        isOpen3
                            ? props.setAlgo(
                                  "Visualise A* avec Distance Euclidienne au Carré!"
                              )
                            : props.setAlgo(
                                  "Visualise IDA* avec Distance Euclidienne au Carré!"
                              );
                        isOpen3
                            ? props.updateSelectedAlgo(
                                  "A* avec Distance Euclidienne au Carré"
                              )
                            : props.updateSelectedAlgo(
                                  "IDA* avec Distance Euclidienne au Carré"
                              );
                    }
                    setIsOpen1(false);
                    //Open Option Wheel
                    props.setOptionWheel(true);
                }}
            >
                <a href="javascript:void(0)" className="astar-list__link">
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
                <a href="javascript:void(0)" className="maze-list__link">
                    Recursive Backtracking Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addKruskalMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Kruskal's Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addPrimMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Prim's Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addAldousBroderMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Aldous Broder Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addGrowingTreeMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Growing Tree Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addHuntAndKillMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Hunt and Kill Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addWilsonMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Wilson Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addEllerMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Eller Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress)
                        props.addRecursiveDivisionMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Recursive Division Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addSidewinderMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Sidewinder Algorithm Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addBinaryTreeMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
                    Binary Tree Maze
                </a>
            </li>
            <li
                className="maze-list__item"
                onClick={() => {
                    if (!props.isAlgoInProgress) props.addRandomMaze();
                }}
            >
                <a href="javascript:void(0)" className="maze-list__link">
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
                <a href="javascript:void(0)" className="side-nav__link">
                    <AlgoIcon className="side-nav__icon" />
                    Algorithms
                    <span className="side-nav__arrow-container">
                        {isOpen1 === true ? (
                            <Arrow className="side-nav__arrow-icon side-nav__arrow-icon--up" />
                        ) : (
                            <Arrow className="side-nav__arrow-icon side-nav__arrow-icon--down" />
                        )}
                    </span>
                </a>
                <nav
                    className={
                        isOpen2 === true
                            ? "algo-nav"
                            : "algo-nav algo-nav--closed"
                    }
                >
                    <ul className={classNameAlgo}>
                        {isOpen1 === true ? <AlgoList /> : null}
                    </ul>
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
                <a href="javascript:void(0)" className="side-nav__link">
                    <Maze className="side-nav__icon" />
                    Mazes & Patterns
                    <span className="side-nav__arrow-container">
                        {isOpen2 === true ? (
                            <Arrow className="side-nav__arrow-icon side-nav__arrow-icon--up" />
                        ) : (
                            <Arrow className="side-nav__arrow-icon side-nav__arrow-icon--down" />
                        )}
                        {/* Pour ajouter le tip dans maze-list du au fait que ca ne marche pas dans 
                        maze-nav du au scrollbar */}
                        {isOpen2 === true ? (
                            <div className="side-nav__mazetip"></div>
                        ) : null}
                    </span>
                </a>
                <nav
                    className={
                        isOpen2 === true
                            ? "maze-nav"
                            : "maze-nav maze-nav--closed"
                    }
                >
                    <ul className={classNameMaze}>
                        {isOpen2 === true ? <MazeList /> : null}
                    </ul>
                </nav>
            </li>
        </>
    );
}

//ReactDOM.render(<SubNav />, document.getElementById("root"));
