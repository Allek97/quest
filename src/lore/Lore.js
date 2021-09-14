import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./_lore.scss";

// import { ReactComponent as Logo } from "../img/favicon.png";

import "./base/_typography.scss";
// Components
import Comparing from "./components/Comparing";
import CodeDisplay from "./components/CodeDisplay";
import Example from "./components/Example";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
// Images

const Header = styled.div`
    position: fixed;
    left: 50%;
    z-index: 1;

    transition: all 0.3s linear;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 0 25%;
    transform: translateX(-50.1%);

    background-color: ${(props) =>
        props.isscrolled ? "rgba(15, 13, 46, 1)" : "transparent"};

    font-family: circular-book;
    font-size: 1.75rem;
    font-style: italic;
`;

const Logo = styled.span`
    display: block;

    transition: all 0.3s linear;

    height: ${(props) => (props.isscrolled ? "6.5rem" : "6rem")};
    width: ${(props) => (props.isscrolled ? "6.5rem" : "6rem")};

    background-image: linear-gradient(76deg, rgba(2, 15, 31, 1), #0e0a49);
    background-image: linear-gradient(
        76deg,
        ${(props) => (props.isscrolled ? "white" : "rgba(2, 15, 31, 1)")},
        ${(props) => (props.isscrolled ? "white" : "#0e0a49")}
    );

    mask-image: url(${(props) => props.img});
    mask-size: cover;
    mask-position: center;
`;

const LoreBtn = styled(Link)`
    &,
    &:link,
    &:visited {
        position: relative;

        display: inline-block;

        transition: background-color 0.3s linear, padding 0.3s linear;

        padding: ${(props) => (props.isscrolled ? "3rem" : "3.5rem")} 5.5rem;

        /* border-radius: 10rem; */
        border: none;
        color: ${(props) => (props.isscrolled ? "#b3defd" : "white")};

        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.4rem;

        cursor: pointer;
    }

    &:hover {
        transition: background-color 0.3s linear;

        background-color: ${(props) =>
            props.isscrolled
                ? "rgba(4, 73, 122, 0.25)"
                : "rgba(0, 0, 0, 0.25)"};
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

const Highlight = styled.span`
    /* color: #b4490b; */
    color: ${(props) => props.color};
    font-weight: 600;
    /* margin: 0 3px; */
`;

// Code sent to be displayed
const nodeCode = `
nodes.push({
    key: uuidv4(),
    id: uuidv4(),
    isStart:
        row === KNIGHT_ROW && col === KNIGHT_COL ? true : false,
    isEnd:
        row === PRINCESS_ROW && col === PRINCESS_COL
            ? true
            : false,
    isWall: false,
    row: row,
    column: col,
    isPressed: false,
    isWeight: false,
    weight: 1,
    isShortcut: false,
    shortcutValue: 1,
    heuristic: Infinity,
    totalDistance: Infinity,
    previousNode: null,
});
`.trim();

const manhattanCode = `
export default function manhattanDistance(currentNode, goalNode) {
    let h =
      Math.abs(currentNode.column - goalNode.column) +
      Math.abs(currentNode.row - goalNode.row);
  
    return h;
  }`.trim();

const aStarPseudoCode = `
Declare the visited list
Declare the unvisited list

For each node in graph:
  Add the node to the unvisited list with a g-score of infinity, 
  an f-score of infinity and previous node of null

Set the start node's g-score to 0 in the unvisited list
Set the start node's f-score to its h-score in the unvisited list
Set finished to False

While finished is False:
  Set current node to the node in the unvisited list 
  with the lowest f-score 

  If the current node is the target node
      Set finished to True
      Copy the values for the current node from the unvisited 
      list to the visited list

  Else        
      For each neighbour of current node:
          If neighbour is not in the visited list
              Calculate new g-score = 
                      weight of edge + g-score of current node
              If new g-score is less than neighbour's g-score in unvisited list
                  Update the neighbour's g-score with the new g-score
                  Update the neighbour's f-score to new g-score + h-score
                  Update the neighbour's previous node to the current node

      Copy the values for the current node from the unvisited list 
      to the visited list
      Remove the current node from the unvisited list

Return the visited list`.trim();

const aStarCode = `//get start node
const first = positionList.get(JSON.stringify([start[0], start[1]]))[1];
 //get end node
const last = positionList.get(JSON.stringify([end[0], end[1]]))[1]; 

// Will store the nodes and their F-score
let priorityQ = new Map(); 

//We add the first node in visitedSet 
first.previousNode = first;
first.totalDistance = 0;
first.heuristic = 0;
visitedSet.add(first);

while (!visitedSet.has(last)) {
    const core = Array.from(visitedSet).pop();
    // get all the neighbours of core from the adjacencyList
    const neighboursOfCore = adjacencyList.get(core);

    for (const neighbour of neighboursOfCore) {
        if (!visitedSet.has(neighbour)) {
            if (!priorityQ.has(neighbour)) {
                const heuristicNeighbour = heuristicFunction(
                    neighbour,
                    last
                );
                const newDistance = core.totalDistance + neighbour.weight;
                const f = newDistance + heuristicNeighbour; // F = G + H

                neighbour.previousNode = core;
                neighbour.totalDistance = newDistance;
                neighbour.heuristic = heuristicNeighbour;
                priorityQ.set(neighbour, f); 
            } else {
                // If the node is already in our priorityQSet then we update 
                // it's f-score if necessary
                const newDistance = core.totalDistance + neighbour.weight;

                const f = newDistance + neighbour.heuristic; // F = G + H

                const distanceInPQ = priorityQ.get(neighbour);

                if (f < distanceInPQ) {
                    neighbour.previousNode = core;
                    neighbour.totalDistance = newDistance;
                    priorityQ.set(neighbour, f);
                }
            }
        }
    }
    // We get the value with the smallest f-score
    const minNode = minPQ(priorityQ);

    if (minNode === undefined) {
        return;
    }

    visitedSet.add(minNode);

    priorityQ.delete(minNode);
}

// After finding the goal node we track previous nodes in our visitedSet 
// to reconstruct our path
let tempNode = Array.from(visitedSet).pop();

while (!tempNode.isStart) {
    shortPath.add(tempNode);
    tempNode = tempNode.previousNode;
}
shortPath.add(first);

let reversedPath = Array.from(shortPath).reverse();
shortPath.clear();

reversedPath.map((element, elementIdx) => {
    shortPath.add(element);
});`.trim();

export default function Lore() {
    const loreLogo = require("../img/favicon.png");

    const [isscrolled, setIsScrolled] = useState(false);

    const listenScrollEvent = (event) => {
        if (window.scrollY > 0) {
            return setIsScrolled(true);
        } else {
            return setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <div className="lore">
            <Header isscrolled={isscrolled}>
                <Logo img={loreLogo} isscrolled={isscrolled} />

                <nav
                    style={{
                        display: "flex",
                        alignSelf: "stretch",
                        marginRight: " 3rem",
                    }}
                >
                    <div draggable={false}>
                        <LoreBtn to="/" isscrolled={isscrolled}>
                            Game
                        </LoreBtn>
                    </div>

                    <div>
                        <LoreBtn
                            to="/lore"
                            style={{
                                backgroundColor: isscrolled
                                    ? "rgba(4, 73, 122, 0.25)"
                                    : "rgba(0, 0, 0, 0.25)",
                            }}
                            isscrolled={isscrolled}
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

            <div className="loreContent">
                <ThreeDots>
                    <span />
                    <span />
                    <span />
                </ThreeDots>
                <main
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "15rem",
                        width: "100%",

                        fontSize: "2.1rem",
                        fontWeight: "400",
                        fontFamily: "Roboto, sans-serif",
                        color: "rgb(34, 34, 34)",
                    }}
                >
                    <section
                        style={{
                            borderBottom: "1px solid #cccccc",
                            marginBottom: "5rem",
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
                            programming.
                            <span
                                style={{
                                    color: "#04497a",
                                    fontWeight: "600",
                                    marginRight: "5px",
                                }}
                            >
                                Why did I build this Web App ?
                            </span>
                            Well a little backstory here, I graduated with a
                            Math/Statistics degree in December 2020 from
                            University de Montreal after a very tough year.
                            Before graduating, I was worrying about my future
                            and what I will do next, I was convinced that I
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
                            thought it will be, it was an experience from which
                            I learned a lot in a very short time.
                        </p>
                        <p style={{ marginBottom: "3rem" }}>
                            <Highlight color={"#04497a"}>
                                What is it about ?
                            </Highlight>{" "}
                            It's a simple vizualisation game where the knight
                            has to save the princess (or the other way around)
                            in a 2D grid. For that you need to use different
                            algorithms which have pros and cons depending in the
                            situation. In his search for the princess, the
                            knight has to brave obstacles like walls(scary isn't
                            it) and weights which act as resistance. He can also
                            collect rewards along the way. You can also generate
                            perfect mazes using different algorithms.
                        </p>
                        <p style={{ marginBottom: "5rem" }}>
                            In this section, I will try to post about some of{" "}
                            <Highlight color={"#b4490b"}>
                                the maze generation algorithms/search algorithms
                            </Highlight>{" "}
                            I implemented and how they work :
                        </p>
                    </section>

                    <section>
                        <h1
                            style={{
                                fontSize: "5.5rem",
                                color: "#04497a",
                                fontWeight: "bolder !important",
                                marginBottom: "5.5rem",
                            }}
                        >
                            Graph Representation
                        </h1>
                        <p style={{ marginBottom: "5rem" }}>
                            Before we dive into algorithms, we need to learn
                            about the two main graph representations which are
                            the{" "}
                            <Highlight color={"#b4490b"}>
                                adjacency list
                            </Highlight>{" "}
                            and the{" "}
                            <Highlight color={"#b4490b"}>
                                adjacency matrix
                            </Highlight>
                            . It's important to understand the tradeoffs between
                            the two representations. Let G = (V, E) be our graph
                            where V is the set of vertices and E is the set of
                            <br />
                            edges :
                        </p>
                        <Comparing />
                        For memory/easy manipulations reasons, I choose
                        Adjacency List for graph representation. I did use a
                        HashMap to store each node and it's corresponding
                        neighbours. I used another Map to store each node
                        coordinate, this will help us track the direction of
                        each node's neighbours.
                    </section>

                    <section>
                        <h1
                            style={{
                                fontSize: "5rem",
                                color: "#04497a",
                                fontWeight: "bolder !important",
                                margin: "5.5rem 0",
                            }}
                        >
                            A* Algorithm
                        </h1>
                        <div style={{ marginBottom: "3rem" }}>
                            {" "}
                            We will directely dive into A*, which is very
                            efficient search algorithm. Now to understand how A*
                            works, first we need to understand a few
                            terminologies:
                            <ul
                                style={{
                                    marginTop: "2rem",
                                    marginLeft: "6rem",
                                    marginBottom: "5rem",
                                }}
                            >
                                <li style={{ marginBottom: "5rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        Node
                                    </Highlight>{" "}
                                    (also called State) — On object with a
                                    unique identification, it's the little
                                    square in our grid. A node could have
                                    different states, it could be a wall,a
                                    weight,a shortcut(reward) and can also store
                                    useful informations like previous node,total
                                    distance,heuristic value,etc. It looks like
                                    that in our code :
                                    <CodeDisplay code={nodeCode} />
                                </li>
                                <li style={{ marginBottom: "1rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        Starting Node{" "}
                                    </Highlight>
                                    (Knight or the Princess) — Where to start
                                    searching
                                </li>
                                <li style={{ marginBottom: "1rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        Goal/End Node{" "}
                                    </Highlight>
                                    (Knight) — The target(Princess)
                                </li>
                                <li style={{ marginBottom: "1rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        Cost{" "}
                                    </Highlight>
                                    — Cost — Numerical value (say distance,
                                    time, or financial expense) for the path
                                    from a node to another node. In our case, in
                                    just simple units.
                                </li>
                                <li style={{ marginBottom: "1rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        g(n){" "}
                                    </Highlight>
                                    —(also called g-score) this represents the{" "}
                                    <Highlight color={"#b4490b"}>
                                        exact cost{" "}
                                    </Highlight>
                                    of the path from the{" "}
                                    <Highlight color={"#b4490b"}>
                                        starting node{" "}
                                    </Highlight>{" "}
                                    to any node{" "}
                                    <Highlight color={"#b4490b"}>n</Highlight>
                                </li>
                                <li style={{ marginBottom: "1rem" }}>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        h(n){" "}
                                    </Highlight>
                                    —(also called h-score) this represents the{" "}
                                    <Highlight color={"#b4490b"}>
                                        heuristic estimated cost{" "}
                                    </Highlight>{" "}
                                    from node{" "}
                                    <Highlight color={"#b4490b"}>n</Highlight>{" "}
                                    to the{" "}
                                    <Highlight color={"#b4490b"}>
                                        end node
                                    </Highlight>
                                </li>
                                <li>
                                    <Highlight color={"rgb(4, 73, 122)"}>
                                        f(n){" "}
                                    </Highlight>
                                    —(also called f-score) this represents the
                                    lowest cost in the neighboring node{" "}
                                    <Highlight color={"#b4490b"}>n</Highlight>
                                </li>
                            </ul>
                            Since A* uses{" "}
                            <Highlight color={"#b4490b"}>
                                heuristic functions
                            </Highlight>{" "}
                            to guide the algorithm, we need to understand what
                            they are. The heuristic function h(n) tells A* an{" "}
                            <Highlight color={"#b4490b"}>estimate</Highlight> of
                            the minimum cost from any vertex n to the goal,
                            helping algorithms to make the best decision faster
                            and more efficiently. The standard heuristic for a
                            square grid is the{" "}
                            <Highlight color={"rgb(4, 73, 122)"}>
                                Manhattan distance
                            </Highlight>
                            , it's a very simple function as seen below :
                            <CodeDisplay code={manhattanCode} />
                        </div>
                        <p style={{ marginBottom: "3rem" }}>
                            For the algorithm to find the optimal path, the
                            heuritic function needs to be{" "}
                            <Highlight color={"rgb(4, 73, 122)"}>
                                admissible
                            </Highlight>
                            , it's important that it never{" "}
                            <Highlight color={"#b4490b"}>
                                overestimates
                            </Highlight>{" "}
                            the real distance between a node n and the end node.
                        </p>
                        <h1
                            style={{
                                fontSize: "3rem",
                                color: "#04497a",
                                fontWeight: "bolder !important",
                                margin: "3rem 0",
                            }}
                        >
                            A* Implementation
                        </h1>
                        For a better comprehension, let's write the pseudocode
                        of the algorithm :
                        <CodeDisplay code={aStarPseudoCode} />
                        <p style={{ margin: "2rem 0" }}>
                            Now let's explore an example to fully understand how
                            the algorithm operate. In this example, you will
                            consider a small graph and use the A* algorithm to
                            find the shortest path from A to Z :
                        </p>
                        <Example />
                        Now let's see how the code look like in javascript :
                        <CodeDisplay code={aStarCode} />
                        <p style={{ margin: "3rem 0" }}>
                            {" "}
                            The greatest challenge in selecting A* is the need
                            for a good heuristic function. The time it takes to
                            provide the heuristic must not cancel out any time
                            savings in the process of pathfinding. In addition,
                            the heuristic must not overestimate the cost of the
                            path. If h(n) is always lower than (or equal to) the
                            cost of moving from n to the target node, then A* is
                            guaranteed to find the shortest path.
                        </p>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
