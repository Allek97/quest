import React from "react";
import styled from "styled-components";

import AdjacencyListImg from "../../img/AdjacencyList.PNG";
import AdjacencyMatrixImg from "../../img/AjacencyMatrix.PNG";

const Array = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    &:before {
        content: "";

        position: absolute;
        top: 0;
        left: 50%;

        display: block;

        height: 100%;
        width: 1px;

        background-color: rgba(180, 175, 175, 0.5);
    }
`;

const Comparison = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
        margin-bottom: 5rem;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 0 0 46%;

        transition: all 0.5s;

        padding: 2rem;

        background-color: #ffffff;
        box-shadow: 0px 0px 2rem rgb(0 0 0 / 10%);
        border-radius: 1rem;

        font-size: 1.6rem;

        &:hover {
            transition: all 0.5s;
            h1,
            p {
                color: white;
            }
        }
    }

    h1 {
        font-size: 1.8rem;
        font-weight: 500;
    }

    p {
        color: rgb(87, 90, 123);
    }

    div:first-child {
        border-right: 2px solid #b4490b;

        h1,
        p {
            text-align: end;
        }

        &:before {
            content: "";

            position: absolute;
            top: 50%;
            left: 50.2%;
            transform: translate(-50%, -50%);

            display: block;

            height: 2rem;
            width: 2rem;

            border-width: 5px;
            border-style: solid;
            border-radius: 50%;

            background-color: #e94794;
            border-color: #fdc5d3;
        }

        &:hover {
            background-color: #b4490b;
        }
    }

    div:nth-child(2) {
        border-left: 2px solid rgb(4, 73, 122);

        &:hover {
            background-color: rgb(4, 73, 122);
        }
    }
`;

export default function Comparing(params) {
    return (
        <Array style={{ marginBottom: "5rem" }}>
            <Comparison style={{ display: "flex" }}>
                <div>
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                        }}
                    >
                        Adjacency Matrix
                    </h1>
                </div>
                <div>
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                        }}
                    >
                        Adjacency List
                    </h1>
                </div>
            </Comparison>

            <Comparison>
                <div>
                    <h1>How it works ?</h1>
                    <p>
                        An Adjacency list is an array consisting of the address
                        of all the linked lists. The first node of the linked
                        list represents the vertex and the remaining lists
                        connected to this node represents the vertices to which
                        this node is connected.
                    </p>
                </div>
                <div>
                    <h1>How it works ?</h1>
                    <p>
                        An adjacency matrix is a square matrix used to represent
                        a finite graph. The elements of the matrix indicate
                        whether pairs of vertices are adjacent or not in the
                        graph
                    </p>
                </div>
            </Comparison>

            <Comparison>
                <div>
                    <h1>Visualization</h1>
                    <img
                        src={AdjacencyMatrixImg}
                        alt="AdjacencyMatrix"
                        style={{
                            width: "40rem",
                            marginTop: "3rem",
                        }}
                    />
                </div>
                <div>
                    <h1>Visualization</h1>
                    <img
                        src={AdjacencyListImg}
                        alt="AdjacencyMatrix"
                        style={{
                            width: "38rem",
                            marginTop: "3rem",
                        }}
                    />
                </div>
            </Comparison>

            <Comparison>
                <div>
                    <h1>Storage Space</h1>
                    <p>
                        This representation makes use of VxV matrix, so space
                        required in worst case is O(|V|
                        <sup style={{ fontSize: "1.2rem" }}>2</sup>
                        ).
                    </p>
                </div>
                <div>
                    <h1>Storage Space</h1>
                    <p>
                        In the worst case, if a graph is connected O(V) is
                        required for a vertex and O(E) is required for storing
                        neighbours corresponding to every vertex .Thus, overall
                        space complexity is O(|V|+|E|).
                    </p>
                </div>
            </Comparison>

            <Comparison>
                <div>
                    <h1>Removing a vertex</h1>
                    <p>
                        In order to remove a vertex from V*V matrix the storage
                        must be decreased to |V|
                        <sup style={{ fontSize: "1.2rem" }}>2</sup> from (|V|+1)
                        <sup style={{ fontSize: "1.2rem" }}>2</sup>. To achieve
                        this we need to copy the whole matrix. Therefore the
                        complexity is O(|V|
                        <sup style={{ fontSize: "1.2rem" }}>2</sup>
                        ).
                    </p>
                </div>
                <div>
                    <h1>Removing a vertex</h1>
                    <p>
                        In order to remove a vertex, we need to search for the
                        vertex which will require O(|V|) time in worst case,
                        after this we need to traverse the edges and in worst
                        case it will require O(|E|) time. Hence, total time
                        complexity is O(|V|+|E|).
                    </p>
                </div>
            </Comparison>

            <Comparison>
                <div
                    style={{
                        justifyContent: "space-evenly",
                    }}
                >
                    <h1>Querying</h1>
                    <p>
                        In order to find for an existing edge the content of
                        matrix needs to be checked. Given two vertices say i and
                        j matrix[i][j] can be checked in O(1) time.
                    </p>
                </div>
                <div>
                    <h1>Querying</h1>
                    <p>
                        In an adjacency list every vertex is associated with a
                        list of adjacent vertices. For a given graph, in order
                        to check for an edge we need to check for vertices
                        adjacent to given vertex. A vertex can have at most
                        O(|V|) neighbours and in worst can we would have to
                        check for every adjacent vertex. Therefore, time
                        complexity is O(|V|) .
                    </p>
                </div>
            </Comparison>
        </Array>
    );
}
