import { replaceBasePath } from "next/dist/server/router";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { wordIndexes } from "../utils/gameHelpers";
const BoardRow: React.FC<{
  guess: string;
  correctWord: string;
  index: number;
}> = ({ guess, correctWord, index }) => {
  const renderRow = () => {
    var arr = [];
    const correctWordIndexes = wordIndexes(correctWord);

    const guessLetterCounts: { [key: string]: number } = {};
    for (var i = 0; i < correctWord.length; i++) {
      var color = "bg-gray-500";

      const v = guess.slice(i, i + 1);
      if (v != "") {
        if (guess.charAt(i) == correctWord.charAt(i)) {
          color = "bg-green-400";
        } else if (correctWord.includes(guess.charAt(i))) {
          color = "bg-yellow-400";
        } else {
          color = "bg-gray-600";
        }
      }

      arr.push(
        <motion.div
          key={i}
          animate={{ rotate: guess == "" ? 0 : 360 }}
          transition={{ duration: i / 5 }}
          className={`${color} items-center  justify-center flex text-white mb-2 rounded-md mr-2 h-14 w-14 text-3xl font-bold shadow-lg text-center uppercase outline-none caret-transparent transition-all`}
        >
          {v}
        </motion.div>
      );
    }

    return arr;
  };

  return (
    <div className="flex flex-row  justify-center">
      <div className="flex">{renderRow()}</div>
    </div>
  );
};

export default React.memo(BoardRow);
