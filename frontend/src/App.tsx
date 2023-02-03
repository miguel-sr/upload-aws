import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";

import "./styles/global.css";

import "react-circular-progressbar/dist/styles.css";

import { Upload } from "./components/Upload";
import { FilesList } from "./components/FilesList";

import api from "./services/api";

export interface INewFile {
  file?: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error?: boolean;
  url: null | string;
}

interface MongoFile {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<INewFile[]>([]);
  const [uploadQueue, setUploadQueue] = useState<INewFile[]>([]);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    const response = await api.get("/posts");
    const filesInDatabase = response.data.map(
      (file: MongoFile) =>
        ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size).toString(),
          preview: file.url,
          progress: 100,
          uploaded: true,
          url: file.url,
        } as INewFile),
    );

    setUploadedFiles(filesInDatabase);
  }

  const handleUpload = (files: File[]) => {
    const newUploadedFiles = files.map((file) =>
      file.size <= 2 * 1024 * 1024
        ? ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size).toString(),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
          } as INewFile)
        : ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size).toString(),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: true,
            url: null,
          } as INewFile),
    );

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
    setUploadQueue(
      uploadQueue.concat(
        newUploadedFiles.filter((file) => file.error !== true),
      ),
    );
  };

  useEffect(() => {
    uploadQueue.forEach((file) => {
      processUpload(file);
    });
    setUploadQueue([]);
  }, [uploadQueue.length !== 0]);

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

    if (uploadedFile.file) {
      data.append("file", uploadedFile.file, uploadedFile.name);
    }

    api
      .post("/posts", data, {
        onUploadProgress: (e) => {
          updateFile(uploadedFile.id, {
            progress: e.total ? Math.round((e.loaded * 100) / e.total) : 0,
          });
        },
      })
      .then((response) => {
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
        {!!uploadedFiles && (
          <FilesList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
