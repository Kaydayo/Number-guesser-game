import React from 'react';
import { Button, Grid, Box } from '@chakra-ui/react';

interface KeypadProps {
  setGuess: React.Dispatch<React.SetStateAction<string>>;
}

const Keypad: React.FC<KeypadProps> = ({ setGuess }) => {
  const handleClick = (value: string) => {
    setGuess((prev) => prev + value);
  };

  return (
    <Box mt={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
          <Button
            key={num}
            onClick={() => handleClick(num)}
            fontSize="2xl"
            height="60px"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
          >
            {num}
          </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default Keypad;
