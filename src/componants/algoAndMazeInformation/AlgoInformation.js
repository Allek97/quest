import React, { Component } from "react";

import { ReactComponent as Information } from "../../svgs/info-icon.svg";

import "./AlgoInformation.scss";

export default function AlgoInformation(props) {
    const { whichAlgoIsSelected } = props;

    return (
        <div className="grid__information">
            {whichAlgoIsSelected === "" && (
                <p className="heading heading--start">
                    Vous pouvez selectionner des
                    <span className="heading__complement">
                        algorithmes de recherches
                    </span>{" "}
                    dans la barre de navigation a gauche dans l'onglet
                    <span className="heading__complement">Algorithms</span>
                    et/ou selectionner des{" "}
                    <span className="heading__complement">
                        algorithmes de génération de labyrinthes
                    </span>{" "}
                    dans l'onglet
                    <span className="heading__complement">
                        Mazes and Patterns
                    </span>
                </p>
            )}

            {whichAlgoIsSelected === "BFS" && (
                <p className="heading">
                    <span className="heading__complement">
                        Breadth-first search
                    </span>
                    est un algorithme{" "}
                    <span className="heading__complement">non-pondéré</span>qui
                    <span className="heading__complement">garantit</span>
                    le chemin optimal
                </p>
            )}

            {whichAlgoIsSelected === "DFS" && (
                <p className="heading">
                    <span className="heading__complement">
                        Depth-first search
                    </span>
                    est un algorithme{" "}
                    <span className="heading__complement">non-pondéré</span>qui
                    <span className="heading__complement">ne garantit pas</span>
                    le chemin optimal
                </p>
            )}

            {whichAlgoIsSelected === "Dijkstra" && (
                <p className="heading">
                    <span className="heading__complement">Dijkstra</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>qui
                    <span className="heading__complement">garantit</span>
                    le chemin optimal
                </p>
            )}

            {whichAlgoIsSelected === "A* avec Distance Manhattan" && (
                <p className="heading">
                    <span className="heading__complement">A*</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>,
                    <span className="heading__complement">
                        la distance de Manhattan
                    </span>
                    selectionnée est une heuristique{" "}
                    <span className="heading__complement">admissible</span> donc
                    A* est
                    <span className="heading__complement">garantit</span>
                    de trouver le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected === "A* avec Distance Diagonale" && (
                <p className="heading">
                    <span className="heading__complement">A*</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>,
                    <span className="heading__complement">
                        la distance Diagonale
                    </span>
                    selectionnée est une heuristique{" "}
                    <span className="heading__complement">admissible</span> donc
                    A* est
                    <span className="heading__complement">garantit</span>
                    de trouver le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected === "A* avec Distance Euclidienne" && (
                <p className="heading">
                    <span className="heading__complement">A*</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>,
                    <span className="heading__complement">
                        la distance Euclidienne
                    </span>
                    selectionnée est une heuristique{" "}
                    <span className="heading__complement">admissible</span> donc
                    A* est
                    <span className="heading__complement">garantit</span>
                    de trouver le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected === "A* avec Distance Octile" && (
                <p className="heading">
                    <span className="heading__complement">A*</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>,
                    <span className="heading__complement">
                        la distance Octile
                    </span>
                    selectionnée est une heuristique{" "}
                    <span className="heading__complement">admissible</span> donc
                    A* est
                    <span className="heading__complement">garantit</span>
                    de trouver le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected ===
                "A* avec Distance Euclidienne au Carré" && (
                <p className="heading heading--long">
                    <span className="heading__complement">A*</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>,
                    <span className="heading__complement">
                        la distance Euclidienne au Carré
                    </span>
                    selectionnée est une heuristique qui
                    <span className="heading__complement">
                        n'est pas admissible
                    </span>
                    donc A*
                    <span className="heading__complement">
                        n'est pas garantit
                    </span>
                    de trouver le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected === "Bellman Ford" && (
                <p className="heading heading--bellmanFord">
                    <span className="heading__complement">Bellman Ford</span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré.</span>Il
                    permet dans son analyse de prendre en consideration les
                    <span className="heading__complement">recompences</span>,
                    c-à-d les noeuds à valeurs negatives ou inferieur à 1. Il
                    <span className="heading__complement">garantit</span>
                    le chemin optimal.
                </p>
            )}

            {whichAlgoIsSelected === "IDDFS" && (
                <div className="iddfs-block">
                    <p className="heading heading--iddfs">
                        <span className="heading__complement">
                            Iterative deepening depth for search
                        </span>
                        est un algorithme{" "}
                        <span className="heading__complement">
                            non-pondéré.
                        </span>
                        L'implementation de l'algorithme dans un graph
                        <span className="heading__complement">
                            non-orienteé (undirected) ne garantit pas
                        </span>
                        le chemin optimal.
                    </p>
                    <div className="heading__supplement-info">
                        <span className="heading__info-logo"></span>
                    </div>
                </div>
            )}

            {whichAlgoIsSelected === "IDA* avec Distance Manhattan" && (
                <div className="ida-block">
                    <p className="heading heading--ida">
                        <span className="heading__complement">
                            Iterative deepening A*
                        </span>
                        est un algorithme{" "}
                        <span className="heading__complement">pondéré.</span>
                        L'implementation de l'algorithme dans un graph
                        <span className="heading__complement">
                            non-orienteé (undirected) ne garantit pas
                        </span>
                        le chemin optimal.
                        <span className="heading__complement">
                            La distance de Manhattan
                        </span>
                        selectionnée est une heuristique{" "}
                        <span className="heading__complement">admissible</span>{" "}
                        qui peut
                        <span className="heading__complement">garantir</span> un
                        chemin optimale dans{" "}
                        <span className="heading__complement">
                            d'autres types de graphs
                        </span>
                        (directed acyclic graphs)
                    </p>
                    <div className="heading__supplement-info heading__supplement-info--ida-algo">
                        <span className="heading__info-logo"></span>
                    </div>
                </div>
            )}

            {whichAlgoIsSelected === "IDA* avec Distance Diagonale" && (
                <div className="ida-block">
                    <p className="heading heading--ida">
                        <span className="heading__complement">
                            Iterative deepening A*
                        </span>
                        est un algorithme{" "}
                        <span className="heading__complement">pondéré.</span>
                        L'implementation de l'algorithme dans un graph
                        <span className="heading__complement">
                            non-orienteé (undirected) ne garantit pas
                        </span>
                        le chemin optimal.
                        <span className="heading__complement">
                            La distance Diagonale
                        </span>
                        selectionnée est une heuristique{" "}
                        <span className="heading__complement">admissible</span>{" "}
                        qui peut
                        <span className="heading__complement">garantir</span> un
                        chemin optimale dans
                        <span className="heading__complement">
                            d'autres types de graphs
                        </span>
                        (directed acyclic graphs)
                    </p>
                    <div className="heading__supplement-info heading__supplement-info--ida-algo">
                        <span className="heading__info-logo"></span>
                    </div>
                </div>
            )}

            {whichAlgoIsSelected === "IDA* avec Distance Octile" && (
                <div className="ida-block">
                    <p className="heading heading--ida">
                        <span className="heading__complement">
                            Iterative deepening A*
                        </span>
                        est un algorithme{" "}
                        <span className="heading__complement">pondéré.</span>
                        L'implementation de l'algorithme dans un graph
                        <span className="heading__complement">
                            non-orienteé (undirected) ne garantit pas
                        </span>
                        le chemin optimal.
                        <span className="heading__complement">
                            La distance Octile
                        </span>
                        selectionnée est une heuristique{" "}
                        <span className="heading__complement">admissible</span>{" "}
                        qui peut
                        <span className="heading__complement">garantir</span> un
                        chemin optimale dans
                        <span className="heading__complement">
                            d'autres types de graphs
                        </span>
                        (directed acyclic graphs)
                    </p>
                    <div className="heading__supplement-info heading__supplement-info--ida-algo">
                        <span className="heading__info-logo"></span>
                    </div>
                </div>
            )}

            {whichAlgoIsSelected ===
                "IDA* avec Distance Euclidienne au Carré" && (
                <div className="ida-block ida-block--euclidienne-carre">
                    <p className="heading heading--ec">
                        <span className="heading__complement">
                            Iterative deepening A*
                        </span>
                        est un algorithme{" "}
                        <span className="heading__complement">pondéré.</span>
                        L'implementation de l'algorithme dans un graph
                        <span className="heading__complement">
                            non-orienteé (undirected) ne garantit pas
                        </span>
                        le chemin optimal.
                        <span className="heading__complement">
                            La distance Euclidienne au Carré
                        </span>
                        selectionnée est une heuristique qui{" "}
                        <span className="heading__complement">
                            n'est pas admissible
                        </span>{" "}
                        donc le chemin optimale{" "}
                        <span className="heading__complement">
                            n'est pas garantit
                        </span>
                        meme dans{" "}
                        <span className="heading__complement">
                            d'autres types de graphs
                        </span>
                    </p>
                    <div className="heading__supplement-info heading__supplement-info--ida-algo">
                        <span className="heading__info-logo"></span>
                    </div>
                </div>
            )}

            {whichAlgoIsSelected === "Greedy BFS" && (
                <p className="heading">
                    <span className="heading__complement">
                        Greedy best-first search
                    </span>
                    est un algorithme{" "}
                    <span className="heading__complement">non-pondéré</span>qui
                    <span className="heading__complement">ne garantit pas</span>
                    le chemin optimal. Cette algortithme utilise
                    <span className="heading__complement">
                        la distance de Manhattan
                    </span>
                    comme heuristique
                </p>
            )}

            {whichAlgoIsSelected === "Weighted Greedy BFS" && (
                <p className="heading heading--wgbfs">
                    <span className="heading__complement">
                        Weighted Greedy best-first search
                    </span>
                    est un algorithme{" "}
                    <span className="heading__complement">pondéré</span>qui
                    <span className="heading__complement">ne garantit pas</span>
                    le chemin optimal. Cette algortithme utilise
                    <span className="heading__complement">
                        la distance de Manhattan
                    </span>
                    comme heuristique
                </p>
            )}
        </div>
    );
}
