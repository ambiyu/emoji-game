import React, { Component } from "react";
import "./stylesheet.css";

class Emoji extends Component {
    static emojis = [
        { id: 0, image: "/emojis/happy.png" },
        { id: 1, image: "/emojis/angry.png" },
        { id: 2, image: "/emojis/sad.png" },
        { id: 3, image: "/emojis/surprise.png" },
        { id: 4, image: "/emojis/neutral.png" }
    ];

    render() {
        return (
            <div>
                <img
                    className="emojiImg"
                    src={Emoji.emojis[this.props.id].image}
                    alt=""
                />
            </div>
        );
    }
}

export default Emoji;
