import React from "react";
import { useState } from "react";
import MyWebcam from "./MyWebcam";

function EmotionAnalysis(props) {
    const [result, updateResult] = useState(0);
    if (props.isPlaying) {
        return (
            <div>
                <MyWebcam
                    onReceivedResult={updateResult}
                    onPlay={props.onPlay}
                    onGameOver={props.onGameOver}
                    onCorrectEmotion={props.onCorrectEmotion}
                    isPlaying={props.isPlaying}
                    currentEmoji={props.currentEmoji}
                />
                <Result result={result} />
            </div>
        );
    } else {
        return (
            <div>
                <MyWebcam
                    onReceivedResult={updateResult}
                    onPlay={props.onPlay}
                    onGameOver={props.onGameOver}
                    onCorrectEmotion={props.onCorrectEmotion}
                    isPlaying={props.isPlaying}
                    currentEmoji={props.currentEmoji}
                />
            </div>
        );
    }
}

function Result(props) {
    return (
        <div className="correctness">
            <h1>{props.result < 80 ? "Correctness: " + props.result + "%" : "Good"}</h1>
        </div>
    );
}

export default EmotionAnalysis;
