import React, { useState, useEffect } from 'react';
import { Button, Box, Text, Input } from '@chakra-ui/react';
import {Select} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Keypad from './Keypad';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { generateRandomNumber } from './utils';

const Game = () => {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(5); 
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [level, setLevel] = useState('Easy')


  useEffect(() => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1); 
  }, []);

  const restartGame = (text = 'Game restarted!!') => {
    setSecretNumber(generateRandomNumber());
    reset()
    if (level === 'Easy') {
        setAttempts(4); 
      } else if (level === 'Normal') {
        setAttempts(6); 
      } else {
        setAttempts(10);
      }
    toast.success(text)
  };

  
  const schema = Yup.object().shape({
    guess: Yup.number()
      .min(1, 'Guess must be at least 1')
      .max(100, 'Guess must be at most 100')
      .required('Please make a guess'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleKeypadClick = (value: string) => {
    setValue('guess', watch('guess') + Number(value)); 
  };
  const handleLevelSelect = (level: string) => {
    setLevel(level);
    restartGame(`Difficult level: ${level}`)
  };


  
  const handleGuess = (data: { guess: number }) => {
    const userGuess = data.guess;

    if (userGuess === secretNumber) {
        toast.success('Correct Guess! You guessed the correct number.');
      setGameOver(true);
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        toast.error(`Game Over! You lost. The correct number was ${secretNumber}.`);
        setGameOver(true);
      } else {
        const message = userGuess < secretNumber ? 'Too Low!' : 'Too High!';
        toast.warn(`${message} You have ${attempts - 1} attempts left.`);
      }
    }

    setValue('guess',0);
    reset();
  };


  return (
    <Box p={5} maxWidth="400px" mx="auto" textAlign="center">
        

        <Box>
            <Box position={"absolute"} left={"20px"} justifyContent={"left"}>
                <Text  fontWeight={"bolder"} style={{
    textShadow: `
      -2px -2px 0 #fff
    `,
  }}>Difficulty Level: </Text>
            <Input
          value={level}
          placeholder="Select Difficulty Level"
          mb="1"
          readOnly
          bgColor={"white"}
          color={"red.600"}
          fontWeight={"bold"}
         
        />
            </Box>
       

        {/* Custom dropdown options */}
        <Box display={"flex"} gap={"8"} justifyContent={"center"}>
          <Button
            width="60px"
            onClick={() => handleLevelSelect('Easy')}
            mb="2"
            bgColor={"pink.400"}
          >
            Easy
          </Button>
          <Button
            width="60px"
            onClick={() => handleLevelSelect('Normal')}
            mb="2"
            bgColor={"yellow.400"}
          >
            Normal
          </Button>
          <Button
            width="60px"
            onClick={() => handleLevelSelect('Hard')}
            mb="2"
            bgColor={"orange.400"}
          >
            Hard
          </Button>
        </Box>
      </Box>
      
      <Text
  fontSize="3xl"
  fontWeight="bold"
  mb={1}
  style={{
    textShadow: `
      -2px -2px 0 #fff, 
      2px -2px 0 #fff, 
      -2px 2px 0 #fff, 
      2px 2px 0 #fff,
      -3px -3px 0 #fff,
      3px -3px 0 #fff,
      -3px 3px 0 #fff,
      3px 3px 0 #fff
    `,
  }}
>
  Number Guesser Game
</Text>
      {gameOver ? (
        <Box>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Play Again
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(handleGuess)}>
          <Text mb={1} color={"white"}   style={{
    textShadow: `
      -1px -1px 0 #000, 
      1px -1px 0 #000, 
      -1px 1px 0 #000, 
      1px 1px 0 #000
    `,
  }}
>Enter your guess (1 - 100):</Text>
          <input
            type="number"
            {...register('guess')}
            placeholder="Your guess"
            style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
          />
          {errors.guess && (
            <Text color="red.500" mt={2}>
              {errors?.guess?.message}
            </Text>
          )}
          <Box mt={0} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} maxH={"100px"}>
            <Button type="submit" colorScheme="teal" disabled={gameOver}>
              Submit Guess
            </Button>
            <Button  onClick={() => restartGame()} my={20}>
            Restart Game
        </Button>
          </Box>
        </form>
      )}
      <Box mt={0} position={"absolute"} top={4} right={"20px"} bgColor={"white"} borderRadius={"10px"} px={4}>
        <Text fontSize="lg" fontWeight={'bolder'}>Attempts Left: <Box as="span" color={"blue.500"}>{attempts}</Box></Text>
      </Box>
      {!gameOver && <Keypad setGuess={handleKeypadClick} />}
    </Box>
  );
};


export default Game;