# Todo List Backend API

A robust RESTful API for managing todo items with features like authentication, pagination, filtering, and automatic task completion.

## Summary

This is a Node.js/Express backend application that provides a RESTful API for managing todo items. It includes user authentication, CRUD operations for todos, and automated task management features. The API is built with TypeScript and uses MongoDB for data storage.

## Functional Features

- **User Authentication**
  - User registration and login
  - JWT-based authentication
  - Secure password handling

- **Todo Management**
  - Create, read, update, and delete todo items
  - Mark todos as complete/incomplete
  - Set due dates for todos
  - Add descriptions to todos

- **Advanced Todo Features**
  - Pagination for listing todos
  - Filtering by completion status
  - Date range filtering
  - Search functionality in title and description
  - Sorting by different fields

- **Automated Features**
  - Automatic completion of overdue todos

## Technical Features

- **API Documentation**
  - Interactive API testing with Swagger documentation

- **Security**
  - JWT authentication with HTTP-only cookies
  - Password hashing with bcrypt
  - Input validation and sanitization
  - Rate limiting (100 requests per minute per IP)
  - CORS protection with configurable origins
  - Request size limiting (10kb)

- **Performance & Reliability**
  - Pagination for large datasets
  - Efficient database queries and indexes
  - Error handling middleware
  - Request validation

- **Monitoring & Logging**
  - Winston logger implementation
  - Daily rotating log files
  - Different log levels (error, warn, info, debug)
  - Request logging

## Requirements

- Node.js
- MongoDB
- TypeScript
- npm or yarn

## Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/purvesh261/todo-list-backend.git
   cd todo-list-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   - For development:
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm start
     ```

6. **Access the API Documentation**
   - API Documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos (with pagination and filtering)
- `GET /api/todos/:id` - Get a specific todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle-complete` - Toggle todo completion status
