import { useEffect, useState } from "react";
import { getExistedVocab } from "./supabase";
import { levelConstant, levelList } from "./constants";

const mapToResultArray = (words: string[], exitedWord: string[]) => {
  return words.map((word) => {
    return {
      word,
      isExisted: exitedWord.includes(word.toLowerCase()),
    };
  });
};

const usePage = () => {
  const [paragraph, setParagraph] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [result, setResult] = useState<TWordChecked[]>([]);
  const [clicking, setClicking] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<string>(levelConstant.A1);

  useEffect(() => {
    if (words.length !== 0) {
      setIsLoading(true);
      const subLevelList = levelList.slice(
        levelList.indexOf(level) + 1,
        levelList.length
      );

      if (subLevelList.length > 0) {
        getExistedVocab(words, subLevelList).then((existedWord) => {
          setResult(mapToResultArray(words, existedWord));
          setIsLoading(false);
        });
      }
    }
  }, [words, clicking, level]);

  const handleVerify = () => {
    setClicking(clicking + 1);
    if (paragraph !== "") {
      const words = paragraph
        .replaceAll(".", ". ")
        .replaceAll(",", ", ")
        .split(" ");

      const result: string[] = [];
      for (let index = 0; index < words.length; index++) {
        let word = words[index];

        if (word.includes("’") || word.includes("'")) {
          //split that word to 2 words and add to array
          const splitWord = word.split(/’|'/);
          splitWord[0] = splitWord[0] + "'";
          result.push(splitWord[0]);
          word = splitWord[1];
        }

        if (word.includes(".") || word.includes(",")) {
          //split that word to a word, a punctuation and add to array
          const splitWord = word.substring(0, word.length - 1);
          result.push(splitWord, word[word.length - 1]);
          continue;
        }

        if (word !== "") {
          result.push(word);
        }
      }
      setWords(result);
    }
  };

  return {
    paragraph,
    result,
    isLoading,
    level,
    setLevel,
    setParagraph,
    handleVerify,
  };
};

export default usePage;
