import { Input } from "@nextui-org/react";
import PizZip from "pizzip";
import { ChangeEvent, useState } from "react";

function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.slice(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
function getParagraphs(content: string) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
}

function DocReader() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result;
        const paragraphs = getParagraphs(content as string);
        setParagraphs(paragraphs);
      };

      reader.onerror = (err) => console.error(err);

      reader.readAsBinaryString(file);
    }
  };

  return <Input type="file" onChange={onFileUpload} name="docx-reader" />;
}

export default DocReader;
