import React from "react";
import "./main.scss";

export default function Lore() {
  return (
    <div className="lore-container">
      <header className="header">
        <div className="header__logo-box">
          <img
            src={require("./img/logo-white.png")}
            alt="Logo"
            className="header__logo"
          />
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">QUEST</span>
            <span className="heading-primary--sub">
              brave obstacles to save the Princess
            </span>
          </h1>

          <a href="#section-tours" className="btn btn--white btn--animated">
            Discover our tours{" "}
          </a>
        </div>
      </header>
    </div>
  );
}
