import { useState } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";

import "./styles/global.css";

import "react-circular-progressbar/dist/styles.css";

import { Upload } from "./components/Upload";
import { FilesList } from "./components/FilesList";

export interface IFilesToUpload {
  file: File;
  id: string;
  name: string;
  readableSize:
    | string
    | number
    | any[]
    | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
      };
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: null;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<IFilesToUpload[]>([]);

  const handleUpload = (files: File[]) => {
    const filesToUpload = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles(uploadedFiles.concat(filesToUpload));
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-md m-8 bg-white rounded-md p-3">
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FilesList files={uploadedFiles} />}
      </div>
    </div>
  );
}

export default App;
