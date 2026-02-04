# Collaborative Editor

> Real-time collaborative text editor powered by YJS, TipTap, and Hocuspocus

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TipTap](https://img.shields.io/badge/TipTap-2.2-6C63FF)
![YJS](https://img.shields.io/badge/YJS-13.6-4CAF50)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)

## 🚀 Quick Start

```bash
git clone <repo-url>
cd cdv

docker compose up -d

open http://localhost:3000
```

That's it! The application will be available at [http://localhost:3000](http://localhost:3000).

## 📋 Features

- ✏️ **Real-time collaboration** - See changes from other users instantly
- 👥 **Cursor awareness** - View other users' cursors and selections
- 🎨 **Random user identity** - Automatic username and color generation
- 🖍️ **Text highlighting** - Highlight important text
- 💾 **Persistent storage** - Documents saved to PostgreSQL
- 🐳 **Docker ready** - One command deployment

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Compose                        │
├─────────────────┬─────────────────┬─────────────────────┤
│    Frontend     │    Backend      │     Database        │
│  React + TipTap │   Hocuspocus    │    PostgreSQL       │
│   Port: 3000    │   Port: 1234    │    Port: 5432       │
│                 │                 │                     │
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────────┐  │
│  │  TipTap   │──┼──│ WebSocket │──┼──│  documents    │  │
│  │  Editor   │  │  │  Server   │  │  │    table      │  │
│  └───────────┘  │  └───────────┘  │  └───────────────┘  │
│       │         │       │         │                     │
│  ┌────┴────┐    │  ┌────┴────┐    │                     │
│  │   YJS   │────┼──│   YJS   │    │                     │
│  │ (CRDT)  │    │  │  Sync   │    │                     │
│  └─────────┘    │  └─────────┘    │                     │
└─────────────────┴─────────────────┴─────────────────────┘
```

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React 18 + Vite | UI Framework |
| Editor | TipTap 2 | Rich text editor |
| Collaboration | YJS | CRDT for real-time sync |
| Backend | Hocuspocus | WebSocket server |
| Database | PostgreSQL 15 | Document persistence |
| Containerization | Docker Compose | Orchestration |

## 📁 Project Structure

```
cdv/
├── docker-compose.yml      # Service orchestration
├── README.md               # This file
│
├── frontend/               # React application
│   ├── Dockerfile          # Multi-stage build
│   ├── nginx.conf          # Web server config
│   ├── package.json        # Dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── index.html          # Entry HTML
│   └── src/
│       ├── main.jsx        # React entry point
│       ├── App.jsx         # Main component
│       ├── App.css         # Global styles
│       ├── components/
│       │   └── Editor.jsx  # TipTap editor
│       └── utils/
│           └── randomUser.js # User generator
│
├── backend/                # Hocuspocus server
│   ├── Dockerfile          # Node.js container
│   ├── package.json        # Dependencies
│   └── server.js           # WebSocket server
│
└── database/               # PostgreSQL
    └── init.sql            # Schema initialization
```

## 🔧 Development

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)

### Local Development (without Docker)

```bash
docker compose up postgres -d

cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgres://collab:collab123@postgres:5432/collab_editor` | PostgreSQL connection string |
| `PORT` | `1234` | Hocuspocus WebSocket port |

## 🧪 Testing Collaboration

1. Open [http://localhost:3000](http://localhost:3000) in two browser tabs
2. Start typing in one tab
3. Watch changes appear in real-time in the other tab
4. Notice the cursor positions and selections of other users

## 📊 Service Health

```bash
docker compose ps

docker compose logs -f

docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

## 🛑 Stopping the Application

```bash
docker compose down

docker compose down -v
```

## 👥 Team

- Jacek Andrzejewski
- Sviataslau Kaznacheyeu

## 📄 License

MIT License - feel free to use this project for educational purposes.
