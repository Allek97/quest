import React from "react";
import styled from "styled-components";
import "./_lore.scss";

// import { ReactComponent as Logo } from "../img/favicon.png";

import "./base/_typography.scss";

const Header = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    display: flex;

    justify-content: space-between;

    width: 130rem;

    /* background-color: rgb(255, 255, 255); */

    font-family: circular-book;
    font-size: 1.75rem;
    font-style: italic;
`;

const Logo = styled.span`
    display: block;

    height: 5.5rem;
    width: 5.5rem;

    background-image: linear-gradient(76deg, rgba(2, 15, 31, 1), #0e0a49);
    mask-image: url(${(props) => props.img});
    mask-size: cover;
    mask-position: center;
`;

const LoreBtn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: inline-block;

        transition: background-color 0.3s linear;

        padding: 3rem 5.5rem;

        /* border-radius: 10rem; */
        border: none;
        color: white;

        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.4rem;

        cursor: pointer;
    }

    &:hover {
        transition: background-color 0.3s linear;
        background-color: rgba(0, 0, 0, 0.25);

        &::after {
            transform: scaleX(1.4) scaleY(1.6);
            opacity: 0;
        }
    }

    &:active,
    &:focus {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 0.5rem 1rem rgba(black, 0.2);
    }

    &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 10rem;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
        transition: all 0.4s;
    }
`;

const ThreeDots = styled.div`
    display: flex;
    justify-content: space-between;

    width: 10rem;
    height: max-content;
    margin-top: 10rem;

    span {
        transition: all 0.3s;

        transform: rotate(45deg);
        height: 1.1rem;
        width: 1.1rem;

        background-color: black;
    }

    &:hover > span {
        transition: all 0.8s;
        transform: rotate(-45deg);
    }
`;

export default function Lore() {
    const loreLogo = require("../img/favicon.png");
    return (
        <div className="lore">
            <Header>
                <Logo img={loreLogo} />

                <nav
                    style={{
                        display: "flex",
                        alignSelf: "stretch",
                        marginRight: " 3rem",
                    }}
                >
                    <div draggable={false}>
                        <LoreBtn href="/">Game</LoreBtn>
                    </div>

                    <div>
                        <LoreBtn
                            href="/lore"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                        >
                            Lore
                        </LoreBtn>
                    </div>
                </nav>
            </Header>

            <header
                className="header"
                style={{ fontFamily: "Roboto,sans-serif" }}
            >
                <div className="header__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">QUEST</span>
                        <span className="heading-primary--sub">
                            brave obstacles to save the Princess
                        </span>
                    </h1>
                </div>
            </header>

            <main className="mainlore">
                <ThreeDots>
                    <span />
                    <span />
                    <span />
                </ThreeDots>
                <section
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "15rem",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            fontSize: "2.1rem",
                            fontWeight: "400",
                            fontFamily: "Roboto, sans-serif",
                            color: "rgb(34, 34, 34)",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "5.5rem",
                                color: "#04497a",
                                fontWeight: "bolder !important",
                                marginBottom: "5.5rem",
                            }}
                        >
                            General Framework
                        </h1>
                        <p style={{ marginBottom: "3rem" }}>
                            Hello and Welcome to Quest. This a project that took
                            me almost 3 months to complete, it's my true
                            initiation to the world of computer science and
                            programming. Why did I build this Web App ? Well a
                            little backstory here, I graduated with a
                            Math/Statistics degree in December 2020 from
                            University de Montreal after a very tough year.
                            Before graduating, I was worrying about my future
                            and what I will do next,I was convinced that I
                            should persue a master degree in computer science,
                            an idea that I dropped after a friend convinced me
                            otherwise.
                        </p>
                        <p style={{ marginBottom: "3rem" }}>
                            I'm someone who like to solve problems and learn new
                            things,programming seemed like the pratical way of
                            continuing to do that. Since traveling was out of
                            the question, I set myself a challenge, that for the
                            next months I will deepen my knowledge in
                            programming by using internet. I wanted to build
                            something that was mentally challenging and visually
                            impressive (I enjoy good design). This project ended
                            up being more challenging and problematic than I
                            thought it will, it was an experience from which I
                            learned a lot in a very short time.
                        </p>
                        <p></p>
                    </div>
                </section>
            </main>
        </div>
    );
}
