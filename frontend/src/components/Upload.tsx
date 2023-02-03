import { useDropzone } from "react-dropzone";

import { clsx } from "clsx";

import { useEffect } from "react";

interface IUploadParams {
  onUpload: (files: File[]) => void;
}

export function Upload({ onUpload }: IUploadParams) {
  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  // useEffect(() => {
  //   fileRejections.forEach((rej) => {
  //     rej.errors.forEach((tes) => {
  //       console.log(tes.message);
  //     });
  //   });
  // }, [fileRejections]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles);
    }
    acceptedFiles.length = 0;
  }, [acceptedFiles]);

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
        Arraste alguma foto aqui...
      </p>
    </div>
  );
}
