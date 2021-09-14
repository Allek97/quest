import React from "react";
import styled from "styled-components";

export const Container = styled.footer`
    background-color: RGBA(31, 32, 51, 1);

    display: grid;
    place-items: center;
    article {
        display: block;

        padding: 5rem 1rem;

        h3 {
            font-size: 1.6rem;
            /* font-family: Poppins; */
            text-transform: uppercase;
            text-align: center;
            letter-spacing: 3.2px;
            color: #e7e6e6;

            span {
                transition: all 0.5s;
                color: RGBA(36, 81, 183, 1);
            }
        }
    }
`;

export default function Footer() {
    return (
        <Container>
            <article>
                <h3>
                    copyright&copy; {new Date().getFullYear()} <span>IA </span>{" "}
                    all rights reserved
                </h3>
            </article>
        </Container>
    );
}
