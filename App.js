import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Assets/styles';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [pressed, setPressed] = useState(Array(9).fill(false));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLineStyle, setWinningLineStyle] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  useEffect(() => {
    checkWinner();
  }, [checkWinner, squares]);

  const toggleSquare = index => {
    if (pressed[index] || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = player;
    setSquares(newSquares);

    const newPressed = [...pressed];
    newPressed[index] = true;
    setPressed(newPressed);

    checkWinner(newSquares, player);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const clearSquare = index => {
    if (pressed[index] && !winner) {
      const newSquares = [...squares];
      newSquares[index] = '';
      setSquares(newSquares);

      const newPressed = [...pressed];
      newPressed[index] = false;
      setPressed(newPressed);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setPressed(Array(9).fill(false));
    setPlayer('X');
    setWinner(null);
    setWinningLineStyle(null);
  };

  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for a draw
    const isDraw = pressed.filter(square => square).length === 9;

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner('Winner: ' + squares[a]);
        setWinningLineStyle([a, b, c]);
        if (squares[a] === 'X') {
          setXWins(xWins + 1);
        } else if (squares[a] === 'O') {
          setOWins(oWins + 1);
        }
        return;
      }
    }
    if (isDraw) {
      setWinner('Draw');
      setDraws(draws + 1);
      return;
    }
  };

  return (
    <View style={styles.container}>
            <TouchableOpacity
        title="Reset Board"
        style={styles.resetButton}
        onPress={resetGame}>
        <View>
          <Text style={styles.resetText}> Reset Board</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        title="Reset Score"
        style={styles.resetButton2}
        onPress={resetScores}>
        <View>
          <Text style={styles.resetText}> Reset Score</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBoxX}>
          <Text style={styles.scoreText}>X Wins:</Text>
          <Text style={styles.scoreText}>{xWins}</Text>
        </View>
        <View style={styles.scoreBoxD}>
          <Text style={styles.scoreText}>Draws:</Text>
          <Text style={styles.scoreText}>{draws}</Text>
        </View>
        <View style={styles.scoreBoxO}>
          <Text style={styles.scoreText}>O Wins:</Text>
          <Text style={styles.scoreText}>{oWins}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {squares.map((value, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              pressed[index] ? clearSquare(index) : toggleSquare(index)
            }>
            <View
              style={[
                styles.button,
                value === 'X' && styles.buttonX,
                value === 'O' && styles.buttonO,
                // eslint-disable-next-line react-native/no-inline-styles
                pressed[index] && {backgroundColor: '#040720'},
                winner &&
                  winningLineStyle &&
                  winningLineStyle.includes(index) &&
                  styles.winningSquare,
              ]}>
              <Text style={value === 'X' ? styles.symbolX : styles.symbolO}>
                {value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.turnBox}>
        <Text style={styles.turnText}>
          {winner && <Text style={styles.turnText}>{winner}!</Text>}
          {!winner && <Text style={styles.turnText}>{player} Turn</Text>}
        </Text>
      </View>
    </View>
  );
}
