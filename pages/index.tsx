import type { NextPage } from "next";
import Game from "../components/Game";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDayOfYear } from "date-fns";
import {
  useQueryClient,
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "react-query";

import Modal from "../components/Modal";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const Home = () => {
  const numberOfGuesses = 6;
  const [correctWord, setCorrectWord] = useState("     ");

  const fetchCorrectWord = async () => {
    const { data } = await axios.get(`${process.env.ROOT}/api/getCorrectWord`, {
      params: { word: getDayOfYear(new Date()) },
    });

    return data;
  };

  const { data, isError, isLoading } = useQuery(
    "correctWord",
    fetchCorrectWord
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full w-full flex justify-center bg-gray-700 items-center flex-col text-center">
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <div className="flex items-center justify-center text-center">
        <h1 className="font-bold text-white inline text-4xl mt-1 mr-1">
          Wordle
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setIsOpen(true)}
          className=" text-white inline-block h-6 w-6 text-center mt-[0.8rem] cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      {isLoading ? (
        <h1>loading...</h1>
      ) : isError ? (
        <h1 className="text-red-400 text-2xl font-bold">
          An error occured. Please refresh
        </h1>
      ) : (
        <Game numberOfGuesses={6} correctWord={data?.correctWord} />
      )}
    </div>
  );
};

const queryClient = new QueryClient();

const wrapper: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};
export default wrapper;
