import { ChakraProvider } from "@chakra-ui/react";
import NumberGuesserGame from "./NumberGuesserGame";
import { defaultSystem } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <NumberGuesserGame />
    </ChakraProvider>
  );
}

export default App;
