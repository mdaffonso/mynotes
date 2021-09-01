import Scaffold from "./components/Scaffold/Scaffold";
import { Home } from "./screens/Home";
import { MainContextProvider } from "./contexts/MainContext";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <MainContextProvider>
      <Toaster
        position="bottom-center"
        reverseOrder={false} 
      />
      <Scaffold>
        <Home />
      </Scaffold>
    </MainContextProvider>
  );
}

export default App;
