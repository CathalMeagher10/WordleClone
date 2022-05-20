import BoardRow from "./BoardRow";
import { useState, useCallback, useEffect, useRef, KeyboardEvent } from "react";
import ColouredBoardRow from "./ColouredBoardRow";
import GameBoard from "./GameBoard";
import usePastGuesses from "../hooks/usePastGuesses";
import { parse } from "path";
import Keyboard from "./Keyboard";
import { isValidGuess } from "../utils//gameHelpers";
const Game: React.FC<{ correctWord: string; numberOfGuesses: number }> = ({
  correctWord,
  numberOfGuesses,
}) => {
  const [gamewon, setGameWon] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = usePastGuesses("pastGuesses", []);
  const [incorrectGuess, setIncorrectGuess] = useState(false);

  const submitGuess = () => {
    if (guess.length != correctWord.length) return;
    if (!isValidGuess(guess)) {
      setIncorrectGuess(true);
      setTimeout(() => {
        setIncorrectGuess(false);
      }, 750);
      return;
    }

    setPastGuesses([...pastGuesses, guess]);
    setGuess("");

    if (guess == correctWord) {
      setGameWon(true);
      return;
    }
  };

  const handleCharacterEnter = (key: string) => {
    if (gamewon) return;

    if (key == "Enter") {
      submitGuess();
    } else if (key == "Backspace" || key == "back") {
      if (guess.length > 0) {
        setGuess(guess.slice(0, guess.length - 1));
      }
    }

    //Filters out characters that are non-alphabetic
    if (!/^[a-zA-Z()]$/.test(key)) return;

    if (guess.length < correctWord.length) {
      setGuess(guess + key);
    }
  };

  useEffect(() => {
    if (pastGuesses.includes(correctWord)) {
      setGameWon(true);
    }

    setCurrentRow(pastGuesses.length);
  }, [pastGuesses, correctWord]);

  return (
    <div
      className=" w-full text-center flex flex-col items-center outline-none"
      onKeyDown={(e) => handleCharacterEnter(e.key)}
      tabIndex={0}
    >
      <div className="h-full flex justify-between flex-col">
        <GameBoard
          numberOfGuesses={numberOfGuesses}
          pastGuesses={pastGuesses}
          correctWord={correctWord}
          currentRow={currentRow}
          guess={guess}
          incorrectGuess={incorrectGuess}
        />

        <Keyboard
          handleCharacterEnter={handleCharacterEnter}
          pastGuesses={pastGuesses}
          correctWord={correctWord}
        />
      </div>
    </div>
  );
};

export default Game;
