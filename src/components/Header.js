import React from "react";

const Header = () => (
    <header className="header">
        <Emoji emoji="😂" />
        The Em
        <img className="omegalul" src="/emojis/omegalul.png" alt="" />
        ji Game
        <Emoji emoji="😂" />
    </header>
);

const Emoji = props => (
    <span className="emoji" role="img" aria-label="">
        {props.emoji}
    </span>
);

export default Header;
