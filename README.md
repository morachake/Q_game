# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# Game Instructions

## Overview
The game is a tile-based challenge where players need to press tiles to reduce their value until they disappear. The goal is to achieve the highest score possible before the game ends.

## Game Setup
- The game grid consists of a 4x4 layout.
- Initially, there are 10 random tiles with values ranging from 1 to 5.

## How to Play
1. **Press a Tile**: Tap on any tile to decrease its value by 1.
2. **Tile Value**: If the tile's value becomes 0 after your press, it will disappear from the grid.
3. **Score**: Each time a tile disappears, your score increases by 1.

## Game Over
- The game ends when the number of tiles on the grid reaches 16 (the maximum capacity of the grid).
- An alert will display your final score.

## Resetting the Game
- After the game is over, you can restart by pressing the reset button, which will generate a new set of tiles and reset your score to 0.

## Animations
- When a tile is pressed and disappears, an animation will play to indicate the action, providing visual feedback to the player.

## Objective
- The objective is to clear as many tiles as possible and achieve the highest score before the game ends.