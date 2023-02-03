import { FileInfo } from "./FileInfo";

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { CircularProgressbar } from "react-circular-progressbar";
import { INewFile } from "../App";

interface IFilesListParams {
  files: INewFile[];
  onDelete: (id: string) => Promise<void>;
}

export function FilesList({ files, onDelete }: IFilesListParams) {
  return (
    <div>
      {files.map((uploadedFile) => (
        <li
          key={uploadedFile.id}
          className="flex justify-between items-center text-zinc-600 mt-3"
        >
          <FileInfo file={uploadedFile} onDelete={onDelete} />
          <div className="flex">
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" },
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="nooponer noreferrer"
              >
                <MdLink className="mr-2" size={24} color="#222" />
              </a>
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle className="text-green-600" size={24} />
            )}

            {uploadedFile.error && (
              <MdError className="text-red-600" size={24} />
            )}
          </div>
        </li>
      ))}
    </div>
  );
}
