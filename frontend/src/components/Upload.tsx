import { useDropzone } from "react-dropzone";

import { clsx } from "clsx";

export function Upload() {
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "flex flex-col items-center p-5 rounded-md border-2 border-dashed",
        "bg-zinc-50 outline-none transition-all duration-300",
        {
          "border-zinc-300": !isDragActive,
          "border-green-600": isDragAccept,
          "border-red-600": isDragReject,
        },
      )}
    >
      <input {...getInputProps()} />
      <p
        className={clsx("font-semibold transition-colors duration-300", {
          "text-zinc-400": !isDragActive,
          "text-green-600": isDragAccept,
          "text-red-600": isDragReject,
        })}
      >
        {!isDragActive ? "Insira arquivos aqui..." : null}
        {isDragAccept ? "Solte os arquivos aqui" : null}
        {isDragReject ? "Arquivo não suportado" : null}
      </p>
    </div>
  );
}
