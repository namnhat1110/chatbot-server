# Chatbot Backend

This is the backend for the Chatbot application. It is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Production Link](#production-link)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Important Files](#important-files)

## Production Link

- Backend server: [Render](https://chatbot-server-u7hf.onrender.com/api/history)
- Database: [Mongo Atlas](https://cloud.mongodb.com/v2/6783e74349d1cb5270da4e6a#/metrics/replicaSet/6783f05902ad6c1845bfd7bb/explorer/test/messages/find)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/namnhat1110/chatbot-server.git
   cd chatbot-server
   ```

2. **Install Dependencies**:

   ```sh
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   GEMINI_API_KEY=your_gemini_api_key
   ```

## Running Locally

1. **Start MongoDB**: Ensure MongoDB is running on your local machine or use a cloud MongoDB service.

2. **Run the Development Server**:

   ```sh
   yarn dev
   ```

3. **Access the Application**: Open your browser and navigate to `http://localhost:5000`.

## Running Tests

1. **Run Unit Tests**:

   ```sh
   yarn test
   ```

## Environment Variables

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The URI for connecting to MongoDB.
- `GEMINI_API_KEY`: The API key for the Gemini AI service.

## Important Files

- **server.ts**: Entry point of the application.
- **config.ts**: Configuration file for environment variables.
- **chat.controller.ts**: Controller for chat-related endpoints.
- **gemini.service.ts**: Service for interacting with the Gemini AI.
- **message.service.ts**: Service for handling messages.
