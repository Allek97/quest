import React, { Component } from "react";
import "./Dash.scss";
import { Link } from "react-router-dom";

// SVGS
import { ReactComponent as Logo } from "../../svgs/bigCrown.svg";

export default function Dash() {
    return (
        <header className="dash">
            <div className="dash__logo-container">
                <p className="dash__project-name">Quest</p>
                <Logo className="dash__logo" fill="red" />
            </div>

            <nav className="dash__list">
                <div className="dash__element" draggable={false}>
                    <Link to="/" className="dash__link">
                        <a href="#" className="btn btn--green btn--router">
                            Game
                        </a>
                    </Link>
                </div>

                <div className="dash__element">
                    <Link to="/lore" className="dash__link">
                        <a href="#" className="btn btn--green btn--router">
                            Lore
                        </a>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
