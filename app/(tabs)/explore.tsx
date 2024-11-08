import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

const GRID_SIZE = 4;
const INITIAL_TILES = 10;
const MAX_TILE_VALUE = 5;

const generateRandomTiles = () => {
  return Array.from({ length: INITIAL_TILES }, () => Math.floor(Math.random() * MAX_TILE_VALUE) + 1);
};

const Game = () => {
  const [tiles, setTiles] = useState(generateRandomTiles);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    if (tiles.length >= GRID_SIZE * GRID_SIZE) {
      endGame();
    }
  }, [tiles]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const endGame = useCallback(() => {
    Alert.alert(
      'Game Over',
      `Your score: ${score}\nHigh score: ${highScore}`,
      [{ text: 'Play Again', onPress: resetGame }]
    );
  }, [score, highScore]);

  const resetGame = useCallback(() => {
    setTiles(generateRandomTiles());
    setScore(0);
    setAnimations([]);
  }, []);

  const handleTilePress = useCallback((index) => {
    setTiles(currentTiles => {
      const newTiles = [...currentTiles];
      const tileValue = newTiles[index];

      if (tileValue > 0) {
        newTiles[index] = tileValue - 1;
        if (newTiles[index] === 0) {
          newTiles.splice(index, 1);
          setScore(prevScore => prevScore + 1);
          triggerAnimation(index);
        }
      }

      return newTiles;
    });
  }, []);

  const triggerAnimation = useCallback((index) => {
    const newAnimation = {
      scale: new Animated.Value(1),
      color: new Animated.Value(0),
    };

    setAnimations(prev => [...prev, newAnimation]);

    Animated.parallel([
      Animated.timing(newAnimation.scale, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(newAnimation.color, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setAnimations(prev => prev.filter((_, i) => i !== 0));
    });
  }, []);

  const renderTile = useCallback(({ item, index }) => {
    const animation = animations[index] || { scale: new Animated.Value(1), color: new Animated.Value(0) };
    const backgroundColor = animation.color.interpolate({
      inputRange: [0, 1],
      outputRange: ['#4CAF50', '#FF0000'],
    });

    return (
      <TouchableOpacity key={index} style={styles.tile} onPress={() => handleTilePress(index)}>
        <Animated.View style={[styles.tileContent, { transform: [{ scale: animation.scale }], backgroundColor }]}>
          <Animated.Text style={styles.tileText}>{item}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }, [animations, handleTilePress]);

  const memoizedTiles = useMemo(() => tiles.map((tile, index) => ({ item: tile, index })), [tiles]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.highScore}>High Score: {highScore}</Text>
      <View style={styles.grid}>
        {memoizedTiles.map(renderTile)}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  score: {
    fontSize: 24,
    marginBottom: 10,
  },
  highScore: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  grid: {
    width: '80%',
    aspectRatio: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    width: '22%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Game;
