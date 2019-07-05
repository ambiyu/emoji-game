import React, { Component } from "react";
import Header from "./components/Header";
import EmojiGame from "./components/EmojiGame";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <EmojiGame />
            </div>
        );
    }
}

export default App;
