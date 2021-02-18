import React, { Component } from "react";
import "./Dash.scss";
import { Link } from "react-router-dom";

export default function Dash() {
  return (
    <div className="dash">
      <ul className="dash__list">
        {
          <li className="dash__element">
            <Link to="/lore">
              <a href="#" className="dash__router dash__router--lore">
                Lore
              </a>
            </Link>
          </li>
        }
        <li className="dash__element" draggable={false}>
          <Link to="/">
            <a href="#" className="dash__router dash__router--game">
              Game
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
