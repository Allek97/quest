import React, { Component, useState, useEffect, useRef } from "react";

import "./InformationComponant.scss";

export default function InformationComponant(props) {
    // Nos props

    //IDDFS et IDA*
    const {
        whichAlgoIsSelected,
        totalPathCost,
        visitedCount,
        lastDepthLevel,
        lastThreshold,
        thresholdCount,
    } = props;

    //Bellman Ford
    const { relaxationCountBF, negativeCycleBF } = props;

    useEffect(() => {
        //Nom des algorithmes selectionnés
        switch (whichAlgoIsSelected) {
            case "BFS":
                document.getElementById("selectedalgo").innerHTML =
                    "Breadth-first search";
                break;

            case "DFS":
                document.getElementById("selectedalgo").innerHTML =
                    "Depth-first search";
                break;

            case "Dijkstra":
                document.getElementById("selectedalgo").innerHTML = "Dijkstra";
                break;

            case "A* avec Distance Manhattan":
                document.getElementById("selectedalgo").innerHTML =
                    "A* avec Distance Manhattan";
                break;

            case "A* avec Distance Diagonale":
                document.getElementById("selectedalgo").innerHTML =
                    "A* avec Distance Diagonale";
                break;

            case "A* avec Distance Euclidienne":
                document.getElementById("selectedalgo").innerHTML =
                    "A* avec Distance Euclidienne";
                break;

            case "A* avec Distance Octile":
                document.getElementById("selectedalgo").innerHTML =
                    "A* avec Distance Octile";
                break;

            case "A* avec Distance Euclidienne au Carré":
                document.getElementById("selectedalgo").innerHTML =
                    "A* avec Distance Euclidienne au Carré";
                break;

            case "Bellman Ford":
                document.getElementById("selectedalgo").innerHTML =
                    "Bellman Ford";
                break;

            case "IDDFS":
                document.getElementById("selectedalgo").innerHTML =
                    "Iterative deepening depth for search";
                break;

            case "IDA* avec Distance Manhattan":
                document.getElementById("selectedalgo").innerHTML =
                    "IDA* avec Distance Manhattan";
                break;

            case "IDA* avec Distance Diagonale":
                document.getElementById("selectedalgo").innerHTML =
                    "IDA* avec Distance Diagonale";
                break;

            case "IDA* avec Distance Octile":
                document.getElementById("selectedalgo").innerHTML =
                    "IDA* avec Distance Octile";
                break;

            case "IDA* avec Distance Euclidienne au Carré":
                document.getElementById("selectedalgo").innerHTML =
                    "IDA* avec Distance Euclidienne au Carré";
                break;

            case "Greedy BFS":
                document.getElementById("selectedalgo").innerHTML =
                    "Greedy best-first search";
                break;

            case "Weighted Greedy BFS":
                document.getElementById("selectedalgo").innerHTML =
                    "Weighted Greedy best-first search";
                break;
            default:
                document.getElementById("selectedalgo").innerHTML =
                    "À determiner !";
                break;
        }

        //Cout total du path
        if (totalPathCost !== Infinity && totalPathCost) {
            const roundedTotalPathCost = totalPathCost.toFixed(2);
            document.getElementById(
                "pathcost"
            ).innerHTML = `${roundedTotalPathCost} unités`;
        } else {
            document.getElementById("pathcost").innerHTML = "À determiner !";
        }

        //Nombre de noeuds visités
        if (
            !whichAlgoIsSelected.includes("IDA*") &&
            !whichAlgoIsSelected.includes("IDDFS") &&
            !whichAlgoIsSelected.includes("Bellman Ford")
        ) {
            if (visitedCount !== Infinity) {
                document.getElementById(
                    "visited"
                ).innerHTML = `${visitedCount} noeuds`;
            } else {
                document.getElementById("visited").innerHTML = "À determiner !";
            }
        }

        //IDDFS depth level
        if (whichAlgoIsSelected.includes("IDDFS")) {
            if (lastDepthLevel !== Infinity) {
                document.getElementById(
                    "depthlevel"
                ).innerHTML = `${lastDepthLevel} niveaux`;
            } else {
                document.getElementById("depthlevel").innerHTML =
                    "À determiner !";
            }
        }

        //IDDFS treshold + treshold count
        if (whichAlgoIsSelected.includes("IDA*")) {
            //lastThreshold
            const roundedLastThreshold = lastThreshold.toFixed(2);
            if (lastThreshold !== Infinity) {
                document.getElementById(
                    "threshold"
                ).innerHTML = `${roundedLastThreshold} unités`;
            } else {
                document.getElementById("threshold").innerHTML =
                    "À determiner !";
            }
            //treshold count
            if (thresholdCount !== Infinity) {
                document.getElementById(
                    "threshold-count"
                ).innerHTML = `${thresholdCount} thresholds`;
            } else {
                document.getElementById("threshold-count").innerHTML =
                    "À determiner !";
            }
        }

        //Bellman Ford relaxation + status
        if (whichAlgoIsSelected.includes("Bellman Ford")) {
            //lastThreshold

            if (relaxationCountBF !== Infinity) {
                document.getElementById(
                    "relaxation"
                ).innerHTML = `${relaxationCountBF} relaxations`;
            } else {
                document.getElementById("relaxation").innerHTML =
                    "À determiner !";
            }
            //treshold count
            if (negativeCycleBF) {
                document.getElementById("status").innerHTML =
                    "Un ou plusieurs cycles negatifs detectés !";

                document.getElementById("pathcost").innerHTML =
                    "Ne peut pas être determiné !";
            } else {
                document.getElementById("status").innerHTML =
                    "Aucun cycle negatif detecté !";
            }
        }
    });

    return (
        <div className="informations">
            <h3 className="informations__title">Informations</h3>

            <div className="informations__selectedalgo-text">
                Algorithme selectionné :
            </div>
            <span
                className="informations__selectedalgo"
                id="selectedalgo"
            ></span>
            <div className="informations__pathcost-text">
                coût total du chemin:
            </div>
            <span className="informations__pathcost" id="pathcost"></span>

            {!whichAlgoIsSelected.includes("IDA*") &&
                !whichAlgoIsSelected.includes("IDDFS") &&
                !whichAlgoIsSelected.includes("Bellman Ford") && (
                    <>
                        <div className="informations__visited-text">
                            Nombre de noeuds visités :
                        </div>
                        <span
                            className="informations__visited"
                            id="visited"
                        ></span>
                    </>
                )}

            {whichAlgoIsSelected.includes("IDDFS") && (
                <>
                    <div className="informations__depthlevel-text">
                        nombre de depth levels explorés :
                    </div>
                    <span
                        className="informations__depthlevel"
                        id="depthlevel"
                    ></span>
                </>
            )}

            {whichAlgoIsSelected.includes("IDA*") && (
                <>
                    <div className="informations__threshold-text">
                        Valeur du dernier threshold :
                    </div>
                    <span
                        className="informations__threshold"
                        id="threshold"
                    ></span>
                    <div className="informations__threshold-count-text">
                        Nombre de thresholds calculés :
                    </div>
                    <span
                        className="informations__threshold-count"
                        id="threshold-count"
                    ></span>
                </>
            )}

            {whichAlgoIsSelected.includes("Bellman Ford") && (
                <>
                    <div className="informations__relaxation-text">
                        Nombre de relaxations :
                    </div>
                    <span
                        className="informations__relaxation"
                        id="relaxation"
                    ></span>
                    <div className="informations__status-text">
                        Status de l'algorithme :
                    </div>
                    <span className="informations__status" id="status">
                        À determiner !
                    </span>
                </>
            )}
        </div>
    );
}
