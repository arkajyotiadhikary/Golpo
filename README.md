# Golpo

**Golpo** is an AI-generated story-based game where the narrative unfolds based on the player's choices. Powered by Hugging Face Inference, Golpo provides dynamic and engaging storytelling, allowing players to experience unique adventures every time they play.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Golpo is a project that leverages AI to generate interactive stories. Players are presented with scenarios and must make choices that will determine the direction of the story. The game uses Hugging Face Inference to generate the story content, ensuring a vast range of possible narratives.

## Features

- AI-generated storylines based on user input.
- Dynamic decision-making with multiple possible outcomes.
- Separation of backend and frontend for modular development.
- Real-time interactions with the story, powered by AI.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for backend logic.
- **Express**: Web framework for handling HTTP requests.
- **TypeScript**: Type safety and tooling.
- **Hugging Face Inference**: AI library for generating story content.
- **Redis**: In-memory data structure store for caching.
- **ioredis**: Redis client for Node.js.
- **Cors**: Middleware for enabling CORS.
- **dotenv**: Environment variable management.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling.
- **Chakra UI**: UI component library for building accessible React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making requests to the backend.
- **React Router**: Routing library for React applications.

## Installation

### Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/yourusername/golpo.git
   cd golpo/backend
   ```
2. Install the required dependencies:

   ```bash
   npm install
   ```
3. Build the TypeScript code:

   ```bash
   npm run build
   ```
4. Start the server:

   ```bash
   npm start
   ```
  For development, you can use:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. To build the frontend for production:

   ```bash
   npm run build
   ```

## Usage

After setting up both the backend and frontend, you can start playing the game by navigating to the frontend's development server, usually at http://localhost:3000. The game will present you with various scenarios generated by AI, and you can choose how the story progresses.

## Contributing

Contributions are welcome! If you'd like to contribute to Golpo, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License
