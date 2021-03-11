import React, { Component, useState, useEffect } from "react";

import useDelayUnmount from "../utilityComponants/UseDelayUnmount";

import "./InfoGrid.scss";

import "../base/_animations.scss";

// svg imports
import { ReactComponent as Knight } from "../../svgs/sworddd.svg";
import { ReactComponent as Princess } from "../../svgs/crown.svg";
import { ReactComponent as Weight } from "../../svgs/shield.svg";
import { ReactComponent as Reward } from "../../svgs/hourglass.svg";
import { ReactComponent as Information } from "../../svgs/info-icon.svg";

import Tutorial from "./Tutorial";

export default function InfoGrid(props) {
    let [isLegendOpen, setLegendOpen] = useState(true);
    const [isMounted, setIsMounted] = useState(true);

    //const [animationName, setAnimationName] = useState(null);

    isLegendOpen = useDelayUnmount(isMounted, 500);

    const mountedStyle = { animation: "slideFromLeft 0.5s ease-out" };
    const unmountedStyle = { animation: "slideFromRight 0.5s ease-in" };

    const animateMount = { animation: "1s ease-out 1 growUp" };

    return (
        <div className="info-container">
            <div className="compo">
                <a
                    href="#"
                    className={isLegendOpen ? "compo__open" : "compo__closed"}
                    onClick={() => {
                        setLegendOpen(!isLegendOpen);
                        setIsMounted(!isMounted);
                        // setAnimationName({ animation: "" });
                    }}
                ></a>
                <span
                    className={
                        isLegendOpen
                            ? "compo__middleline compo__middleline--null"
                            : "compo__middleline"
                    }
                ></span>
            </div>
            <nav
                className="legend"
                style={isMounted ? mountedStyle : unmountedStyle}
            >
                {isLegendOpen
                    ? LegendList(isMounted, animateMount, props.isWeighted)
                    : null}
            </nav>
            {/*<Tutorial />*/}
        </div>
    );
}

const LegendList = (isAnimate, animationName, isWeighted) => (
    <ul className="legend__nav ">
        <li className="legend__item">
            <Knight
                className="legend__svg-logo"
                style={isAnimate ? animationName : null}
            />
            <p className="legend__name">Chevalier</p>
        </li>

        <li className="legend__item">
            <Princess
                className="legend__svg-logo"
                style={isAnimate ? animationName : null}
            />
            <p className="legend__name">Princesse</p>
        </li>

        <li className="legend__item">
            {!isWeighted && <div className="legend__cancel"></div>}
            <Weight
                className="legend__svg-logo"
                style={isAnimate ? animationName : null}
            />
            <p className="legend__name">Poids</p>
            <div
                className="legend__instruction"
                data-data={
                    isWeighted
                        ? "Instruction : ALT + CLICK GAUCHE Valeur par défaut : 5 unités"
                        : "L'algorithme choisit n'est pas pondéré"
                }
            >
                <Information className="legend__instruction-logo" />
            </div>
            {/* <div className="legend__special-item">
                        <p className="legend__name">Poids</p>
                        <p className="legend__instruction">(CTRL+Click Gauche)</p>
                    </div>*/}
        </li>

        <li className="legend__item">
            {!isWeighted && <div className="legend__cancel"></div>}
            <Reward
                className="legend__svg-logo"
                style={isAnimate ? animationName : null}
            />
            <p className="legend__name">Recompense</p>
            <div
                className="legend__instruction"
                data-data={
                    isWeighted
                        ? "Instruction : CTRL + CLICK GAUCHE Valeur par défaut : -0.5 unité"
                        : "L'algorithme choisit n'est pas pondéré"
                }
            >
                <Information className="legend__instruction-logo" />
            </div>
        </li>

        <li className="legend__item">
            <div
                className="legend__unvisited-node"
                style={isAnimate ? animationName : null}
            ></div>
            <p className="legend__name">Noeud non-visité</p>
        </li>

        <li className="legend__item">
            <div
                className="legend__visited-node"
                style={isAnimate ? animationName : null}
            ></div>
            <div
                className="legend__visited-node legend__visited-node--iterative"
                style={isAnimate ? animationName : null}
            ></div>
            <p className="legend__name">Noeud visité</p>
        </li>

        <li className="legend__item">
            <div
                className="legend__shortpath-node "
                style={isAnimate ? animationName : null}
            ></div>
            <p className="legend__name">Plus Court Chemin</p>
        </li>

        <li className="legend__item">
            <div
                className="legend__wall"
                style={isAnimate ? animationName : null}
            ></div>
            <p className="legend__name">Mur</p>
        </li>
    </ul>
);

/*const useDelayUnmount = (isMounted, delayTime) => {
    const [shouldRender, setShouldRender] = useState("");

    useEffect(() => {
        if (isMounted) {
            setShouldRender(true);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMounted, delayTime, shouldRender]);

    return shouldRender;
};*/
