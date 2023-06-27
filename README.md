# Social Media API

## Description
The Social Media API is a RESTful API that allows users to manage thoughts and interact with other users. It provides CRUD operations for thoughts and users, as well as features such as adding reactions and managing friends. This API serves as the backend for a social media application.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd social-media-api`
3. Install the dependencies: `npm install`

## Configuration
1. Create a `.env` file in the root directory.
2. Add the following environment variables to the `.env` file:
   - `MONGODB_URI`: The MongoDB connection URI.
   - `PORT`: The port number for the server.

## Usage
1. Start the server: `npm start`
2. The API will be accessible at `http://localhost:<port>`, where `<port>` is the port number specified in the `.env` file.
3. Use an API testing tool like Postman or cURL to send requests to the endpoints.

## API Endpoints
- `GET /api/users`: Get all users.
- `GET /api/users/:userId`: Get a single user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:userId`: Update a user by ID.
- `DELETE /api/users/:userId`: Delete a user by ID.
- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user.
- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:thoughtId`: Get a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID.
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID.
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Contributing
Contributions to the Social Media API are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.

## License
This project is copyrighted by Jackilyn Tan licensed under the MIT License. See the license file for more information.
