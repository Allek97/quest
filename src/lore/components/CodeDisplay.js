import React, { useState, useEffect } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import styled from "styled-components";
import PropTypes from "prop-types";

const exampleCode = `
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

const Pre = styled.pre`
    margin-top: 3rem;
    padding: 3rem;
`;

export default function CodeDisplay(props) {
    const { code } = props;
    return (
        <Highlight {...defaultProps} code={code} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </Pre>
            )}
        </Highlight>
    );
}

CodeDisplay.propTypes = {
    code: PropTypes.string.isRequired,
};
