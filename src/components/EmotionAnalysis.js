import React from "react";
import { useState } from "react";
import MyWebcam from "./MyWebcam";

function EmotionAnalysis(props) {
    const [result, updateResult] = useState(0);
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
}

function Result(props) {
    return (
        <div>
            <h1>{props.result < 80 ? props.result + "%" : "Good"}</h1>
        </div>
    );
}

export default EmotionAnalysis;
