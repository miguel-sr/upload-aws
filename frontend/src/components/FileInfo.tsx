import { Preview } from "./Preview";

import { INewFile } from "../App";

interface IFileInfoParams {
  file: INewFile;
  onDelete: (id: string) => Promise<void>;
}

export function FileInfo({ file, onDelete }: IFileInfoParams) {
  return (
    <div className="flex items-center">
      <Preview src={file.preview} />
      <div className="flex flex-col ml-4">
        <strong>{file.name}</strong>
        <span className="text-sm text-zinc-400">
          {file.readableSize.toString()}
          {!!file.url && (
            <button
              onClick={() => onDelete(file.id)}
              className="border-0 bg-transparent text-red-600 ml-2 cursor-pointer"
            >
              Excluir
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
