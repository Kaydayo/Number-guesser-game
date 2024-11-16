import React, { useState, useEffect } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Keypad from './Keypad';
import { toast } from 'react-toastify'

const Game = () => {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(5); 
  const [guess, setGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);


  useEffect(() => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1); 
  }, []);

  
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  const handleGuess = (data: { guess: number }) => {
    const userGuess = data.guess;

    if (userGuess === secretNumber) {
        toast.success('Correct Guess! You guessed the correct number.', {
            position: "top-center",
            autoClose: 3000,
          });
      setGameOver(true);
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        toast.error(`Game Over! You lost. The correct number was ${secretNumber}.`, {
            position: "top-center",
            autoClose: 3000,
          });
        setGameOver(true);
      } else {
        const message = userGuess < secretNumber ? 'Too Low!' : 'Too High!';
        toast.warn(`${message} You have ${attempts - 1} attempts left.`, {
            position: "top-center",
            autoClose: 3000,
          });
      }
    }

    setGuess('');
    reset();
  };

  return (
    <Box p={5} maxWidth="400px" mx="auto" textAlign="center">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
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
          <Text mb={2}>Enter your guess (1 - 100):</Text>
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
          <Box mt={4}>
            <Button type="submit" colorScheme="teal" disabled={gameOver}>
              Submit Guess
            </Button>
          </Box>
        </form>
      )}
      <Box mt={4}>
        <Text fontSize="lg">Attempts Left: {attempts}</Text>
      </Box>
      {!gameOver && <Keypad setGuess={setGuess} />}
    </Box>
  );
};

export default Game;