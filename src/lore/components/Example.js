// WORST MISTAKE EVER, SO TEDIOUS FOR NOTHING
// TODO: Replace with an interactive component

import React, { useState } from "react";
import styled from "styled-components";

import graph0 from "../../img/astar_step_0.png";
import graph1 from "../../img/astar_step_1.png";
import graph2 from "../../img/astar_step_2.png";
import graph3 from "../../img/astar_step_3.png";
import graph4 from "../../img/astar_step_4.png";
import graph5 from "../../img/astar_step_5.png";
import graph6 from "../../img/astar_step_6.png";
import graph7 from "../../img/astar_step_7.png";

const Container = styled.div`
    position: relative;
    /* height: 85rem; */
    margin-bottom: 5rem;
    border: 5px solid rgb(4, 73, 122);
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

    padding: 0 2rem;
`;
export const ProfileBtn = styled.a`
    &,
    &:link,
    &:visited {
        transition: all 0.2s;
        box-shadow: 1px 1px 32px 0 rgb(41 99 221 / 50%);

        height: 3.8rem;
        /* width: 3.8rem; */
        padding: 1rem 3rem;

        border-radius: 5px;

        background-color: rgb(4, 73, 122);
        overflow: hidden;

        text-decoration: none;
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;

        user-select: none;
    }

    &:hover {
        filter: brightness(1.1);
    }
`;

const TdHead = styled.td`
    width: 15rem;
    padding: 1rem;

    border: 1px solid#dee2e6;

    background-color: rgba(15, 13, 46, 1);

    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
    line-height: 2.3rem;
    color: white;
`;

const Td = styled(TdHead)`
    padding: 0.5rem;
    background-color: rgb(4, 73, 122);
`;

export default function Example() {
    const [step, setStep] = useState(0);

    return (
        <Container>
            <Box>
                <div
                    style={{ position: "absolute", top: "1rem", right: "2rem" }}
                >
                    {step}/7
                </div>
                {step === 0 && (
                    <img
                        src={graph0}
                        alt="graph step 0"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 1 && (
                    <img
                        src={graph1}
                        alt="graph step 1"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 2 && (
                    <img
                        src={graph2}
                        alt="graph step 2"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 3 && (
                    <img
                        src={graph3}
                        alt="graph step 3"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 4 && (
                    <img
                        src={graph4}
                        alt="graph step 4"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 5 && (
                    <img
                        src={graph5}
                        alt="graph step 5"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 6 && (
                    <img
                        src={graph6}
                        alt="graph step 6"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}
                {step === 7 && (
                    <img
                        src={graph7}
                        alt="graph step 7"
                        style={{ width: "45rem", margin: "5rem 0" }}
                    />
                )}

                {step !== 0 && (
                    <tbody style={{ marginBottom: "5rem" }}>
                        <tr>
                            <TdHead>Node</TdHead>
                            <TdHead>Status</TdHead>
                            <TdHead>Shortest Distance From A (G-Score)</TdHead>
                            <TdHead>Heuristic Distance to Z (H-Score)</TdHead>
                            <TdHead>Total Distance (F-Score =G+H)</TdHead>
                            <TdHead>Previous Node</TdHead>
                        </tr>

                        <tr>
                            <Td>A</Td>
                            <Td
                                style={
                                    step === 1 || step === 2
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : {
                                              backgroundColor: "grey",
                                          }
                                }
                            >
                                {step === 1 || step === 2
                                    ? `Current`
                                    : `Visited`}
                            </Td>
                            <Td
                                style={
                                    step === 1 || step === 2
                                        ? {
                                              color: "rgb(9, 193, 153)",
                                          }
                                        : null
                                }
                            >
                                0
                            </Td>
                            <Td style={{ color: "#b4490b" }}>14</Td>
                            <Td>14</Td>
                            <Td />
                        </tr>
                        {/* Row 2 */}
                        <tr>
                            <Td>B</Td>
                            <Td
                                style={
                                    step === 4
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : step === 5 || step === 6 || step === 7
                                        ? {
                                              backgroundColor: "grey",
                                          }
                                        : null
                                }
                            >
                                {step === 4
                                    ? `Current`
                                    : step === 5 || step === 6 || step === 7
                                    ? `Visited`
                                    : ``}
                            </Td>
                            <Td
                                style={
                                    step === 2
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : {
                                              fontSize: "1.7rem",
                                          }
                                }
                            >
                                {step === 1 ? (
                                    <span>&#8734;</span>
                                ) : step === 2 ? (
                                    <>
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            4
                                        </span>
                                    </>
                                ) : (
                                    <span
                                        style={
                                            step === 4
                                                ? {
                                                      fontSize: "1.7rem",
                                                      color: "rgb(9, 193, 153)",
                                                  }
                                                : {
                                                      fontSize: "1.7rem",
                                                  }
                                        }
                                    >
                                        4
                                    </span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>12</Td>
                            <Td>
                                {step !== 1 ? (
                                    <span
                                        style={
                                            step === 2
                                                ? { color: "#5dd5ff" }
                                                : null
                                        }
                                    >
                                        16
                                    </span>
                                ) : (
                                    ``
                                )}
                            </Td>
                            <Td>
                                {step === 1 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 2
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        A
                                    </span>
                                )}
                            </Td>
                        </tr>
                        {/* Row 3 */}
                        <tr>
                            <Td>C</Td>
                            <Td
                                style={
                                    step === 3
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : step === 1 || step === 2
                                        ? null
                                        : {
                                              backgroundColor: "grey",
                                          }
                                }
                            >
                                {step === 3
                                    ? `Current`
                                    : step === 1 || step === 2
                                    ? ``
                                    : `Visited`}
                            </Td>
                            <Td
                                style={
                                    step === 2
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : {
                                              fontSize: "1.7rem",
                                          }
                                }
                            >
                                {step === 1 ? (
                                    <span>&#8734;</span>
                                ) : step === 2 ? (
                                    <>
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            3
                                        </span>
                                    </>
                                ) : (
                                    <span
                                        style={
                                            step === 3
                                                ? {
                                                      fontSize: "1.7rem",
                                                      color: "rgb(9, 193, 153)",
                                                  }
                                                : {
                                                      fontSize: "1.7rem",
                                                  }
                                        }
                                    >
                                        3
                                    </span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>11</Td>
                            <Td>
                                {step !== 1 ? (
                                    <span
                                        style={
                                            step === 2
                                                ? { color: "#5dd5ff" }
                                                : null
                                        }
                                    >
                                        14
                                    </span>
                                ) : (
                                    ``
                                )}
                            </Td>
                            <Td>
                                {step === 1 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 2
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        A
                                    </span>
                                )}
                            </Td>
                        </tr>
                        {/* Row 4 */}
                        <tr>
                            <Td>D</Td>
                            <Td
                                style={
                                    step === 5
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : step === 6 || step === 7
                                        ? {
                                              backgroundColor: "grey",
                                          }
                                        : null
                                }
                            >
                                {step === 5
                                    ? `Current`
                                    : step === 6 || step === 7
                                    ? `Visited`
                                    : ``}
                            </Td>
                            <Td
                                style={
                                    step === 3
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : {
                                              fontSize: "1.7rem",
                                          }
                                }
                            >
                                {step === 1 || step === 2 ? (
                                    <span>&#8734;</span>
                                ) : step === 3 ? (
                                    <>
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            3+7=10
                                        </span>
                                    </>
                                ) : (
                                    <span
                                        style={
                                            step === 5
                                                ? {
                                                      fontSize: "1.7rem",
                                                      color: "rgb(9, 193, 153)",
                                                  }
                                                : {
                                                      fontSize: "1.7rem",
                                                  }
                                        }
                                    >
                                        10
                                    </span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>6</Td>
                            <Td>
                                {step === 3 ? (
                                    <span style={{ color: "#5dd5ff" }}>16</span>
                                ) : step === 1 || step === 2 ? (
                                    ``
                                ) : (
                                    `16`
                                )}
                            </Td>
                            <Td>
                                {step === 1 || step === 2 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 3
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        C
                                    </span>
                                )}
                            </Td>
                        </tr>
                        {/* Row 5 */}
                        <tr>
                            <Td>E</Td>
                            <Td
                                style={
                                    step === 6
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : step === 7
                                        ? {
                                              backgroundColor: "grey",
                                          }
                                        : null
                                }
                            >
                                {step === 6
                                    ? `Current`
                                    : step === 7
                                    ? `Visited`
                                    : ``}
                            </Td>
                            <Td
                                style={
                                    step === 3 || step === 4 || step === 5
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : {
                                              fontSize: "1.7rem",
                                          }
                                }
                            >
                                {step === 1 || step === 2 ? (
                                    <span>&#8734;</span>
                                ) : step === 3 ? (
                                    <>
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            3+10=13
                                        </span>
                                    </>
                                ) : step === 4 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span>13</span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            4+12=
                                            <span
                                                style={{
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                16
                                            </span>
                                        </span>
                                    </div>
                                ) : step === 5 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            13
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            10+2=
                                            <span style={{}}>12</span>
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        style={
                                            step === 6
                                                ? {
                                                      fontSize: "1.7rem",
                                                      color: "rgb(9, 193, 153)",
                                                  }
                                                : {
                                                      fontSize: "1.7rem",
                                                  }
                                        }
                                    >
                                        12
                                    </span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>4</Td>
                            <Td>
                                {step === 3 || step === 5 ? (
                                    <span style={{ color: "#5dd5ff" }}>
                                        {step === 3 ? 17 : 16}
                                    </span>
                                ) : step === 1 || step === 2 ? (
                                    ``
                                ) : step === 4 ? (
                                    `17`
                                ) : (
                                    `16`
                                )}
                            </Td>
                            <Td>
                                {step === 1 || step === 2 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 3 || step === 5
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        {step === 3 || step === 4
                                            ? `C`
                                            : step === 1 || step === 2
                                            ? ``
                                            : `D`}
                                    </span>
                                )}
                            </Td>
                        </tr>
                        {/* Row 6 */}
                        <tr>
                            <Td>F</Td>
                            <Td />
                            <Td
                                style={
                                    step === 4
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : null
                                }
                            >
                                {step === 4 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            4+5=9
                                        </span>
                                    </div>
                                ) : step === 5 || step === 6 || step === 7 ? (
                                    `9`
                                ) : (
                                    <span>&#8734;</span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>11</Td>
                            <Td>
                                {step === 1 || step === 2 || step === 3 ? (
                                    ``
                                ) : step === 7 ? (
                                    <span style={{ color: "red" }}>20</span>
                                ) : (
                                    20
                                )}
                            </Td>
                            <Td>
                                {step === 1 || step === 2 || step === 3 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 4
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        B
                                    </span>
                                )}
                            </Td>
                        </tr>
                        {/* Row 7 */}
                        <tr>
                            <Td>Z</Td>
                            <Td
                                style={
                                    step === 7
                                        ? {
                                              backgroundColor:
                                                  "rgb(9, 193, 153)",
                                          }
                                        : null
                                }
                            >
                                {step === 7 ? `Current` : ``}
                            </Td>
                            <Td
                                style={
                                    step === 6
                                        ? {
                                              backgroundColor: "#5dd5ff",
                                          }
                                        : null
                                }
                            >
                                {step === 6 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            &#8734;
                                        </span>{" "}
                                        <span
                                            style={{
                                                fontSize: "1.7rem",
                                            }}
                                        >
                                            12+5=17
                                        </span>
                                    </div>
                                ) : step === 7 ? (
                                    `17`
                                ) : (
                                    <span>&#8734;</span>
                                )}
                            </Td>
                            <Td style={{ color: "#b4490b" }}>0</Td>
                            <Td>
                                {step !== 6 && step !== 7 ? (
                                    ``
                                ) : step === 7 ? (
                                    <span style={{ color: "rgb(9, 193, 153)" }}>
                                        17
                                    </span>
                                ) : (
                                    17
                                )}
                            </Td>
                            <Td>
                                {step !== 6 && step !== 7 ? (
                                    ``
                                ) : (
                                    <span
                                        style={
                                            step === 6
                                                ? { color: "rgb(9, 193, 153)" }
                                                : null
                                        }
                                    >
                                        E
                                    </span>
                                )}
                            </Td>
                        </tr>
                    </tbody>
                )}
                <div style={{ marginBottom: "10rem", width: "70rem" }}>
                    {step === 0 && (
                        <div>
                            <h1 style={{ fontSize: "5rem" }}>
                                A* Search Algorithm
                            </h1>
                            <h3 style={{ color: "rgb(4,73,122)" }}>
                                What is the shortest path to travel from A to Z
                            </h3>
                            <p>
                                Numbers in{" "}
                                <span
                                    style={{
                                        color: "#b4490b",
                                        fontWeight: "bold",
                                    }}
                                >
                                    orange
                                </span>{" "}
                                are the heuristic values, distance in a straight
                                line from node A to node Z. Numbers in black are
                                the distance/weight from one node to the other.{" "}
                            </p>
                        </div>
                    )}
                    {step === 1 && (
                        <div>
                            <p>
                                The algorithm starts by initialising the g-score
                                of all of the nodes to infinity (or a very large
                                number) to show that the score has not yet been
                                calculated. The value for f-score can also be
                                set to infinity. Then set the starting node(A)
                                as the current node.
                            </p>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <p>
                                Check all the nodes connected to A and update
                                their{" "}
                                <span
                                    style={{
                                        color: "rgb(93, 213, 255)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Shortest Distance from A
                                </span>{" "}
                                and set their{" "}
                                <span
                                    style={{
                                        color: "rgb(9, 193, 153)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    previous node to A
                                </span>
                                . Update their total distance by adding the
                                shortest distance from A and the heuristic
                                distance to Z.
                            </p>
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <p>
                                Set the current node A to{" "}
                                <span
                                    style={{
                                        color: "grey",
                                        fontWeight: "bold",
                                    }}
                                >
                                    visited
                                </span>{" "}
                                and use the unvisited node with the smallest
                                total distance as the current node (e.g. in this
                                case: Node C). Check all unvisited nodes
                                connected to the current node and add the
                                distance from A to C to all distances from the
                                connected nodes. Replace their values only if
                                the new distance is lower than the previous one.
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(63, 159, 194)",
                                    }}
                                >
                                    <p>
                                        C &rarr; D : 3 + 7 = 10 &#60; &#8734; –
                                        Update G-Score of Node D
                                    </p>
                                    <p>
                                        C &rarr; E : 3 + 10 = 13 &#60; &#8734; –
                                        Update G-Score of Node E
                                    </p>
                                </div>
                                The next current node (unvisited node with the
                                shortest total distance) could be either node B
                                or node D. Let’s use node B.
                            </p>
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <p>
                                Check all unvisited nodes connected to the
                                current node B and add the distance from A to B
                                to all distances from the connected nodes.
                                Replace their values only if the new distance is
                                lower than the previous one.
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(63, 159, 194)",
                                    }}
                                >
                                    <p>
                                        B &rarr; E : 4 + 12 = 16 &#62; 13 – Do
                                        Not Update G-Score of Node E
                                    </p>
                                    <p>
                                        B &rarr; F : 4 + 5 = 9 &#60; &#8734; –
                                        Update G-Score of Node F
                                    </p>
                                </div>
                                The next current node (unvisited node with the
                                shortest total distance) is D.
                            </p>
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <p>
                                Check all unvisited nodes connected to the
                                current node D and add the distance from A to D
                                to all distances from the connected nodes.
                                Replace their values only if the new distance is
                                lower than the previous one.
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(63, 159, 194)",
                                    }}
                                >
                                    <p>
                                        D &rarr; E : 10 + 2 = 12 &#60; 13 –
                                        Update G-Score of Node E
                                    </p>
                                </div>
                                The next current node (unvisited node with the
                                shortest total distance) is E.
                            </p>
                        </div>
                    )}
                    {step === 6 && (
                        <div>
                            <p>
                                Check all unvisited nodes connected to the
                                current node E and add the distance from A to E
                                to all distances from the connected nodes.
                                Replace their values only if the new distance is
                                lower than the previous one.
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(63, 159, 194)",
                                    }}
                                >
                                    <p>
                                        E &rarr; Z : 12 + 5 = 17 &#60; &#8734; –
                                        Update G-Score of Node E
                                    </p>
                                </div>
                                The next current node (unvisited node with the
                                shortest total distance) is E.
                            </p>
                        </div>
                    )}
                    {step === 7 && (
                        <div>
                            <span style={{ marginBottom: "3rem" }}>
                                We found a path from A to Z, but is it the
                                shortest one?{" "}
                            </span>
                            <p>
                                Check all unvisited nodes. In this example,
                                there is only one unvisited node F. However its
                                total distance{" "}
                                <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                >
                                    20
                                </span>{" "}
                                is already greater than the distance we have
                                from A to Z{" "}
                                <span
                                    style={{
                                        color: "rgb(9, 193, 153)",
                                        fontWeight: "bold",
                                    }}
                                >
                                    17
                                </span>{" "}
                                so there is no need to visit node F as it will
                                not lead to a shorter path.
                                <br /> We found the shortest path from A to Z.
                                <br /> Read the path from Z to A using the
                                previous node column:
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(9, 193, 153)",
                                    }}
                                >
                                    <p>Z &#62; E &#62; D &#62; C &#62; A</p>
                                </div>
                                So the Shortest Path is:
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "3rem",
                                        color: "rgb(9, 193, 153)",
                                    }}
                                >
                                    <p>A &rarr; C &rarr; D &rarr; E &rarr; Z</p>
                                </div>
                                With a total cost of{" "}
                                <span
                                    style={{
                                        color: "rgb(9, 193, 153)",
                                    }}
                                >
                                    17
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </Box>
            <div
                style={{
                    position: "absolute",
                    right: "2rem",
                    bottom: "1rem",
                    width: "max-content",
                }}
            >
                <ProfileBtn
                    onClick={() => {
                        if (step > 0) {
                            setStep(step - 1);
                        }
                    }}
                >
                    Back
                </ProfileBtn>
                <ProfileBtn
                    style={{ marginLeft: "1rem" }}
                    onClick={() => {
                        if (step < 7) {
                            setStep(step + 1);
                        }
                    }}
                >
                    Next
                </ProfileBtn>
            </div>
        </Container>
    );
}
