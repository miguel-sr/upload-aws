import { FileInfo } from "./FileInfo";

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { CircularProgressbar } from "react-circular-progressbar";
import { IFilesToUpload } from "../App";

interface IFilesListParams {
  files: IFilesToUpload[];
}

export function FilesList({ files }: IFilesListParams) {
  console.log(files);
  return (
    <div>
      {files.map((uploadedFile) => (
        <li
          key={uploadedFile.id}
          className="flex justify-between items-center text-zinc-600 mt-3"
        >
          <FileInfo file={uploadedFile} />
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
                href="https://lh3.googleusercontent.com/dp_RfslEQF48_AekJ0QfhsP_rlTb4ZlaWNKJfH9ghvDh7E13Q97U4h5dDA2259QEy7fWPrRp19nWai41MEzh4hef9s7L3G05EWojLBQdrfMGNA5HJaz_YjDtQZ4m8oH0yMqwyOJNwtVqBueJwFGg8FLy-Buf-uOdxnRupJRwLEnP5jS1R_1dzOokkSPNrD7xh0xujZ7oVnRZRTAHOlWbkPGZ7_D0kMM9Co5EjN5Z-RAr2TEGCdGATNQbwGtan-rUj9btScHwHCXdyKtjKUFhGKQN2NYgFE_IWuBCc93lA739uql8OpCJQwZcC2O_FRkLvP5ksXAMS9Gli54x9iSZXUELJNyk9gf3R0H2JcMadidVqXp59MIzjfMSEb73B4iOcFB5fkqjA7GV3kpiXC3OCuezolJu_VlktE7EPiKoCgtWx1khTRmiu-FILpc4FIdLZ2kbk0HwcOpw9sPu3gs0ThUNpzR4sEmw5NqOGoZ_HQPD0AGrvSPcUTl4RQuassF6qYSdt6eWP2gq0r0bLmFORm7SEBsKlSoXNy-BcxAhONOpBeGX6KEuikBF4l_ManWsyTAIXKXg8zF_PrNR2VtnPhnHjzXsJk2Rejyx8Jv-Yh7fwfB3C0zWSAcbJWy8xjSH-BvTALk2jWP5uxMOPgiOPYKytvEgPTluJeZdch2CLxLOHfWYbUR3hYi0RQCejQEXB0NZpnNaOF1IJTIdnnptIHmc9Jy0mgFJkTS2SPVQWUlIRdqCLGp-d2YN7HZp2ebWdPr5gHoQ13OQlA7-B10qKrIsaqj0ch2V8pnDkLyNGTiwfJqKnR5sYC2TycqLeqLq6ONRHjWOXWUiYApCKae_Icp3dkRJjeXkE7eVBVvpdnHee5vux8bai-LqSaXZdn_tobRtAB-Znj3EK5H0GSZLNjcAgcb0miXVaKbMUP6aydxXY3R65LGt3NpNFFkFObd1Us07RnepOrIJqKIKfQ=w426-h757-no?authuser=0"
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
