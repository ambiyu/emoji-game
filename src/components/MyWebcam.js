import React, { Component } from "react";
import Webcam from "react-webcam";
import "./stylesheet.css";

class MyWebcam extends Component {
    constructor() {
        super();
        this.timerId = null;
        this.isCapturing = false;
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    startCapturing = () => {
        this.props.onPlay();
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            if (!this.props.isPlaying) {
                clearInterval(this.timerId);
            } else {
                const image = this.webcam.getScreenshot();
                const byteArrayImage = this.convertToByteArray(image);
                this.fetchData(byteArrayImage);
            }
        }, 500);
    };

    convertToByteArray = image => {
        const base64 = require("base64-js");
        const base64string = image.split(",")[1];
        return base64.toByteArray(base64string);
    };

    fetchData = byteArray => {
        const apiKey = "abc123";
        const apiEndpoint =
            "https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion";
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                "cache-control": "no-cache",
                "Ocp-Apim-Subscription-Key": apiKey,
                "Content-Type": "application/octet-stream"
            },
            method: "POST"
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let emotionValue;
                    if (data[0] != null) {
                        switch (this.props.currentEmoji) {
                            case 0:
                                emotionValue = data[0].faceAttributes.emotion.happiness;
                                console.log("happiness " + emotionValue);
                                break;
                            case 1:
                                emotionValue = data[0].faceAttributes.emotion.anger;
                                console.log("anger " + emotionValue);
                                break;
                            case 2:
                                emotionValue = data[0].faceAttributes.emotion.sadness;
                                console.log("sadness " + emotionValue);
                                break;
                            case 3:
                                emotionValue = data[0].faceAttributes.emotion.surprise;
                                console.log("surprise " + emotionValue);
                                break;
                            case 4:
                                emotionValue = data[0].faceAttributes.emotion.neutral;
                                console.log("neutral " + emotionValue);
                                break;
                            default:
                                emotionValue = 0;
                        }
                    } else { 
                        emotionValue = 0;
                        console.log("no face detected");
                    }

                    emotionValue = Math.round(emotionValue*100);
                    if (this.props.isPlaying) {
                        this.props.onReceivedResult(emotionValue);
                        if (this.props.currentEmoji === 1 || this.props.currentEmoji === 2) {
                            if (emotionValue >= 40) { // lower threshold for anger and sadness
                                this.props.onCorrectEmotion();
                            }
                        } else if (emotionValue >= 80) {
                            this.props.onCorrectEmotion();
                        }
                    } else {
                        clearInterval(this.timerId);
                        this.isCapturing = false;
                    }
                });
            }
        });
    };

    render() {
        const videoConstraints = {
            width: 750,
            height: 500,
            facingMode: "user"
        };

        return (
            <div>
                <div className="webcam">
                    <Webcam
                        ref={this.setRef}
                        audio={false}
                        width={750}
                        height={500}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
                <div className="button">
                    <button className="startButton" variant="primary" onClick={this.startCapturing}>
                        Start Game
                    </button>
                </div>
            </div>
        );
    }
}

export default MyWebcam;
