import React, { Component } from "react";
import { ReactComponent as Knight } from "../svgs/sworddd.svg";
import { ReactComponent as Princess } from "../svgs/crown.svg";
import { ReactComponent as Fortress } from "../svgs/fortress.svg";

import "./Grids.scss";

export class Grids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            permession: true,
        };
        this.myRef = React.createRef();
    }

    setPermession = () => {
        this.setState({ permession: false });
    };

    componentDidMount() {}
    render() {
        const {
            id,
            isStart,
            isEnd,
            isWall,
            isWeight,
            isShortcut,
            isWeighted,
            handleMouseDown,
            handleMouseEnter,
            handleMouseUp,
            handleDragOver,
            handleDragStart,
            handleDrop,
            addWeights,
            addWeightsEnter,
            addShortcuts,
            addShortcutsEnter,
            setIsWeighted,
            row,
            column,
            isAlgoInProgress,
        } = this.props;

        const extraClassName = isStart
            ? "item-start"
            : isEnd
            ? "item-end"
            : isWall
            ? "item-wall"
            : isWeight
            ? "item-weight"
            : isShortcut
            ? "item-shortcut"
            : "item";

        return (
            <div
                id={id}
                key={id}
                className={extraClassName}
                ref={this.myRef}
                onMouseDown={(e) => {
                    if (!isAlgoInProgress) {
                        if (e.altKey && isWeighted) {
                            addWeights(row, column);
                        }

                        if (e.ctrlKey && isWeighted) {
                            addShortcuts(row, column);
                        }

                        if (e.type === "mousedown" && !e.altKey && !e.ctrlKey) {
                            handleMouseDown(row, column, id);
                        }
                    }
                }}
                onMouseEnter={(e) => {
                    if (!isAlgoInProgress) {
                        if (e.altKey) {
                            addWeightsEnter(row, column);
                        }

                        if (e.ctrlKey) {
                            addShortcutsEnter(row, column);
                        }

                        if (
                            e.type === "mouseenter" &&
                            !e.altKey &&
                            !e.ctrlKey
                        ) {
                            handleMouseEnter(row, column, id);
                        }
                    }
                }}
                onMouseUp={(e) => {
                    if (!isAlgoInProgress) {
                        //this.setPermession();
                        handleMouseUp();
                    }
                }}
            ></div>
        );
    }
}

export default Grids;
