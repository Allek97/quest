/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SubNav from "./SubNav.js";
import { ReactComponent as StartButton } from "../../svgs/travel.svg";
import { ReactComponent as CrossedSwords } from "../../svgs/crossedSword.svg";
import { ReactComponent as Catapult } from "../../svgs/catapult.svg";

import "./NavBar.scss";

import resetCSS from "../untilityFunctionsBrain/ResetCSS";

import manhattanDistance from "../searchAlgorithms/utilitityFunctions/heuristics/ManhattanDistance.js";
import diagonalDistance from "../searchAlgorithms/utilitityFunctions/heuristics/DiagonalDistance.js";
import euclidienDistance from "../searchAlgorithms/utilitityFunctions/heuristics/EuclidienDistance.js";
import squaredEuclidienDistance from "../searchAlgorithms/utilitityFunctions/heuristics/SquaredEuclideanDistance.js";
import octileDistance from "../searchAlgorithms/utilitityFunctions/heuristics/OctileDistance.js";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algoName: "",
            algoDisplay: "Choisis ton algorithme!",
            selectedAlgo: false,
        };
    }

    setAlgo = (algoName) => {
        if (algoName.includes(" A*")) {
            this.setState({ algoDisplay: "Visualise A*!" });
            this.setState({ algoName: algoName });
            this.setState({ selectedAlgo: true });
        } else if (algoName.includes(" IDA*")) {
            this.setState({ algoDisplay: "Visualise IDA*!" });
            this.setState({ algoName: algoName });
            this.setState({ selectedAlgo: true });
        } else {
            this.setState({ algoName: algoName });
            this.setState({ algoDisplay: algoName });
            this.setState({ selectedAlgo: true });
        }
        this.setState({ algoName: algoName });
    };

    algoStart = () => {
        const { algoName } = this.state;
        const {
            startDijkstra,
            startBFS,
            startDFS,
            startAStar,
            startAStarGreedyAlgorithm,
            startBellmanFord,
            startClassicGreedy,
            startIDDFS,
            startIDA,
            startWeightedGreedyAlgorithm,
        } = this.props;

        //console.log(algoName);

        switch (algoName) {
            case "Visualise A* avec Distance Manhattan!":
                startAStar(manhattanDistance);
                break;
            case "Visualise A* avec Distance Diagonale!":
                startAStar(diagonalDistance);
                break;
            case "Visualise A* avec Distance Euclidienne!":
                startAStar(euclidienDistance);
                break;
            case "Visualise A* avec Distance Octile!":
                startAStar(octileDistance);
                break;
            case "Visualise A* avec Distance Euclidienne au Carré!":
                startAStar(squaredEuclidienDistance);
                break;
            case "Visualise Dijkstra!":
                startDijkstra();
                break;
            case "Visualise BFS!":
                startBFS();
                break;
            case "Visualise DFS!":
                startDFS();
                break;
            case "Visualise Greedy BFS!":
                startAStarGreedyAlgorithm();
                break;
            case "Visualise Weighted Greedy BFS!":
                startWeightedGreedyAlgorithm();
                break;
            case "Visualise Basic Greedy!":
                startClassicGreedy();
                break;
            case "Visualise Bellman Ford!":
                startBellmanFord();
                break;
            case "Visualise IDDFS!":
                startIDDFS();
                break;
            case "Visualise IDA* avec Distance Manhattan!":
                startIDA(manhattanDistance);
                break;
            case "Visualise IDA* avec Distance Diagonale!":
                startIDA(diagonalDistance);
                break;
            case "Visualise IDA* avec Distance Euclidienne!":
                startIDA(euclidienDistance);
                break;
            case "Visualise IDA* avec Distance Octile!":
                startIDA(octileDistance);
                break;
            case "Visualise IDA* avec Distance Euclidienne au Carré!":
                startIDA(squaredEuclidienDistance);
                break;

            default:
                return;
        }
    };

    render() {
        // VOIR ROOT POUR LES COULEURS
        const colorSecondary = "#09c199";
        const colorPrimaryLight2 = "#bb2727";

        const styleBackground = this.props.isAlgoInProgress
            ? colorPrimaryLight2
            : colorSecondary;

        //If the launch-button is pink we dont want a green hover over it
        const hoverState = this.props.isAlgoInProgress
            ? "side-nav__item--nohover"
            : "";

        return (
            <nav className="navbar">
                <ul className="side-nav">
                    <li
                        className={
                            "side-nav__item side-nav__item--launch-button " +
                            hoverState
                        }
                        onClick={(e) => {
                            if (!this.props.isAlgoInProgress) {
                                /*  if (this.props.isWeighted) {
                                    //Update weigth and rewards
                                    const weightValue = document.getElementById(
                                        "rs-range-line-weight"
                                    ).value;
                                    const rewardValue = document.getElementById(
                                        "rs-range-line-reward"
                                    ).value;
                                    this.props.setWeightRewardValue(
                                        +weightValue,
                                        +rewardValue
                                    );
                                }*/
                                this.algoStart();
                            }
                        }}
                        style={{
                            backgroundColor: styleBackground,
                        }}
                    >
                        <a href="javascript:void(0)" className="side-nav__link">
                            <StartButton className="side-nav__icon side-nav__icon--start-button" />
                            <p className="side-nav__algoname">
                                {this.state.algoDisplay}
                            </p>
                        </a>
                    </li>

                    <SubNav
                        setAlgo={this.setAlgo}
                        addRandomMaze={this.props.addRandomMaze}
                        addBacktrackingMaze={this.props.addBacktrackingMaze}
                        addKruskalMaze={this.props.addKruskalMaze}
                        addPrimMaze={this.props.addPrimMaze}
                        addAldousBroderMaze={this.props.addAldousBroderMaze}
                        addGrowingTreeMaze={this.props.addGrowingTreeMaze}
                        addHuntAndKillMaze={this.props.addHuntAndKillMaze}
                        addWilsonMaze={this.props.addWilsonMaze}
                        addEllerMaze={this.props.addEllerMaze}
                        addCellularAutomatonMaze={
                            this.props.addCellularAutomatonMaze
                        }
                        addRecursiveDivisionMaze={
                            this.props.addRecursiveDivisionMaze
                        }
                        addSidewinderMaze={this.props.addSidewinderMaze}
                        addBinaryTreeMaze={this.props.addBinaryTreeMaze}
                        isAlgoInProgress={this.props.isAlgoInProgress}
                        //ISWEIGHTED OR NOT
                        setIsWeighted={this.props.setIsWeighted}
                        addResetWeights={this.props.addResetWeights}
                        //WhichAlgoIsSelected
                        updateSelectedAlgo={this.props.updateSelectedAlgo}
                        //Open Option Wheel When Algo Is Selected
                        setOptionWheel={this.props.setOptionWheel}
                    />

                    <li
                        className="side-nav__item side-nav__item--clear-board"
                        onClick={() => {
                            if (!this.props.isAlgoInProgress)
                                this.props.resetBoard();
                        }}
                    >
                        <a href="javascript:void(0)" className="side-nav__link">
                            <CrossedSwords className="side-nav__icon" />
                            Clear Board
                        </a>
                    </li>

                    <li
                        className="side-nav__item side-nav__item--clear-walls"
                        onClick={() => {
                            if (!this.props.isAlgoInProgress)
                                resetCSS(this.props.nodes);
                        }}
                    >
                        <a href="javascript:void(0)" className="side-nav__link">
                            <Catapult className="side-nav__icon" />
                            Clear Path & Tracks
                        </a>
                    </li>
                </ul>

                <div class="legal">
                    &copy; {new Date().getFullYear()} by Ilias Allek. All rights
                    reserved.
                </div>
            </nav>
        );
    }
}

export default NavBar;
