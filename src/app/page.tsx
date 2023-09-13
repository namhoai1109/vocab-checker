"use client";
import {
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { ENTER_CODE, levelList } from "./constants";
import usePage from "./usePage";
import { Fragment, use, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <Spinner className="spinner-primary-color mr-2" />
        <p>Loading</p>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <nav className="w-screen flex justify-center shadow-bottom fixed z-10 bg-white">
        <div className="w-[1000px] flex p-2 justify-between items-center">
          <span className="color-primary font-bold text-xl max-sm:text-base">
            Vérifier le vocabulaire
          </span>
          <a href={process.env.NEXT_PUBLIC_INPUT_LINK} target="_blank">
            <Button size="md" className="bg-primary text-white max-sm:hidden">
              Entrer le mot
            </Button>
            <Button size="sm" className="bg-primary text-white sm:hidden">
              Entrer le mot
            </Button>
          </a>
        </div>
      </nav>
      <main className="w-screen h-screen flex justify-center pt-16 max-sm:pt-12">
        <article className="w-[800px] max-lg:px-6">
          <div className="h-50 mb-8 mt-4">
            <label className="text-base max-sm:text-sm font-medium mb-1 inline-block">
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
            label={
              <label className="text-base max-sm:text-sm">
                Entrer le paragraphe
              </label>
            }
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
              label={
                <label className="max-sm:text-sm">Choisir le niveau</label>
              }
              orientation="horizontal"
              defaultValue={level}
              value={level}
              onChange={(event) => {
                setLevel(event.target.value);
              }}
            >
              {levelList.map((level) => {
                return (
                  <div key={level}>
                    <Radio value={level} className="mr-1 max-sm:hidden">
                      {level}
                    </Radio>
                    <Radio size="sm" value={level} className="mr-1 sm:hidden">
                      {level}
                    </Radio>
                  </div>
                );
              })}
            </RadioGroup>
            <Button
              size="md"
              className="bg-primary text-white mt-2 max-sm:hidden"
              onClick={handleVerify}
            >
              Vérifier
            </Button>
            <Button
              size="sm"
              className="bg-primary text-white mt-2 sm:hidden"
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
                <div className="w-full flex flex-wrap mt-4 pb-5">
                  {result.map((item, index) => {
                    if (item.word === ENTER_CODE)
                      return <span key={index} className="basis-full h-0" />;
                    return (
                      <span key={index}>
                        <span
                          className={`${
                            item.isExisted ? "text-white bg-primary" : ""
                          } text-sm`}
                        >
                          {item.word}
                        </span>
                        &nbsp;
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
