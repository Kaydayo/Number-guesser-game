import React, { useState, useEffect } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
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
    setValue('guess', 0);
    setAttempts(10);
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
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleKeypadClick = (value: string) => {
    setValue('guess', watch('guess') + Number(value)); 
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = e.target.value;
    setLevel(selectedLevel);

    if (selectedLevel === 'Easy') {
        setAttempts(4); // Easy
      } else if (selectedLevel === 'Normal') {
        setAttempts(6); // Normal
      } else {
        setAttempts(10);

    restartGame(`Difficult level: ${selectedLevel}`)
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
    <Box p={5} maxWidth="400px" mx="auto" textAlign="center" >
        <Button  onClick={() => restartGame()} my={20}>
            Restart Game
        </Button>
        

        <Select value={level} onChange={handleLevelChange} mb="4" placeholder="select difficulty level">
        <option value="Easy">Easy - 4 Attempts</option>
        <option value="Normal">Normal - 6 Attempts</option>
        <option value="Hard">Hard - 10 Attempts</option>
      </Select>
    
      
      <Text fontSize="3xl" fontWeight="bold" mb={4} border="3px solid #000" outline="4px solid rgba(0, 0, 0, 0.3)">
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
      {!gameOver && <Keypad setGuess={handleKeypadClick} />}
    </Box>
  );
};
}

export default Game;