import React from "react";
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
                    <Link to="/" className="btn btn--modern-green btn--router">
                        Game
                    </Link>
                </div>

                <div className="dash__element">
                    <Link
                        to="/lore"
                        className="btn btn--modern-green btn--router"
                    >
                        Lore
                    </Link>
                </div>
            </nav>
        </header>
    );
}
