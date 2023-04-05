import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Navbar from "./Components/Navbar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess: "",
      roundNumber: 1,
      winNumber: 0,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of this.state.currWord) {
      if (
        this.state.guessedLetters.includes(letter) ||
        this.state.guessesLeft === 0
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" ").toString();
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      currGuess: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.currGuess) {
      return;
    }
    const currGuessLetter = this.state.currGuess[0].toLowerCase();

    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, currGuessLetter],
      guessesLeft: this.state.guessesLeft - 1,
      currGuess: "",
    }));
  };

  checkGuess = (currGuessLetter) => {
    const guessedLetters = [...this.state.guessedLetters, currGuessLetter];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  handleReset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess: "",
      roundNumber: this.state.roundNumber + 1,
      winNumber: this.state.winNumber,
    });
  };

  render() {
    const isUserCorrect = this.checkGuess();
    const disableUserInput = isUserCorrect || this.state.guessesLeft === 0;
    const newGameButton = (
      <button className="newgame-btn" onClick={this.handleReset}>
        NEW GAME
      </button>
    );
    return (
      <div className="App">
        <main className="main-ctn">
          <div>
            <Navbar
              rounds={this.state.roundNumber}
              wins={this.state.winNumber}
            />
          </div>
          <div className="input-ctn">
            <form onSubmit={this.handleSubmit}>
              <input
                className="input-text"
                name="guess"
                type="text"
                maxLength={1}
                placeholder="Enter your guess here"
                required
                value={this.state.currGuess}
                onChange={this.handleChange}
                disabled={disableUserInput}
              />
              <input
                className="submit-btn"
                type="submit"
                value="SUBMIT"
                disabled={disableUserInput}
              />
            </form>
          </div>
          <div className="outcome-ctn">
            {this.state.guessesLeft === 10 && (
              <p>Can you guess the secret word? Enter 1 letter above.</p>
            )}
            {isUserCorrect && (
              <div>
                {newGameButton}
                <p>Congratulations! You guessed the secret word.</p>
              </div>
            )}
            {this.state.guessesLeft === 0 && !isUserCorrect && (
              <div className="newgame-ctn">
                {newGameButton}
                <p>
                  Oh no! You ran out of guesses. The secret word was{" "}
                  <span className="accent">{this.state.currWord}</span>.
                </p>
              </div>
            )}
          </div>
          <div className="bottom-ctn">
            <div className="word-display">{this.generateWordDisplay()}</div>
            <div className="guesses-ctn">
              {" "}
              <p>
                Num guesses left:{" "}
                <span className="accent">{this.state.guessesLeft}</span>
              </p>
              <div className="guessed-letters">
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.join(" · ").toString()
                  : "-"}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
