import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

// BRAIN COMPONANTS
import Grids from "./Grids";
import NavBar from "./navigationBar/NavBar";

import adjacencyListCreation from "./searchAlgorithms/utilitityFunctions/AdjacencyListCreation";
import adjacencyListCreationMaze from "./mazeCreations/utilityFunctionsMaze/AdjacencyListCreationMaze";

import { randomMaze } from "./mazeCreations/MainMazeList";
import backtrackingMaze from "./mazeCreations/BacktrackingMaze";
import kruskalMaze from "./mazeCreations/KruskalMaze";
import primMaze from "./mazeCreations/PrimMaze";
import aldousBroderMaze from "./mazeCreations/AldousBroderMaze";
import growingTreeMaze from "./mazeCreations/GrowingTreeMaze";
import huntAndKillMaze from "./mazeCreations/HuntAndKillMaze";
import wilsonMaze from "./mazeCreations/WilsonMaze";
import ellerMaze from "./mazeCreations/EllerMaze";
import recursiveDivisionMaze from "./mazeCreations/RecursiveDivisionMaze";
import sidewinderMaze from "./mazeCreations/SidewinderMaze";
import binaryTreeMaze from "./mazeCreations/BinaryTreeMaze";
import cellularAutomatonMaze from "./mazeCreations/CellularAutomatonMaze";

import animateAlgo from "./untilityFunctionsBrain/AnimateAlgo";
import animateBellmanFord from "./untilityFunctionsBrain/AnimateBellmanFord";
import animateIDAlgo from "./untilityFunctionsBrain/AnimateIDAlgo";
import resetCSS from "./untilityFunctionsBrain/ResetCSS";
import resetCSSAll from "./untilityFunctionsBrain/ResetCSSAll";
import activateWalls from "./untilityFunctionsBrain/ActivateWalls";
import activateWeights from "./untilityFunctionsBrain/ActivateWeights";
import activateShortcuts from "./untilityFunctionsBrain/ActivateShortcuts";
import dragItem from "./untilityFunctionsBrain/DragItem";
import updateStateBeforeAlgoStart from "./untilityFunctionsBrain/UpdateStateBeforeAlgoStart";
import resetWeights from "./untilityFunctionsBrain/ResetWeights";
import updateWallsState from "./untilityFunctionsBrain/UpdateWallsState";

import AlgoInformation from "./algoAndMazeInformation/AlgoInformation";
import OptionsComponant from "./optionsComponant/OptionsComponant";

import fillGridWithWalls from "./untilityFunctionsBrain/FillGridWithWalls";
import emptyGrid from "./untilityFunctionsBrain/EmptyGrid";

import Draggable, { DraggableCore } from "react-draggable";

import {
    BFS,
    DFS,
    dijkstra,
    aStar,
    classicGreedy,
    greedyBFS,
    bellmanFord,
    IDDFS,
    IDA,
    greedyBFSW,
} from "./searchAlgorithms/MainAlgorithmsList";

import {
    ROW_SIZE,
    COLUMN_SIZE,
    KNIGHT_ROW,
    KNIGHT_COL,
    PRINCESS_ROW,
    PRINCESS_COL,
} from "./abstracts/GlobalVariables";

import "./Brain.scss";

class Brain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isPressed: false,
            knightGettingDragged: false,
            princessGettingDragged: false,
            isAlgoInProgress: false,
            whichAlgoIsSelected: "",
            isOptionWheelOpen: false,
            isDiagonal: false,
            weightValue: 5,
            rewardValue: -0.5,
            // Done to collect information for the Option wheel componant
            //IDDFS et IDA*
            totalPathCost: Infinity,
            visitedCount: Infinity,
            lastDepthLevel: Infinity,
            lastThreshold: Infinity,
            thresholdCount: Infinity,
            //Bellman Ford
            relaxationCountBF: Infinity,
            negativeCycleBF: null,
        };
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < ROW_SIZE; row++) {
            for (let col = 0; col < COLUMN_SIZE; col++) {
                nodes.push({
                    key: uuidv4(),
                    id: uuidv4(),
                    isStart:
                        row === KNIGHT_ROW && col === KNIGHT_COL ? true : false,
                    isEnd:
                        row === PRINCESS_ROW && col === PRINCESS_COL
                            ? true
                            : false,
                    isWall: false,
                    row: row,
                    column: col,
                    isPressed: false,
                    isWeight: false,
                    weight: 1,
                    isShortcut: false,
                    shortcutValue: 1,
                    heuristic: Infinity,
                    totalDistance: Infinity,
                    previousNode: null,
                });
            }
        }
        this.setState({ nodes: nodes });
    }
    //////////////////////////////////
    // RESET BOARD
    resetBoard = (myFunction = () => {}) => {
        const nodes = [];
        for (let row = 0; row < ROW_SIZE; row++) {
            for (let col = 0; col < COLUMN_SIZE; col++) {
                nodes.push({
                    id: uuidv4(),
                    isStart:
                        row === KNIGHT_ROW && col === KNIGHT_COL ? true : false,
                    isEnd:
                        row === PRINCESS_ROW && col === PRINCESS_COL
                            ? true
                            : false,
                    isWall: false,
                    row: row,
                    column: col,
                    isPressed: false,
                    isWeight: false,
                    weight: 1,
                    isShortcut: false,
                    shortcutValue: 1,
                    heuristic: Infinity,
                    totalDistance: Infinity,
                    previousNode: null,
                });
            }
        }

        myFunction.name !== undefined
            ? this.setState({ nodes: nodes }, myFunction)
            : this.setState({ nodes: nodes });
    };

    //////////////////////////////////
    // MOUSE HANDLING : ADD WALLS,WEIGHTS,REWARDS ....
    handleMouseDown = (row, col, idDragged) => {
        activateWalls(this.state.nodes, row, col, idDragged);
        const htmlLink = document.getElementById(idDragged).className;

        if (htmlLink.includes("start")) {
            this.setState({ knightGettingDragged: true });
            const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        } else if (htmlLink.includes("end")) {
            console.log("asd");
            this.setState({ princessGettingDragged: true });
            const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        } else {
            this.setState({ isPressed: true });
        }
    };

    handleMouseEnter = (row, col, id) => {
        //console.log("isPressed ? : " + this.state.isPressed);
        if (
            !this.state.isPressed &&
            !this.state.knightGettingDragged &&
            !this.state.princessGettingDragged
        ) {
            return;
        }
        if (this.state.isPressed) activateWalls(this.state.nodes, row, col, id);
        if (this.state.knightGettingDragged)
            dragItem(
                this.state.nodes,
                id,
                "knight",
                this.state.whichAlgoRunnning
            );
        if (this.state.princessGettingDragged)
            dragItem(
                this.state.nodes,
                id,
                "princess",
                this.state.whichAlgoRunnning
            );
    };

    handleMouseUp = () => {
        this.setState({
            isPressed: false,
            knightGettingDragged: false,
            princessGettingDragged: false,
        });

        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        this.setState({ nodes: newNodes });
        // console.log("Mouse UP ? : " + this.state.isPressed);
    };

    addWeights = (row, col) => {
        activateWeights(this.state.nodes, row, col);
        this.setState({ isPressed: true });
    };

    addWeightsEnter = (row, col) => {
        if (this.state.isPressed === false) return;
        activateWeights(this.state.nodes, row, col);
    };

    addShortcuts = (row, col) => {
        activateShortcuts(this.state.nodes, row, col);
        this.setState({ isPressed: true });
    };

    addShortcutsEnter = (row, col) => {
        if (this.state.isPressed === false) return;
        activateShortcuts(this.state.nodes, row, col);
    };

    addResetWeights = (isWeighted) => {
        if (!isWeighted) return;
        resetWeights(this.state.nodes);
        const newNodes = updateStateBeforeAlgoStart(
            this.state.nodes,
            isWeighted
        );
        this.setState({ nodes: newNodes });
    };

    //////////////////////////////////
    // Algorithm information
    updateSelectedAlgo = (selectedAlgo) => {
        this.setState({ whichAlgoIsSelected: selectedAlgo });
    };

    ///////////////////////////////////
    // OPTIONS : DIAGONAL,WEIGHT/REWARD VALUE,SPEED
    updateDiagonal = (isDiagonal) => {
        this.setState({ isDiagonal: isDiagonal });
    };

    setOptionWheel = (isOptionWheelOpen) => {
        this.setState({ isOptionWheelOpen: isOptionWheelOpen });
    };
    //////////////////////////////////
    // ALGORITHMES
    startWeightedGreedyAlgorithm = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            greedyBFSW,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startIDA = (heuristicName) => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,lastThreshold,tresholdCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateIDAlgo(
            IDA,
            newNodes,
            heuristicName,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const lastThreshold = informationPackage[1];
        const thresholdCount = informationPackage[2];
        console.log(thresholdCount);

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            lastThreshold: lastThreshold,
            thresholdCount: thresholdCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startIDDFS = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,lastDepthLevel
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateIDAlgo(
            IDDFS,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage,
            200,
            50,
            175
        );
        const totalPathCost = informationPackage[0];
        const lastDepthLevel = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            lastDepthLevel: lastDepthLevel,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startBellmanFord = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,relaxationCount,negativeCycle
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateBellmanFord(
            newNodes,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const relaxationCountBF = informationPackage[1];
        const negativeCycleBF = informationPackage[2];

        console.log(relaxationCountBF);

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            relaxationCountBF: relaxationCountBF,
            negativeCycleBF: negativeCycleBF,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startBFS = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            BFS,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startDFS = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            DFS,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startDijkstra = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            dijkstra,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startAStarGreedyAlgorithm = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            greedyBFS,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startAStar = (heuristicFunction) => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            aStar,
            newNodes,
            heuristicFunction,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    startClassicGreedy = () => {
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        // THIS WILL HAVE ALL THE INFORMATIONS ABOUT(in order) totalPathCost,visitedCount
        let informationPackage = [];

        resetCSS(this.state.nodes);

        this.setState({ nodes: newNodes });

        const timeLength = animateAlgo(
            classicGreedy,
            newNodes,
            undefined,
            this.state.isDiagonal,
            informationPackage
        );

        const totalPathCost = informationPackage[0];
        const visitedCount = informationPackage[1];

        this.setState({
            isAlgoInProgress: true,
            totalPathCost: totalPathCost,
            visitedCount: visitedCount,
        });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, timeLength);
    };

    //////////////////////////////////
    // MAZE GENERATE
    addRandomMaze = () => {
        resetCSSAll(this.state.nodes);
        const newNodes = updateStateBeforeAlgoStart(this.state.nodes);
        const visitedTimeLength = randomMaze(newNodes)[1];

        this.setState({ isAlgoInProgress: true });

        setTimeout(() => {
            this.setState({ isAlgoInProgress: false });
        }, 10 * visitedTimeLength);
    };

    addBacktrackingMaze = (visitedSpeed = 15) => {
        let visitedMazeCells = new Set();

        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);

        this.setState({ isAlgoInProgress: true });

        backtrackingMaze(this.state.nodes, visitedMazeCells);
        const visitedTimeLength = (visitedMazeCells.size + 1) * 15 + 4500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                /*const gridWithWallsUpdated = updateWallsState(this.state.nodes);
        this.setState({ nodes: gridWithWallsUpdated });*/

                if (htmlLink === "item--animation") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addKruskalMaze = () => {
        let visitedMazeCells = new Set();

        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);
        //const newNodes = updateStateBeforeAlgoStartFunction(this.state.nodes);

        this.setState({ isAlgoInProgress: true });

        kruskalMaze(this.state.nodes, visitedMazeCells);
        const visitedTimeLength = (visitedMazeCells.size + 1) * 15 + 4500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "item--animation kruskal") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addPrimMaze = () => {
        let visitedMazeCells = new Set();

        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);
        //const newNodes = updateStateBeforeAlgoStartFunction(this.state.nodes);

        this.setState({ isAlgoInProgress: true });

        primMaze(this.state.nodes, visitedMazeCells);
        // 15 = vitesse + 5500 (4s de l'animation +1.5s pour tout transformer en wall)
        const visitedTimeLength = (visitedMazeCells.size + 1) * 15 + 6500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "item--animation prim") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addAldousBroderMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);
        //const newNodes = updateStateBeforeAlgoStartFunction(this.state.nodes);
        let visitedMazeCells = new Set();
        let visitedVertexList = [];

        this.setState({ isAlgoInProgress: true });

        aldousBroderMaze(this.state.nodes, visitedMazeCells, visitedVertexList);
        const visitedTimeLength = (visitedVertexList.length + 1) * 5 + 3000;

        console.log(visitedTimeLength);

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (
                    htmlLink === "leadvertex" ||
                    htmlLink === "aldousbroder" ||
                    htmlLink === "aldousbroder afterpassage"
                ) {
                    document.getElementById(node.id).className = "item";
                }
                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addGrowingTreeMaze = () => {
        let visitedMazeCells = new Set();

        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);
        //const newNodes = updateStateBeforeAlgoStartFunction(this.state.nodes);

        this.setState({ isAlgoInProgress: true });

        growingTreeMaze(this.state.nodes, visitedMazeCells);
        // 15 = vitesse + 5500 (4s de l'animation +1.5s pour tout transformer en wall)
        const visitedTimeLength = (visitedMazeCells.size + 1) * 15 + 6500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;
                if (htmlLink === "item--animation growingtree") {
                    document.getElementById(node.id).className = "item";
                }
                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addHuntAndKillMaze = () => {
        let visitedMazeCells = new Map();

        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);

        this.setState({ isAlgoInProgress: true });

        const huntData = huntAndKillMaze(
            this.state.nodes,
            visitedMazeCells,
            ROW_SIZE,
            COLUMN_SIZE
        );

        const animationSpeed = huntData[0];
        const scanAnimationSpeed = huntData[1];

        let visitedTimeLength = 0;

        visitedMazeCells.forEach((status, node) => {
            visitedTimeLength++;
            if (status[0] === "Wall") {
                visitedTimeLength +=
                    (scanAnimationSpeed * (status[1] + 1)) / animationSpeed;
            }
        });

        visitedTimeLength *= animationSpeed;
        visitedTimeLength += 2500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;
                if (
                    htmlLink === "huntandkill" ||
                    htmlLink === "huntscan passage" ||
                    htmlLink === "huntscan passagestate"
                ) {
                    document.getElementById(node.id).className = "item";
                }
                if (
                    htmlLink === "item-wall" ||
                    htmlLink === "huntscan wall" ||
                    htmlLink === "huntscan wallstate"
                ) {
                    document.getElementById(node.id).className = "item-wall";
                }
                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addWilsonMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);
        //const newNodes = updateStateBeforeAlgoStartFunction(this.state.nodes);
        let visitedMazeCells = new Map();
        let visitedVertexList = new Set();

        this.setState({ isAlgoInProgress: true });

        wilsonMaze(this.state.nodes, visitedMazeCells, visitedVertexList);
        const visitedTimeLength = (visitedMazeCells.size + 1) * 30 + 3500;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "leadvertex" || htmlLink === "wilson") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addEllerMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);

        let visitedMazeCells = new Map();
        let visitedVertexList = new Set();

        this.setState({ isAlgoInProgress: true });

        ellerMaze(
            this.state.nodes,
            visitedMazeCells,
            visitedVertexList,
            ROW_SIZE,
            COLUMN_SIZE
        );
        const visitedTimeLength = (visitedMazeCells.size + 1) * 35 + 4000;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "eller" || htmlLink === "leadvertex") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addRecursiveDivisionMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        emptyGrid(this.state.nodes);

        let visitedMazeCells = new Map();
        let adjacencyListMaze = new Map();
        let positionList = new Map();

        adjacencyListCreation(this.state.nodes, positionList);
        adjacencyListCreationMaze(this.state.nodes, adjacencyListMaze);

        this.setState({ isAlgoInProgress: true });

        recursiveDivisionMaze(
            this.state.nodes,
            adjacencyListMaze,
            visitedMazeCells,
            positionList,
            COLUMN_SIZE,
            ROW_SIZE,
            [0, 0],
            "BASE"
        );

        let spaceTime = 1;

        const visitedMazeCellsKeys = [...visitedMazeCells.keys()];
        let pairingCount = 0;

        visitedMazeCells.forEach((previousNode, node) => {
            if (pairingCount === 0) {
                visitedMazeCells.set(node, visitedMazeCellsKeys[0]);
            } else {
                visitedMazeCells.set(
                    node,
                    visitedMazeCellsKeys[pairingCount - 1]
                );
            }
            pairingCount++;
        });

        setTimeout(() => {
            visitedMazeCells.forEach((previousNode, node, idx) => {
                spaceTime++;

                setTimeout(() => {
                    const htmlLink = document.getElementById(node.id).className;

                    document.getElementById(node.id).className =
                        "item-wall--animation recursive-division";
                    // document.getElementById(node.id).className = "leadvertex";
                }, 10 * spaceTime);
            });
        }, 100);

        const visitedTimeLength = (visitedMazeCells.size + 1) * 10 + 2100;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addSidewinderMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);

        let visitedMazeCells = new Map();

        this.setState({ isAlgoInProgress: true });

        sidewinderMaze(this.state.nodes, visitedMazeCells);
        const visitedTimeLength = (visitedMazeCells.size + 1) * 10 + 4000;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "sidewinder" || htmlLink === "leadvertex") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    addBinaryTreeMaze = () => {
        let knightRow, knightCol, princessRow, princessCol;

        this.state.nodes.map((node, nodeIdx) => {
            const htmlLink = document.getElementById(node.id).className;
            if (htmlLink.includes("start")) {
                knightRow = node.row;
                knightCol = node.column;
            } else if (htmlLink.includes("end")) {
                princessRow = node.row;
                princessCol = node.column;
            }
        });

        fillGridWithWalls(this.state.nodes);

        let visitedMazeCells = new Map();

        this.setState({ isAlgoInProgress: true });

        binaryTreeMaze(this.state.nodes, visitedMazeCells);
        const visitedTimeLength = (visitedMazeCells.size + 1) * 5 + 4000;

        setTimeout(() => {
            let newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });

            this.state.nodes.map((node) => {
                const htmlLink = document.getElementById(node.id).className;

                if (htmlLink === "binarytree" || htmlLink === "leadvertex") {
                    document.getElementById(node.id).className = "item";
                }

                if (node.row === knightRow && node.column === knightCol) {
                    document.getElementById(node.id).className = "item-start";
                }
                if (node.row === princessRow && node.column === princessCol) {
                    document.getElementById(node.id).className = "item-end";
                }
            });

            this.setState({ isAlgoInProgress: false });
            newNodes = updateStateBeforeAlgoStart(this.state.nodes);
            this.setState({ nodes: newNodes });
        }, visitedTimeLength);
    };

    // Wikipedia Cellular automaton algorithms + Cellular automaton algorithms
    /* addCellularAutomatonMaze = () => {
    let knightRow, knightCol, princessRow, princessCol;

    this.state.nodes.map((node, nodeIdx) => {
      const htmlLink = document.getElementById(node.id).className;
      if (htmlLink.includes("start")) {
        knightRow = node.row;
        knightCol = node.column;
      } else if (htmlLink.includes("end")) {
        princessRow = node.row;
        princessCol = node.column;
      }
    });

    fillGridWithWalls(this.state.nodes);

    let visitedMazeCells = new Map();
    let visitedVertexList = new Set();

    this.setState({ isAlgoInProgress: true });

    cellularAutomatonMaze(
      this.state.nodes,
      visitedMazeCells,
      visitedVertexList,
      ROW_SIZE,
      COLUMN_SIZE
    );
    const visitedTimeLength = (visitedMazeCells.size + 1) * 35 + 4000;

    setTimeout(() => {
      this.setState({ isAlgoInProgress: false });
      const newNodes = updateStateBeforeAlgoStart(this.state.nodes,);
      this.setState({ nodes: newNodes });

      this.state.nodes.map((node) => {
        const htmlLink = document.getElementById(node.id).className;

        if (htmlLink === "eller" || htmlLink === "leadvertex") {
          document.getElementById(node.id).className = "item";
        }

        if (node.row === knightRow && node.column === knightCol) {
          document.getElementById(node.id).className = "item-start";
        }
        if (node.row === princessRow && node.column === princessCol) {
          document.getElementById(node.id).className = "item-end";
        }
      });
    }, visitedTimeLength);
  };*/

    render() {
        const { nodes, isPressed } = this.state;

        return (
            <div className="container" draggable={false}>
                <NavBar
                    //Search Algo
                    startDFS={this.startDFS}
                    startBFS={this.startBFS}
                    startDijkstra={this.startDijkstra}
                    startAStar={this.startAStar}
                    startAStarGreedyAlgorithm={this.startAStarGreedyAlgorithm}
                    startBellmanFord={this.startBellmanFord}
                    startClassicGreedy={this.startClassicGreedy}
                    startIDDFS={this.startIDDFS}
                    startIDA={this.startIDA}
                    startWeightedGreedyAlgorithm={
                        this.startWeightedGreedyAlgorithm
                    }
                    // Important utilities
                    updateStateBeforeAlgoStart={this.updateStateBeforeAlgoStart}
                    resetBoard={this.resetBoard}
                    //resetCSS={this.resetCSS}
                    // Maze Algos
                    addRandomMaze={this.addRandomMaze}
                    addBacktrackingMaze={this.addBacktrackingMaze}
                    addKruskalMaze={this.addKruskalMaze}
                    addPrimMaze={this.addPrimMaze}
                    addAldousBroderMaze={this.addAldousBroderMaze}
                    addGrowingTreeMaze={this.addGrowingTreeMaze}
                    addHuntAndKillMaze={this.addHuntAndKillMaze}
                    addWilsonMaze={this.addWilsonMaze}
                    addEllerMaze={this.addEllerMaze}
                    addCellularAutomatonMaze={this.addCellularAutomatonMaze}
                    addRecursiveDivisionMaze={this.addRecursiveDivisionMaze}
                    addSidewinderMaze={this.addSidewinderMaze}
                    addBinaryTreeMaze={this.addBinaryTreeMaze}
                    //States
                    isAlgoInProgress={this.state.isAlgoInProgress}
                    nodes={this.state.nodes}
                    //IsWeighted ?
                    isWeighted={this.props.isWeighted}
                    setIsWeighted={this.props.setIsWeighted}
                    addResetWeights={this.addResetWeights}
                    //WhichAlgoIsSelected
                    updateSelectedAlgo={this.updateSelectedAlgo}
                    //Open Option Wheel when algo is selected
                    setOptionWheel={this.setOptionWheel}
                    // Update the new weight/reward values
                    setWeightRewardValue={this.setWeightRewardValue}
                />

                <OptionsComponant
                    isAlgoInProgress={this.state.isAlgoInProgress}
                    isDiagonal={this.state.isDiagonal}
                    updateDiagonal={this.updateDiagonal}
                    isOptionWheelOpen={this.state.isOptionWheelOpen}
                    isWeighted={this.props.isWeighted}
                    // For the information componants
                    //  nodes={this.state.nodes}
                    whichAlgoIsSelected={this.state.whichAlgoIsSelected}
                    // IDDFS et IDA*
                    totalPathCost={this.state.totalPathCost}
                    visitedCount={this.state.visitedCount}
                    lastDepthLevel={this.state.lastDepthLevel}
                    lastThreshold={this.state.lastThreshold}
                    thresholdCount={this.state.thresholdCount}
                    // Bellman Ford
                    relaxationCountBF={this.state.relaxationCountBF}
                    negativeCycleBF={this.state.negativeCycleBF}
                />

                <div className="grid">
                    <AlgoInformation
                        whichAlgoIsSelected={this.state.whichAlgoIsSelected}
                    />
                    <div className="grid__grid2d" draggable={false}>
                        {nodes.map((node, rowIdx) => {
                            return (
                                <Grids
                                    key={node.key}
                                    id={node.id}
                                    node={node}
                                    isStart={node.isStart}
                                    isEnd={node.isEnd}
                                    isWall={node.isWall}
                                    isWeight={node.isWeight}
                                    isShortcut={node.isShortcut}
                                    shortcutValue={node.shortcutValue}
                                    row={node.row}
                                    column={node.column}
                                    weight={node.weight}
                                    heuristic={node.heur}
                                    totalDistance={node.totalDistance}
                                    previousNode={node.previousNode}
                                    isAlgoInProgress={
                                        this.state.isAlgoInProgress
                                    }
                                    handleMouseDown={(row, column, id) =>
                                        this.handleMouseDown(row, column, id)
                                    }
                                    handleMouseEnter={(row, column, id) =>
                                        this.handleMouseEnter(row, column, id)
                                    }
                                    handleMouseUp={() => this.handleMouseUp()}
                                    addWeights={this.addWeights}
                                    addWeightsEnter={this.addWeightsEnter}
                                    addShortcuts={this.addShortcuts}
                                    addShortcutsEnter={this.addShortcutsEnter}
                                    //Is algo weighted or not
                                    isWeighted={this.props.isWeighted}
                                    setIsWeighted={this.props.setIsWeighted}

                                    /* handleDragOver={this.handleDragOver}
                                    handleDragStart={this.handleDragStart}
                                   handleDrop={this.handleDrop}*/
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Brain;

/* handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDragStart = (e, id) => {
    //console.log("dragstart : ", id);
    e.dataTransfer.setData("id", id);
    //console.log((document.getElementById(id).className = "item"));

    setTimeout(() => {
      document.getElementById(id).className = "item";
    }, 0);
  };

  handleDrop = (e, idDrop, row, col) => {
    let id = e.dataTransfer.getData("id");

    //document.getElementById(idDrop).className = "item-start";
    console.log(id);
    let newNodes = this.state.nodes.filter((node) => {
      if (node.row === row && node.column === col) {
        node.isStart = true;
      } else {
        node.isStart = false;
      }
      return node;
    });
    this.setState({ nodes: newNodes });
  };*/
