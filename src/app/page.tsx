import supabase from "./supabase";

const pingSupabase = async () => {
  let { data: dictionary, error } = await supabase
    .from("dictionary")
    .select("word, level");
  console.log(dictionary);
};

export default function Home() {
  pingSupabase();
  return <main>Check Vocab</main>;
}
