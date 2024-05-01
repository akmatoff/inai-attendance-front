import { Toaster } from "react-hot-toast";
import RootRouter from "./components/RootRouter";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <RootRouter />
    </>
  );
}

export default App;
