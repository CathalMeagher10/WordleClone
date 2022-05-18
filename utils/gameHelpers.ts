import { formatISO9075 } from "date-fns/esm";
import allowedWords from "./allowedWords.js";

export const isValidGuess = (word: string): boolean => {
  return allowedWords.includes(word);
};

interface indexInterface {
  [key: string]: number[];
}

export const wordIndexes = (word: string) => {
  // This object contains the correct words
  // characters as keys and indexes as array
  var indexes: indexInterface = {};
  for (var i = 0; i < word.length; i++) {
    if (indexes[word.charAt(i)]) {
      indexes[word.charAt(i)].push(i);
    } else {
      indexes[word.charAt(i)] = [i];
    }
  }

  return indexes;
};
export const getBGColor = (
  pastGuesses: string[],
  correctWord: string,
  key: string
): string => {
  var color = "#4b5563";

  for (var i = 0; i < pastGuesses.length; i++) {
    var guess = pastGuesses[i];
    if (!guess) continue;
    // Our guess

    var indexes = wordIndexes(correctWord);
    if (
      correctWord.includes(key) &&
      guess.includes(key) &&
      indexes[key] &&
      indexes[key].includes(guess.indexOf(key))
    ) {
      return "#4ade80";
    } else if (correctWord.includes(key) && guess.includes(key)) {
      color = "#facc15";
    } else if (guess.includes(key)) {
      color = "#1e293b";
    }
  }

  return color;
};
