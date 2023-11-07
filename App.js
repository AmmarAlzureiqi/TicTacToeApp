import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B65EC',
  },
  headerContainer: {
    alignItems: 'center',
    top: -20,
  },
  headerRectangle: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EBDDE2',
  },
  resetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EBDDE2',
    left: 3,
  },
  playerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EBDDE2',
    left: -2,
    top: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    elevation: 5,
    width: 100,
    height: 100,
    margin: 5,
  },
  winningSquare: {
    backgroundColor: '#FF6347',
    color: 'white', // You can adjust the text color as needed
  },
  resetButton: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    elevation: 5,
    width: 130,
    height: 50,
    margin: 5,
    bottom: -30,
    left: -75,
  },
  resetButton2: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    elevation: 5,
    width: 130,
    height: 50,
    margin: 5,
    bottom: -30,
    left: 75,
    top: -30,
  },
  symbolX: {
    fontSize: 72,
    color: '#00FFFF',
    textAlign: 'center',
    alignItems: 'center',
    bottom: 5,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  symbolO: {
    fontSize: 72,
    color: '#EED202',
    textAlign: 'center',
    alignItems: 'center',
    bottom: 5,
    fontWeight: 'bold',
    textShadowColor: 'rgba(95, 251, 23, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scoreBoxX: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#2916F5',
    borderRadius: 10,
    elevation: 5,
    width: 80,
    height: 60,
    margin: 5,
    alignItems: 'center',
    top: -30,
  },
  scoreBoxD: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#2916F5',
    borderRadius: 10,
    elevation: 5,
    width: 80,
    height: 60,
    margin: 5,
    alignItems: 'center',
    top: -30,
  },
  scoreBoxO: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 50,
    shadowRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#2916F5',
    borderRadius: 10,
    elevation: 5,
    width: 80,
    height: 60,
    margin: 5,
    alignItems: 'center',
    top: -30,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF',
  },

  turnBox: {
    paddingHorizontal: 5,
    backgroundColor: '#2916F5',
    borderRadius: 10,
    elevation: 5,
    width: 125,
    height: 50,
    margin: 5,
    alignItems: 'center',
    top: 20,
  },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFFF',
    top: 9,
  },
});
