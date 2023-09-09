import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message } from "antd";
import PizZip from "pizzip";
import { useState } from "react";

interface IDocReader {
  onChange: (paragraphs: string) => void;
}

const { Dragger } = Upload;

function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.slice(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
function getParagraphs(content: string) {
  try {
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
  } catch (error) {
    message.error("Erreur lors de la lecture du fichier");
    return [];
  }
}

function DocReader({ onChange }: IDocReader) {
  const [files, setFiles] = useState<UploadFile<any>[]>([]);

  const onFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      const paragraphs = getParagraphs(content as string);
      onChange(paragraphs.join(""));
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
  };

  return (
    <Dragger
      name="file"
      accept=".docx"
      multiple={false}
      customRequest={({ onSuccess }) => {
        if (onSuccess) {
          onSuccess("ok");
        }
      }}
      fileList={files}
      onChange={(info) => {
        if (info.fileList.length > 1) {
          info.fileList.splice(0, 1);
        }
        setFiles(info.fileList);
        const { status } = info.file;
        if (status === "done") {
          message.success(`${info.file.name} fichier téléchargé avec succès.`);
        } else if (status === "error") {
          message.error(`${info.file.name} fichier téléchargé avec erreur.`);
        }
        if (info.file.originFileObj) onFileUpload(info.file.originFileObj);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined className="color-primary" />
      </p>
      <p className="">
        Cliquez ou faites glisser le fichier vers cette zone pour le télécharger
      </p>
    </Dragger>
  );
}

export default DocReader;
