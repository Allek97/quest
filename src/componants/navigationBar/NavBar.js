import React, { Component } from "react";
import ReactDOM from "react-dom";
import SubNav from "./SubNav.js";
import { ReactComponent as Logo } from "../../svgs/bigCrown.svg";
import { ReactComponent as StartButton } from "../../svgs/travel.svg";
import { ReactComponent as CrossedSwords } from "../../svgs/crossedSword.svg";
import { ReactComponent as Catapult } from "../../svgs/catapult.svg";

import "./NavBar.scss";

import resetCSS from "../untilityFunctionsBrain/ResetCSS";

import manhattanDistance from "../searchAlgorithms/utilitityFunctions/heuristics/ManhattanDistance.js";
import diagonalDistance from "../searchAlgorithms/utilitityFunctions/heuristics/DiagonalDistance.js";
import euclidienDistance from "../searchAlgorithms/utilitityFunctions/heuristics/EuclidienDistance.js";
import squaredEuclidienDistance from "../searchAlgorithms/utilitityFunctions/heuristics/SquaredEuclideanDistance.js";

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
    if (algoName.substring(10, 12) === "A*") {
      this.setState({ algoDisplay: "Visualise A*!" });
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
      case "Visualise Basic Greedy!":
        startClassicGreedy();
        break;
      case "Visualise Bellman Ford!":
        startBellmanFord();
        break;

      default:
        return;
    }
  };

  render() {
    const styleBackground = this.props.isAlgoInProgress ? "#df506f" : "#2fb784";

    const name =
      this.state.algoDisplay === "Choisis ton algorithme!" ||
      this.state.algoDisplay === "Visualise Greedy BFS!" ||
      this.state.algoDisplay === "Visualise Bellman Ford!" ||
      this.state.algoDisplay === "Visualise Basic Greedy!" ||
      this.state.algoDisplay === "Visualise Dijkstra!"
        ? "name"
        : "algoname";

    return (
      <div className="navBar">
        <div className="logo">
          <Logo />
          Quest
        </div>
        <ul>
          <li
            className="launch-button"
            onClick={(e) => {
              if (!this.props.isAlgoInProgress) {
                this.algoStart();
              }
            }}
            style={{
              backgroundColor: styleBackground,
            }}
          >
            <StartButton />
            <a href="#" className="btn">
              <p className={name}>{this.state.algoDisplay}</p>
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
            addCellularAutomatonMaze={this.props.addCellularAutomatonMaze}
            addRecursiveDivisionMaze={this.props.addRecursiveDivisionMaze}
            addSidewinderMaze={this.props.addSidewinderMaze}
            addBinaryTreeMaze={this.props.addBinaryTreeMaze}
            isAlgoInProgress={this.props.isAlgoInProgress}
          />

          <li
            className="clear-board"
            onClick={() => {
              if (!this.props.isAlgoInProgress) this.props.resetBoard();
            }}
          >
            <CrossedSwords />
            <a href="#" className="btn">
              Clear Board
            </a>
          </li>

          <li
            className="clear-walls"
            onClick={() => {
              if (!this.props.isAlgoInProgress) resetCSS(this.props.nodes);
            }}
          >
            <Catapult />
            <a href="#" className="btn">
              Clear Path
              <br /> & Tracks
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
