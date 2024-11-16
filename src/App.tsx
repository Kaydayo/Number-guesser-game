import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"
import Game from "./components/Game";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <ToastContainer />
      <Game />
    </ChakraProvider>
  );
}

export default App;
