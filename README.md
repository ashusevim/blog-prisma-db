# Blog Prisma DB

A RESTful API backend for a blog platform built with Express.js, TypeScript, and Prisma ORM with PostgreSQL.

## Overview

This project provides a complete backend API for a blog application with user authentication, post management, comments, and likes functionality. It uses Prisma as the ORM for database operations with PostgreSQL. 

## Features

- **User Management**: Create and manage user accounts with authentication
- **Posts**: Create, read, update, and delete blog posts
- **Comments**:  Add comments to posts
- **Likes**: Like functionality for posts
- **TypeScript**: Fully typed codebase for better developer experience
- **Database Migrations**: Prisma migrations for database schema management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Language**: TypeScript
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Authentication**: bcrypt for password hashing
- **Middleware**:  CORS, Morgan (logging)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashusevim/blog-prisma-db.git
   cd blog-prisma-db
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/prod?schema=public"
   NODE_ENV="production"
   PORT=8080
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

## Usage

### Development Mode

Start the development server with hot reload: 

```bash
npm run dev
```

The API will be available at `http://localhost:3000` (or the PORT specified in your `.env` file).

### API Endpoints

#### Root
- `GET /` - Health check endpoint

#### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get post by ID
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

#### Comments
- `GET /comments` - Get all comments
- `POST /comments` - Create a new comment
- `GET /comments/:id` - Get comment by ID
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

#### Likes
- `GET /likes` - Get all likes
- `POST /likes` - Create a new like
- `DELETE /likes/:id` - Remove a like

## Database Schema

### User
- `id` - Unique identifier
- `handle` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `createdAt` - Account creation timestamp

### Post
- `id` - Unique identifier
- `title` - Post title
- `body` - Post content
- `userId` - Author reference
- `createdAt` - Post creation timestamp

### Comment
- `id` - Unique identifier
- `body` - Comment content
- `userId` - Author reference
- `postId` - Post reference
- `createdAt` - Comment creation timestamp

### Like
- `id` - Unique identifier
- `userId` - User reference
- `postId` - Post reference
- `createdAt` - Like creation timestamp

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Project Structure

```
blog-prisma-db/
├── prisma/
│   ├── migrations/      # Database migrations
│   └── schema.prisma    # Prisma schema definition
├── src/
│   ├── routes/          # API route handlers
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   ├── comments.ts
│   │   └── likes.ts
│   └── app.ts           # Express app configuration
├── generated/
│   └── prisma/          # Generated Prisma Client
├── . env                 # Environment variables (not in repo)
├── .env.example         # Example environment variables
├── package.json         # Project dependencies
└── prisma. config.ts     # Prisma configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Reference/Resources

- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
