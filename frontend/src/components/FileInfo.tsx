import { Preview } from "./Preview";

import { IFilesToUpload } from "../App";

interface IFileInfoParams {
  file: IFilesToUpload;
}

export function FileInfo({ file }: IFileInfoParams) {
  return (
    <div className="flex items-center">
      <Preview src={file.preview} />
      <div className="flex flex-col ml-4">
        <strong>{file.name}</strong>
        <span className="text-sm text-zinc-400">
          {file.readableSize.toString()}
          {!!file.url && (
            <button className="border-0 bg-transparent text-red-600 ml-2 cursor-pointer">
              Excluir
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
