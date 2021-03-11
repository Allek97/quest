import React, { Component, useState, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import Draggable from "react-draggable";

import DiagonalSwitch from "../../svgs/switch.svg";

import useDelayUnmount from "../utilityComponants/UseDelayUnmount";
import useOuterClick from "../utilityComponants/UseOuterClick";

import InformationComponant from "./InformationComponant";

import "./OptionsComponant.scss";

export default function OptionsComponant(props) {
    let isOptionBoxOpen = false;
    const [isMounted, setMounted] = useState(false);

    const closingOptionStyle = "optionEnd 0.3s ease-out";
    const openingOptionStyle = "optionStart 0.4s ease-in";

    isOptionBoxOpen = useDelayUnmount(isMounted, 300);
    //isOptionBoxOpen = true;

    // All the props from Brain
    const {
        isAlgoInProgress,
        isDiagonal,
        updateDiagonal,
        isOptionWheelOpen,
        isWeighted,
    } = props;

    // Close when click outside componant
    const closeWhenOutside = () => {
        setMounted(false);
    };

    const wrapperRefComponantDrop = useRef(null);
    useOuterClick(wrapperRefComponantDrop, closeWhenOutside);

    useEffect(() => {
        if (isOptionBoxOpen) {
            // Weight
            var rangeSliderWeight = document.getElementById(
                "rs-range-line-weight"
            );
            var rangeBulletWeight = document.getElementById("rs-bullet-weight");

            const showSliderValueWeight = () => {
                rangeBulletWeight.innerHTML = rangeSliderWeight.value;
                var bulletPosition =
                    rangeSliderWeight.value /
                    (rangeSliderWeight.max - rangeSliderWeight.min);
                rangeBulletWeight.style.left = bulletPosition * 25 + "rem";
            };

            rangeSliderWeight.addEventListener(
                "input",
                showSliderValueWeight,
                false
            );

            // Reward
            var rangeSliderReward = document.getElementById(
                "rs-range-line-reward"
            );
            var rangeBulletReward = document.getElementById("rs-bullet-reward");

            const showSliderValueReward = () => {
                rangeBulletReward.innerHTML = rangeSliderReward.value;
                var bulletPosition =
                    rangeSliderReward.value /
                    (rangeSliderReward.max - rangeSliderReward.min);
                rangeBulletReward.style.left = bulletPosition * 25 + "rem";
            };

            rangeSliderReward.addEventListener(
                "input",
                showSliderValueReward,
                false
            );
        }
        // Memorize diagonal state
        isDiagonal
            ? (document.getElementById("myonoffdiagonal").checked = true)
            : (document.getElementById("myonoffdiagonal").checked = false);

        // setWeightRewardValue(rangeSliderWeight.value, rangeSliderReward.value);
    });

    return (
        <div className="optionbox" ref={wrapperRefComponantDrop}>
            <div
                className={
                    isOptionWheelOpen ? "optionwheel" : "optionwheel--closed"
                }
                onClick={() => {
                    // setOptionBox(!isOptionBoxOpen);
                    setMounted(!isMounted);
                }}
                ref={wrapperRefComponantDrop}
            ></div>

            <div
                className={
                    isOptionBoxOpen && !isAlgoInProgress
                        ? "contentbox"
                        : "contentbox--closed"
                }
                style={{
                    animation: isMounted
                        ? openingOptionStyle
                        : closingOptionStyle,
                }}
                ref={wrapperRefComponantDrop}
            >
                <div className="options">
                    <h3 className="options__title">Options</h3>

                    <div className="options__diagonal">
                        <h4 className="options__diagonal-text">
                            Autoriser Les Diagonales
                        </h4>

                        <div class="onoffdiagonal">
                            <input
                                type="checkbox"
                                name="onoffdiagonal"
                                class="onoffdiagonal__checkbox"
                                id="myonoffdiagonal"
                                tabindex="0"
                                onClick={() => {
                                    updateDiagonal(!isDiagonal);
                                }}
                            />
                            <label
                                class="onoffdiagonal__label"
                                for="myonoffdiagonal"
                            >
                                <span class="onoffdiagonal__inner"></span>
                                <span class="onoffdiagonal__switch"></span>
                            </label>
                        </div>
                    </div>

                    <div className="options__weight">
                        <h4 className="options__weight-text">
                            Valeur Des Poids
                        </h4>

                        {!isWeighted && (
                            <div className="options__unweighted">
                                non-pondéré
                                <p className="unweighted-translate">
                                    (Unweighted)
                                </p>
                            </div>
                        )}

                        <div
                            class={
                                isWeighted
                                    ? "slide-container"
                                    : "slide-container--closed"
                            }
                        >
                            <div class="range-slider">
                                <span
                                    id="rs-bullet-weight"
                                    class="rs-label rs-label--weight"
                                >
                                    5
                                </span>
                                <input
                                    type="range"
                                    id="rs-range-line-weight"
                                    name="vol"
                                    class="rs-range"
                                    defaultValue="5"
                                    min="1"
                                    max="200"
                                />
                            </div>

                            <div class="box-minmax">
                                <span>1</span>
                                <span>200</span>
                            </div>
                        </div>
                    </div>

                    <div className="options__reward">
                        <h4 className="options__reward-text">
                            Valeur Des Recompences
                        </h4>
                        {!isWeighted && (
                            <div className="options__unweighted">
                                non-pondéré
                                <p className="unweighted-translate">
                                    (Unweighted)
                                </p>
                            </div>
                        )}

                        <div
                            class={
                                isWeighted
                                    ? "slide-container"
                                    : "slide-container--closed"
                            }
                        >
                            <div class="range-slider">
                                <span
                                    id="rs-bullet-reward"
                                    class="rs-label rs-label__reward"
                                >
                                    -0.5
                                </span>
                                <input
                                    type="range"
                                    id="rs-range-line-reward"
                                    name="vol"
                                    class="rs-range"
                                    defaultValue="-0.5"
                                    min="-0.99"
                                    max="0.99"
                                    step="0.01"
                                />
                            </div>

                            <div class="box-minmax">
                                <span>-0.99</span>
                                <span>0.99</span>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    <InformationComponant
                        // IDDFS et IDA*
                        whichAlgoIsSelected={props.whichAlgoIsSelected}
                        totalPathCost={props.totalPathCost}
                        visitedCount={props.visitedCount}
                        lastDepthLevel={props.lastDepthLevel}
                        lastThreshold={props.lastThreshold}
                        thresholdCount={props.thresholdCount}
                        //Bellman Ford
                        relaxationCountBF={props.relaxationCountBF}
                        negativeCycleBF={props.negativeCycleBF}
                    />
                }
            </div>
        </div>
    );
}
