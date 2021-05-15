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
                    <a href="/" className="btn btn--modern-green btn--router">
                        Game
                    </a>
                </div>

                <div className="dash__element">
                    <a
                        href="/lore"
                        className="btn btn--modern-green btn--router"
                    >
                        Lore
                    </a>
                </div>
            </nav>
        </header>
    );
}
