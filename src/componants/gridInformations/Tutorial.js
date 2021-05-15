import React, { Component, useState, useEffect } from "react";

import useDelayUnmount from "../utilityComponants/UseDelayUnmount";

import "./Tutorial.scss";

import "../base/_animations.scss";

import { ReactComponent as Enjoy } from "../../svgs/enjoy.svg";

export default function Tutorial(params) {
    let [isTutoOpen, setTutoOpen] = useState(false);
    const [isBackgroundExpand, setBackgroundExpand] = useState(false);
    const [isMount, setMount] = useState(false);

    const mountedStyle = {
        animation: "tutorialAppear 1s cubic-bezier(0.86, 0, 0.07, 1) 1",
    };
    const unmountedStyle = {
        animation: "tutorialDisappear 1s cubic-bezier(0.86, 0, 0.07, 1) 1",
    };

    isTutoOpen = useDelayUnmount(isMount, 1000);

    return (
        <>
            <div className="tuto">Tutoriel</div>
            <div
                className="roblox"
                onClick={() => {
                    setTutoOpen(!isTutoOpen);
                    setBackgroundExpand(!isBackgroundExpand);
                    setMount(!isMount);
                }}
            >
                <div className="roblox__item"></div>
            </div>
            <div
                className={
                    isBackgroundExpand
                        ? "background background--expand"
                        : "background"
                }
            ></div>
            <div
                className={isTutoOpen ? "tutorial" : "tutorial--closed"}
                style={isMount ? mountedStyle : unmountedStyle}
            >
                <div className="introduction">
                    <span className="introduction__logo"></span>
                    <span className="introduction__marker">1/11</span>
                    <h1 className="introduction__heading">Quest</h1>
                    <h2 className="introduction__text-1">
                        Bravez les obstacles pour sauver la princesse
                    </h2>

                    <a
                        className="introduction__button btn btn--violet"
                        href="#explanation"
                    >
                        tutoriel
                        <span
                            style={{
                                position: "absolute",
                                top: "1.3rem",
                                right: "2.5rem",
                            }}
                        >
                            &darr;
                        </span>
                    </a>
                </div>

                <div className="explanation" id="explanation">
                    <div className="explanation__container">
                        <span className="explanation__marker">2/11</span>
                        <h3 className="explanation__heading">Bienvenue !</h3>
                        <p className="explanation__text">
                            Ce court tutoriel vous guidera à travers toutes les
                            fonctionnalités de cette application.
                        </p>
                        <p className="explanation__text">
                            Si vous desirez quitter cette application, cliquer
                            sur la composante rorative en haut a droite. Sinon,
                            continuez à défiler vers le bas.
                        </p>

                        <span className="explanation__image"></span>
                    </div>
                </div>

                <div className="theory">
                    <span className="theory__marker">3/11</span>
                    <h3 className="theory__heading">
                        En quoi consiste Quest ?
                    </h3>
                    <div className="theory__container">
                        <p className="theory__text">
                            Cette application est basé sur la theorie des
                            graphs. La composante principale est une grille en
                            deux dimensions qui represente un graph avec des
                            noeuds(vertices) reliés par des arêtes(edges). Le
                            graph est non-orienté(undirected graph) c-à-d que
                            les arêtes sont bidirectionnelles. Chaque carré dans
                            la figure de gauche équivaut à un noeud dans la
                            figure de droite.
                        </p>
                        <div className="theory__pictures">
                            <img
                                src={require("../../img/mygrid.png")}
                                alt="grid2d"
                                className="theory__image theory__image--1"
                            />

                            <img
                                src={require("../../svgs/algorithm.svg")}
                                alt="graph nodes"
                                className="theory__image theory__image--2"
                            />
                        </div>
                    </div>
                </div>

                <div className="application">
                    <span
                        className="application__marker"
                        style={{ top: "5rem" }}
                    >
                        5/11
                    </span>
                    <h3 className="application__heading">
                        Applications dans la vie réelle ?
                    </h3>
                    <div className="application__container">
                        <p className="application__text">
                            Les graphiques sont directement applicables aux
                            scénarios du monde réel. Par exemple, nous pourrions
                            utiliser des graphiques pour modéliser un réseau de
                            transport où les nœuds représenteraient les
                            installations qui envoient ou reçoivent des produits
                            et les bords représenteraient des routes ou des
                            chemins qui les relient (voir ci-dessous). Dans le
                            réseau de vol, les structures de données graphiques
                            sont utilisées pour calculer les trajets les plus
                            courts et la consommation de carburant dans la
                            planification d'itinéraire.
                        </p>
                        <div
                            className="application__pictures"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <img
                                src={require("../../img/graph-application.png")}
                                alt="grid2d"
                                className="application__image application__image--1"
                                style={{
                                    width: "50rem",
                                    marginTop: "5rem",
                                    marginLeft: "10rem",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="goal" style={{ height: "115%" }}>
                    <span className="goal__marker">6/11</span>
                    <h3 className="goal__heading">Chemin le plus optimale</h3>
                    <div className="goal__container">
                        <p className="goal__text">
                            La premiere fonction de base de Quest est de trouver
                            le chemin le plus optimale entre deux points. C-à-d
                            le chemin le moins coûteux en terme de ressources.
                            Chaque deplacement dans n'importe quelle direction a
                            de base un coût de 1, mais il est possible d'ajouter
                            des obstacles / recomponses pour changer le coût du
                            deplacement. Les algorithmes de recherches
                            implementés permettent de visualiser le processus.
                        </p>
                        <div
                            className="goal__pictures"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <img
                                src={require("../../img/A2B.jpg")}
                                alt="grid2d"
                                className="goal__image goal__image--1"
                                style={{
                                    width: "50rem",
                                    marginTop: "5rem",
                                    marginLeft: "10rem",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="goal"
                    style={{ height: "105rem", marginTop: "-16.7rem" }}
                >
                    <span className="goal__marker">7/11</span>
                    <h3
                        className="goal__heading"
                        style={{ marginTop: "15.5rem" }}
                    >
                        liste des Algorithmes de recherches
                    </h3>
                    <div className="goal__container">
                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Breadth-first search :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                non-pondéré
                            </span>
                            qui garantit le chemin optimal.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Depth-first search :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                non-pondéré
                            </span>
                            qui ne garantit pas le chemin optimal.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Dijkstra :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                pondéré
                            </span>
                            qui garantit le chemin optimal.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                A* :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                pondéré
                            </span>
                            qui garantit le chemin optimal. Il a commme
                            spécificité d'utiliser des heuristiques, fonctions
                            qui estiment a priori le coût minimum entre un noeud
                            n vers le noeud final. Il est important de choisir
                            des heuristiques qui sont admissibles.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Bellman Ford :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                pondéré.
                            </span>
                            Il a dans son analyse comme spécificitée de aussi
                            prendre en consideration les noeuds à valeurs
                            negatives ou inferieur à 1 afin de garantir un
                            chemin optimal. Il permet en plus de de detecter des
                            cycles negatifs infinie.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Iterative deepening depth for search :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                non-pondéré,
                            </span>
                            il n'est pas optimal dans un graph non-orienteé
                            (undirected). L'algorithme est exécutée à plusieurs
                            reprises avec des limites de profondeur croissantes
                            jusqu'à ce que l'objectif soit trouvé. Il a comme
                            capacité d'utiliser beaucoup moins de mémoire que
                            BFS ou DFS, dans d'autres type de graphs/arbes. Dans
                            notre cas (undirected graph), j'ai du modifer
                            l'algorithme afin qu'il puisse garder en memoire les
                            noeuds visités a chaque depth level afin d'eviter
                            les cycles infinies, le rendant non-optimal.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Iterative deepening A* :
                            </span>
                            Un algorithme{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                pondéré,
                            </span>
                            il n'est pas optimal dans un graph non-orienteé
                            (undirected). L'algorithme une combinaison de A* et
                            IDDFS, au lieu d'utiliser des "depth level" on
                            utilise des "cost threshold" basé sur
                            f(n)=g(n)+h(n). Ensuite, nous étendons les nœuds c
                            qui satisfont {"f(c) < T"}. Tout comme IDDFS,
                            l'algorithme a été modifé pour ce conformer a un
                            graph non-orienteé, le rendant non-optimal.
                        </p>

                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    color: "black",
                                }}
                            >
                                Greedy best-first search / Weighted Greedy
                                best-first search :
                            </span>
                            Sont respectivement des algorithmes{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    marginRight: "3px",
                                }}
                            >
                                non-pondéré et pondéré.
                            </span>
                            Ils sont des versions plus rapide et plus basé sur
                            les heuristiques que A*. Mais, ils ne garantissent
                            pas le chemin optimale.
                        </p>
                    </div>
                </div>

                <div className="application" style={{ marginTop: "-12rem" }}>
                    <span
                        className="application__marker"
                        style={{ top: "5rem" }}
                    >
                        8/11
                    </span>
                    <h3 className="application__heading">Fonctionnalités</h3>
                    <div className="application__container">
                        <p
                            className="application__text"
                            style={{
                                fontSize: "1.7rem",
                                width: "90%",
                                marginTop: "-2rem",
                            }}
                        >
                            Vous pouvez ajouter des murs en cliquant sur la
                            grille. Ajouter des poids({"coût ≥ 1"}) en cliquant
                            sur la grille pendant que vous maintenez la touche
                            ALT. Ajouter des recompenses({"-0.99 ≤ coût ≤ 0.99"}
                            ) en cliquant sur la grille pendant que vous
                            maintenez la touche CTRL.
                        </p>
                        <p
                            className="application__text"
                            style={{
                                fontSize: "1.7rem",
                                width: "90%",
                                marginTop: "4rem",
                            }}
                        >
                            Les murs sont impénétrables, ce qui signifie qu'un
                            chemin ne peut pas les traverser. Les poids et les
                            recompenses, cependant, ne sont pas
                            infranchissables. Les poids sont plus coûteux à
                            traverser et les récompenses reduisent les coûts de
                            traversées.
                        </p>
                        <div
                            className="application__pictures"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <img
                                src={require("../../img/wall-weight-reward.gif")}
                                alt="grid2d"
                                className="application__image application__image--1"
                                style={{
                                    width: "40rem",
                                    marginTop: "5rem",
                                    marginLeft: "10rem",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="goal" style={{ height: "70rem" }}>
                    <span className="goal__marker" style={{ top: "5rem" }}>
                        9/11
                    </span>
                    <h3 className="goal__heading">Options</h3>
                    <div className="goal__container">
                        <p
                            className="goal__text"
                            style={{
                                width: "80%",
                                fontSize: "1.7rem",
                            }}
                        >
                            Lorsque vous selectionnez un algorithme une icone
                            <span style={{ position: "relative" }}>
                                <img
                                    src={require("../../img/gear.PNG")}
                                    alt="gear"
                                    style={{
                                        display: "block",
                                        position: "absolute",
                                        top: "-5px",
                                        left: "5px",
                                        width: "3.5rem",
                                        height: "3.5rem",
                                        borderRadius: "50%",
                                    }}
                                />
                            </span>
                            <span style={{ marginLeft: "4.5rem" }}>
                                apparait vous permettant de selectionner des
                                options sur les algorithmes, voir image
                                ci-dessous.
                            </span>
                        </p>
                        <div
                            className="goal__pictures"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <img
                                src={require("../../img/Option.PNG")}
                                alt="grid2d"
                                className="goal__image goal__image--1"
                                style={{
                                    width: "83rem",
                                    height: "25rem",
                                    marginTop: "5rem",
                                    marginLeft: "-7rem",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="application"
                    style={{
                        height: "40rem",
                        marginTop: "-2px",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                >
                    <span
                        className="application__marker"
                        style={{ top: "5rem" }}
                    >
                        10/11
                    </span>
                    <h3 className="application__heading">
                        Générateur de labyrinthes
                    </h3>
                    <div className="application__container">
                        <p
                            className="application__text"
                            style={{
                                width: "80%",
                                fontSize: "1.7rem",
                            }}
                        >
                            Quest permet de génerer des labyrinthes parfaits
                            c-a-d que chaque chemin est connecté à tous les
                            autres chemins, il n'y a donc pas de zones
                            inaccessibles. De plus, il n'y a pas de boucles de
                            chemin ni de murs isolés. Il y a toujours un chemin
                            unique entre deux points quelconques du labyrinthe.
                            Quest a plusieurs labyrinthes uniques permettent de
                            génerer ces labyrinthes.
                        </p>
                    </div>
                </div>

                <div
                    className="application"
                    style={{
                        height: "70rem",
                        marginTop: "-2px",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                >
                    <span
                        className="application__marker"
                        style={{ top: "5rem" }}
                    >
                        11/11
                    </span>
                    <h3 className="application__heading">Amusez-vous !</h3>
                    <div className="application__container">
                        <p
                            className="application__text"
                            style={{
                                width: "80%",
                                fontSize: "1.9rem",
                            }}
                        >
                            Découvrez cet outil de visualisation et explorez
                            tous les différents algorithmes.
                        </p>
                        <div
                            className="goal__pictures"
                            style={{
                                marginTop: "1rem",
                            }}
                        >
                            <Enjoy
                                className="goal__image goal__image--1"
                                style={{
                                    width: "40rem",
                                    height: "40rem",
                                    marginTop: "5rem",
                                    marginLeft: "7.5rem",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
