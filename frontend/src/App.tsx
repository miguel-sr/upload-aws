import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";

import "./styles/global.css";

import "react-circular-progressbar/dist/styles.css";

import { Upload } from "./components/Upload";
import { FilesList } from "./components/FilesList";

import api from "./services/api";

export interface INewFile {
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
  const [uploadedFiles, setUploadedFiles] = useState<INewFile[]>([]);
  const [newFiles, setNewFiles] = useState<INewFile[]>([]);

  const handleUpload = (files: File[]) => {
    const newFiles = files.map((file) => ({
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

    setNewFiles(newFiles);
    setUploadedFiles(uploadedFiles.concat(newFiles));
  };

  useEffect(() => {
    uploadedFiles.forEach((file) => {
      processUpload(file);
    });
  }, [newFiles]);

  const updateFile = (id: string, data: Record<string, boolean | number>) => {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    );
  };

  const processUpload = (uploadedFile: INewFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("/posts", data, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total!);

          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        console.log(response);
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/posts/${id}`);

    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-md m-8 bg-white rounded-md p-3">
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FilesList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
