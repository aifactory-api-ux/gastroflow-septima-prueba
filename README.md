# GastroFlow - Restaurant Digital Menu Platform

A modern restaurant digital menu platform built with NestJS (backend) and React (frontend).

## Tech Stack

- **Backend**: Node.js 20.x, NestJS 10.x, TypeScript 5.x
- **Frontend**: React 18.x, Vite 4.x, TypeScript 5.x
- **Database**: PostgreSQL 15
- **Cache**: Redis 7.x
- **Message Queue**: RabbitMQ 3.x
- **Infrastructure**: Docker 24.x, docker-compose 2.x

## Quick Start

### Prerequisites

- Node.js 20.x
- Docker 24.x
- docker-compose 2.x

### Installation

1. Clone the repository
2. Run `./run.sh` to start all services
3. Access the frontend at http://localhost:24000

## Services

| Service | Port | Description |
|---------|------|-------------|
| API | 23001 | NestJS backend API |
| Frontend | 24000 | React frontend |
| PostgreSQL | 25432 | Database (internal) |
| Redis | 26379 | Cache (internal) |
| RabbitMQ | 25672 | Message queue (internal) |

## Development

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT