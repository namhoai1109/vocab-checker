"use client";
import {
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { levelList } from "./constants";
import usePage from "./usePage";
import { Fragment } from "react";
import DocReader from "./components/DocReader";

export default function Home() {
  const {
    paragraph,
    result,
    isLoading,
    level,
    setLevel,
    setParagraph,
    handleVerify,
  } = usePage();
  return (
    <main>
      <nav className="w-screen flex justify-center shadow-bottom fixed z-10 bg-white">
        <div className="w-[1000px] flex p-2 justify-between items-center">
          <span className="color-primary font-bold text-xl">
            Vérifier le vocabulaire
          </span>
          <a
            href="https://supabase.com/dashboard/project/khggyxjpginhvguwdtbt/editor"
            target="_blank"
          >
            <Button size="md" className="bg-primary text-white">
              Entrer le mot
            </Button>
          </a>
        </div>
      </nav>
      <main className="w-screen flex justify-center pt-16">
        <article className="w-[800px]">
          <div className="h-50 mb-8 mt-4">
            <label className="text-base font-medium mb-1 inline-block">
              Entrer le fichier
            </label>
            <DocReader
              onChange={(text: string) => {
                setParagraph(text);
                result.splice(0, result.length);
              }}
            />
          </div>
          <Textarea
            label={<label className="text-base">Entrer le paragraphe</label>}
            labelPlacement="outside"
            placeholder="abc..."
            minRows={8}
            maxRows={20}
            value={paragraph}
            onChange={(event) => {
              setParagraph(event.target.value);
              result.splice(0, result.length);
            }}
          />
          <div className="flex justify-between items-center mt-8">
            <RadioGroup
              label="Choisir le niveau"
              orientation="horizontal"
              defaultValue={level}
              value={level}
              onChange={(event) => {
                setLevel(event.target.value);
              }}
            >
              {levelList.map((level) => {
                return (
                  <Radio key={level} value={level} className="mr-1">
                    {level}
                  </Radio>
                );
              })}
            </RadioGroup>
            <Button
              size="md"
              className="bg-primary text-white mt-2"
              onClick={handleVerify}
            >
              Vérifier
            </Button>
          </div>
          {isLoading ? (
            <div className="w-full flex justify-center flex-wrap mt-4">
              <Spinner className="spinner-primary-color" />
            </div>
          ) : (
            result.length > 0 && (
              <Fragment>
                <Divider className="mt-4" />
                <div className="w-full flex flex-wrap mt-4">
                  {result.map((item, index) => {
                    return (
                      <span
                        className={`${
                          item.isExisted ? "text-red-500" : ""
                        } text-sm`}
                        key={index}
                      >
                        {item.word}&nbsp;
                      </span>
                    );
                  })}
                </div>
              </Fragment>
            )
          )}
        </article>
      </main>
    </main>
  );
}
