import React, { Component, useState, useEffect } from "react";

import useDelayUnmount from "../utilityComponants/UseDelayUnmount";

import "./Tutorial.scss";

import "../base/_animations.scss";

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
    //isTutoOpen = true;

    return (
        <>
            <div className="tuto">Totoriel</div>
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
                    <span className="introduction__marker">1/9</span>
                    <h1 className="introduction__heading">Quest</h1>
                    <h2 className="introduction__text-1">
                        Bravez les obstacles pour sauver la princesse
                    </h2>
                    <h2 className="introduction__text-1">
                        NOTE:LUXURY HOUSE RENTING
                    </h2>
                    <h2 className="introduction__text-1">
                        NOTE: FAIRE UN REPERTOIRE DE TOUT LES LIEUX HISTORIQUE
                        DANS LE MONDE AVEC UNE BELLE INTERFACE + MAP + LOGIN +
                        REVIEW + ETC... NOTE: CREER UN HOOK POUR EMPECHER LE
                        USER DE CLICKER SUR LE BUTTON LORE(CHANGER DE ROUTER)
                        PENDANT QUE L'ALGO EST ENTRAIN DE ROULER
                    </h2>
                    <h2 className="introduction__text-1">
                        NOTE: https://rapidapi.com/blog/most-popular-api/
                    </h2>

                    <a
                        className="introduction__button btn btn--violet"
                        href="#explanation"
                    >
                        tutoriel &darr;
                    </a>
                </div>

                <div className="explanation" id="explanation">
                    <div className="explanation__container">
                        <span className="explanation__marker">2/9</span>
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

                <div className="goal">
                    <span className="goal__marker">3/9</span>
                    <h3 className="goal__heading">En quoi consiste Quest ?</h3>
                    <div className="goal__container">
                        <p className="goal__text">
                            Cette application est basé sur la theorie des
                            graphs. La composante principale est une grille en
                            deux dimensions qui represente un graph avec des
                            noeuds(vertices) reliés par des arêtes(edges). Le
                            graph est non-orienté(undirected graph) c-à-d que
                            les arêtes sont bidirectionnelles. Chaque carré dans
                            la figure de gauche équivaut à un noeud dans la
                            figure de droite.
                        </p>
                        <div className="goal__pictures">
                            <img
                                src={require("../../img/mygrid.png")}
                                alt="grid2d"
                                className="goal__image goal__image--1"
                            />

                            <img
                                src={require("../../svgs/algorithm.svg")}
                                alt="graph nodes"
                                className="goal__image goal__image--2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
