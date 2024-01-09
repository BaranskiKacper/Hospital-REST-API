# Hospital REST API

## Overview
The Hospital REST API is a full-stack application designed to manage hospital operations. It consists of a frontend developed with Next.js and a backend powered by NestJS. The application uses PostgreSQL as its database system and pgAdmin as a web-based administration tool for PostgreSQL.

## Project Structure
- `frontend`: The frontend application built using Next.js. It provides the user interface for the system.
- `nestjs`: The backend application developed with NestJS. It handles business logic, database interactions, and API endpoints.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- Docker (for Docker-based setup)

## Installation

### Backend Setup (NestJS)
1. Navigate to the `nestjs` directory.
2. Install the necessary dependencies:
```
npm install
```
3. Set up the `.env` file with the required environment variables.
4. Start the backend server:
```
npm run start
```

### Frontend Setup (Next.js)
1. Go to the `frontend` directory.
2. Install dependencies:
```
npm install
```
3. Configure the `.env` file with appropriate settings.
4. Launch the frontend application:
```
npm run dev
```
