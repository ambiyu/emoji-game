import React, { Component } from "react";
import Emoji from "./Emoji";

class AddEmoji extends Component {
    constructor() {
        super();
        this.timerID = null;
        this.MAX_EMOJI_COUNT = 10;
    }
    

    componentDidMount() {
        this.timerID = setInterval(() => {
            if (this.props.ids.length >= this.MAX_EMOJI_COUNT) {
                this.props.onFull();
                clearInterval(this.timerID);
            } else {
                let randomID = Math.floor(Math.random() * Emoji.emojis.length);
                this.props.onNewEmoji(randomID);
            }
        }, 3000);
    }

    render() {
        return (
            <div className="emojiList">
                {this.props.ids.map(id => (
                    <Emoji key={id.key} id={id.emojiId} />
                ))}
            </div>
        );
    }
}

export default AddEmoji;
