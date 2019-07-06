import React, { Component } from "react";
import AddEmoji from "./AddEmoji";
import Emoji from "./Emoji";
import EmotionAnalysis from "./EmotionAnalysis";
import "./stylesheet.css";

class EmojiGame extends Component {
    constructor() {
        super();
        this.initialState = {
            ids: [{ key: 0, emojiId: Math.floor(Math.random() * Emoji.emojis.length) }],
            score: 0,
            isPlaying: false
        };
        this.state = this.initialState;
        this.timer = null;
        this.highScore = 0;
    }

    handlePlay = () => {
        this.setState({ isPlaying: true });
    }

    handleGameOver = () => {
        if (this.state.score > this.highScore) {
            this.highScore = this.state.score;
        }
        this.setState(this.initialState);
    }

    // Adds the given emoji to the array
    handleNewEmoji = emojiId => {
        let ids;
        if (this.state.ids.length === 0) {
            ids = [{ key: 0, emojiId: emojiId}];
        } else {
            ids = [...this.state.ids];
            ids.push({ key: ids[ids.length-1].key+1, emojiId: emojiId });
        }
        this.setState({ ids });
    }

    handleRemoveEmoji = () => {
        this.setState({ ids: this.state.ids.slice(1), score: this.state.score+1 });
    }

    getFirstEmoji() {
        if (this.state.ids.length !== 0) {
            return this.state.ids[0].emojiId;
        } else return null;
    }

    render() {
        if (this.state.isPlaying) {
            return (
                <div>
                    <EmotionAnalysis
                        isPlaying={this.state.isPlaying}
                        onPlay={this.handlePlay}
                        onGameOver={this.handleGameOver}
                        onCorrectEmotion={this.handleRemoveEmoji}
                        currentEmoji={this.getFirstEmoji()}
                    />
                    <h1 className="score">Score: {this.state.score}</h1>
                    <AddEmoji
                        onNewEmoji={this.handleNewEmoji}
                        ids={this.state.ids}
                        onFull={this.handleGameOver}
                        score={this.state.score}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <EmotionAnalysis
                        isPlaying={this.state.isPlaying}
                        onPlay={this.handlePlay}
                    />
                    <h1 className="score">High Score: {this.highScore}</h1>
                </div>
            );
        }
    }
}

export default EmojiGame;
