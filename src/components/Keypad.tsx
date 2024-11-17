import React from 'react';
import { Button, Grid, Box } from '@chakra-ui/react';

interface KeypadProps {
    setGuess:  (value: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ setGuess }) => {
    const handleKeypadClick = (value: string) => {
        setGuess(value); 
      };

      const buttonColors = [
        'pink.400',
        'yellow.300',
        'green.400',
        'blue.300',
        'purple.300',
        'orange.300',
        'green.300',
        'pink.500',
        'blue.400',
        'yellow.400',
      ];

      return (
        <Box mt={4} bgColor={"white"} p={5}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num, index) => (
              <Button
                key={num}
                onClick={() => handleKeypadClick(num)}
                fontSize="2xl"
                height="70px"
                bg={buttonColors[index]}
                color="white"
                borderRadius="md" 
                boxShadow="0 6px rgba(0, 0, 0, 0.2)" 
                transform="translateY(0)" 
                _hover={{
                  boxShadow: '0 8px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-2px)', 
                }}
                _active={{
                  boxShadow: '0 2px rgba(0, 0, 0, 0.1)', 
                  transform: 'translateY(4px)', 
                }}
                _focus={{ outline: 'none' }} 
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => handleKeypadClick('BET')}
              fontSize="lg"
              height="70px"
              bg="blue.500"
              color="white"
              borderRadius="md"
              boxShadow="0 6px rgba(0, 0, 0, 0.2)"
              transform="translateY(0)"
              _hover={{
                boxShadow: '0 8px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-2px)',
              }}
              _active={{
                boxShadow: '0 2px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(4px)',
              }}
            >
              BET
            </Button>
            <Button
              onClick={() => handleKeypadClick('CLEAR')}
              fontSize="lg"
              height="70px"
              bg="blue.500"
              color="white"
              borderRadius="md"
              boxShadow="0 6px rgba(0, 0, 0, 0.2)"
              transform="translateY(0)"
              _hover={{
                boxShadow: '0 8px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-2px)',
              }}
              _active={{
                boxShadow: '0 2px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(4px)',
              }}
            >
              CLEAR
            </Button>
          </Grid>
        </Box>
      );
};

export default Keypad;
