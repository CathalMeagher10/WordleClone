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

import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Modal from "../components/Modal";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const Home = () => {
  const numberOfGuesses = 6;
  const [correctWord, setCorrectWord] = useState("     ");
  const [isOpen, setIsOpen] = useState(false);

  const fetchCorrectWord = async () => {
    const { data } = await axios.get(
      `${window.location.href}/api/getCorrectWord`,
      {
        params: { word: getDayOfYear(new Date()) },
      }
    );

    return data;
  };

  const { data, isError, isLoading } = useQuery(
    "correctWord",
    fetchCorrectWord
  );

  return (
    <div className="h-full w-full flex justify-center bg-gray-700 items-center flex-col text-center">
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <div className="flex items-center justify-center text-center">
        <h1 className="font-bold text-white inline text-4xl mt-1 mr-1">
          Wordle
        </h1>
        <QuestionMarkCircleIcon
          className="mt-[0.8rem] w-7 h-7 cursor-pointer text-white"
          onClick={() => setIsOpen(true)}
        />
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
