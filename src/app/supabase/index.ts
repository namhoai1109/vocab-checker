import { createClient } from "@supabase/supabase-js";
import { levelConstant, supabaseVariables } from "../constants";
import { message } from "antd";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const getTable = (level: string) => {
  switch (level) {
    case levelConstant.A1:
      return supabaseVariables.levelA1Table;
    case levelConstant.A2:
      return supabaseVariables.levelA2Table;
    case levelConstant.B1:
      return supabaseVariables.levelB1Table;
    case levelConstant.B2:
      return supabaseVariables.levelB2Table;
    case levelConstant.C1:
      return supabaseVariables.levelC1Table;
    case levelConstant.C2:
      return supabaseVariables.levelC2Table;
    default:
      return supabaseVariables.levelA1Table;
  }
};

export const checkVocab = async (words: string[], level: string) => {
  const { data, error } = await supabase
    .from(getTable(level))
    .select<string, TWordSelected>(supabaseVariables.wordColumn)
    .in(
      supabaseVariables.wordColumn,
      words.map((word) => word.toLowerCase())
    );

  if (error) {
    message.error(error.message);
    return [];
  }

  return data;
};

const mapToStringArray = (data: TWordSelected[]) => {
  return data.map((item) => {
    return item.word;
  });
};

export const getExistedVocab = async (words: string[], levels: string[]) => {
  const result: string[] = [];

  for (let index = 0; index < levels.length; index++) {
    const existedWords = await checkVocab(words, levels[index]);
    result.push(...mapToStringArray(existedWords));
  }

  return result;
};
