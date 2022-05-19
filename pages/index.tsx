import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import { getDayOfYear } from "date-fns";
const Home: NextPage = () => {
  const numberOfGuesses = 6;
  const [correctWord, setCorrectWord] = useState("     ");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.ROOT}/api/getCorrectWord`, {
        params: { word: getDayOfYear(new Date()) },
      })
      .then(async (res) => {
        const data = res.data;
        if (data?.correctWord) {
          setCorrectWord(data.correctWord);
        } else {
          setError("Failed to load the correct word,, refresh!");
        }
      })
      .catch((err) => {
        setError("Failed to load the correct word, refresh!");
      });
  }, []);

  return (
    <div className="h-full w-full flex justify-center bg-gray-700 items-center flex-col text-center">
      <h1 className="font-bold text-white text-4xl mt-1">Wordle</h1>

      {error ? (
        <h1 className="text-red-400 text-2xl font-bold">{error}</h1>
      ) : (
        <Game numberOfGuesses={6} correctWord={correctWord} />
      )}
    </div>
  );
};

export default Home;
