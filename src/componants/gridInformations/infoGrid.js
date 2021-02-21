import React, { Component } from "react";
import "./infoGrid.scss";

// svg imports
import { ReactComponent as Knight } from "../../svgs/sworddd.svg";
import { ReactComponent as Princess } from "../../svgs/crown.svg";
import { ReactComponent as Weight } from "../../svgs/shield.svg";
import { ReactComponent as Reward } from "../../svgs/hourglass.svg";
import { ReactComponent as Information } from "../../svgs/info-icon.svg";

export default function InfoGrid(params) {
    return (
        <div className="info-container">
            <div className="test">
                <div className="test__item"></div>
            </div>

            <div className="legend">
                <nav className="legend__nav">
                    <li className="legend__item">
                        <Knight className="legend__svg-logo" />
                        <p className="legend__name">Chevalier</p>
                    </li>
                    <li className="legend__item">
                        <Princess className="legend__svg-logo" />
                        <p className="legend__name">Princesse</p>
                    </li>
                    <li className="legend__item">
                        <Weight className="legend__svg-logo" />
                        <p className="legend__name">Poids</p>
                        <div className="legend__instruction">
                            <Information className="legend__instruction-logo" />
                        </div>
                        {/* <div className="legend__special-item">
                            <p className="legend__name">Poids</p>
                            <p className="legend__instruction">(CTRL+Click Gauche)</p>
                        </div>*/}
                    </li>
                    <li className="legend__item">
                        <Reward className="legend__svg-logo" />
                        <p className="legend__name">Recompense</p>
                    </li>
                    <li className="legend__item">
                        <div className="legend__unvisited-node"></div>
                        <p className="legend__name">Noeud non-visité</p>
                    </li>
                    <li className="legend__item">
                        <div className="legend__visited-node"></div>
                        <p className="legend__name">Noeud visité</p>
                    </li>
                    <li className="legend__item">
                        <div className="legend__wall"></div>
                        <p className="legend__name">Mur</p>
                    </li>
                </nav>
            </div>

            <div className="tutorial">
                <div className="tutorial__container">
                    {/* to be considered later <Help className="tutorial__help-svg" /> */}
                </div>
            </div>
        </div>
    );
}
