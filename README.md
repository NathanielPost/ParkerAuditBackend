# Parker Card Audit Backend

A Node.js/Express backend API for managing scores, built with PostgreSQL and designed for cloud deployment.

## Features

- RESTful API for score management
- PostgreSQL database with connection pooling
- CORS enabled for frontend communication
- Health check endpoints
- Production-ready deployment configuration

## API Endpoints

### Scores
- `GET /api/scores` - Get all scores
- `GET /api/scores/:id` - Get specific score
- `POST /api/scores` - Create new score
- `PUT /api/scores/:id` - Update score
- `DELETE /api/scores/:id` - Delete score

### Health Checks
- `GET /` - Basic health check
- `GET /api/health` - Database health check

## Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (local or hosted)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ParkerAuditBackend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp env.example .env
```

Edit `.env` with your database credentials:
```
DATABASE_URL=postgres://username:password@hostname:5432/database_name
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Set up database
Run the SQL commands in `database/schema.sql` to create the required tables.

5. Start the server
```bash
npm start
```

The server will be available at `http://localhost:3001`

## Database Schema

### Scores Table
```sql
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  player VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Deployment

### Render
1. Create a new PostgreSQL database on Render
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL` (automatically provided by Render PostgreSQL)
5. Deploy

### Manual Deployment
Set the following environment variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NODE_ENV=production`
- `PORT` - Port number (optional, defaults to 3001)
- `CORS_ORIGIN` - Your frontend domain

## Project Structure

```
├── config/
│   └── database.js      # Database configuration
├── routes/
│   └── scores.js        # Score API routes
├── database/
│   └── schema.sql       # Database schema
├── server.js            # Main application file
├── package.json         # Dependencies and scripts
├── render.yaml         # Render deployment config
└── README.md           # This file
```

## Example Usage

### Create a Score
```bash
curl -X POST http://localhost:3001/api/scores \
  -H "Content-Type: application/json" \
  -d '{"player": "John Doe", "score": 1500}'
```

### Get All Scores
```bash
curl http://localhost:3001/api/scores
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `CORS_ORIGIN` | Allowed CORS origins | * |