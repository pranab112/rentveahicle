# FleetLink - Shared Inventory System

A centralized shared inventory system for vehicle operators.

## Project Structure

This project is set up as a monorepo containing both the frontend and backend.

- `frontend/`: Next.js / React application
- `backend/`: FastAPI Python application
- `docker-compose.yml`: Orchestration for local development

## Quick Start (Docker)

1.  **Prerequisites**: Ensure Docker and Docker Compose are installed.

2.  **Environment Setup**:
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```

3.  **Start Services**:
    Run the following command to build and start the database, backend, and frontend:
    ```bash
    docker-compose up --build
    ```

    - Frontend: http://localhost:3000
    - Backend API: http://localhost:8000
    - API Docs: http://localhost:8000/docs

4.  **Database Initialization**:
    The database is automatically created by the postgres service. To run migrations or seed data:
    ```bash
    # Open a shell in the backend container
    docker-compose exec backend bash

    # Run initialization script
    python scripts/init_db.py
    
    # Run seeder
    python scripts/seed.py
    ```

## Manual Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

## Tech Stack
- **Frontend**: React, Tailwind CSS, Lucide Icons, SWR
- **Backend**: Python, FastAPI, SQLAlchemy
- **Database**: PostgreSQL 15
