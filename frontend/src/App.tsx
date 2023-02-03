import "./styles/global.css";

import "react-circular-progressbar/dist/styles.css";

import { Upload } from "./components/Upload";
import { FilesList } from "./components/FilesList";

function App() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-md m-8 bg-white rounded-md p-3">
        <Upload />
        <FilesList />
      </div>
    </div>
  );
}

export default App;
