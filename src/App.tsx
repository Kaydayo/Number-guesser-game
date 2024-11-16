import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"
import Game from "./components/Game";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Game />
    </ChakraProvider>
  );
}

export default App;
