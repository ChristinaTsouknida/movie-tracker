# Movie Tracker

A full-stack web application for tracking movies you want to watch and have already watched.
Search for movies using the TMDB API, organize them into watchlist/watched categories, and
manage your personal movie collection

## Tech Stack

**Backend**
 - FastAPI (Python)
 - SQLAlchemy ORM
 - MySQL
 - JWT authentication
 - Swagger / OpenAPI documentation

**Frontend**
 - React + TypeScript + Vite
 - Tailwind CSS
 - React Hook Form + Zod validation
 - React Router

**Infrastructure**
 - Docker & Docker Compose
 - TMDB API (movie data)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose
- A [TMDB API](https://www.themoviedb.org/documentation/api) account (free) to get an API Read Access Token

### Option A: Run with Docker Compose (recommended)

This runs the entire application (backend, frontend and MySQL database) with a single command.

1. Clone the repository
   ```bash   
   git clone https://github.com/ChristinaTsouknida/movie-tracker
   cd movie-tracker
   ```

2. Create a ```.env``` file in the project root with the following variables:
   MYSQL_ROOT_PASSWORD=your_password
   MYSQL_DATABASE=movie_tracker
   DATABASE_URL=mysql+pymysql://root:your_password@mysql:3306/movie_tracker
   TMDB_READ_ACCESS_TOKEN=your_tmdb_token
   JWT_SECRET_KEY=your_secret_key

3. Build and start all services
   ```bash   
   docker compose up --build
   ```

4. Once running, access:
 - Frontend: [http://localhost:5173](http://localhost:5173)
 - Backend API: [http://localhost:8000](http://localhost:8000)
 - Swagger docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Option B: Manual Setup (for development)

**Backend**

1. Navigate to the backend folder and create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   ```
   
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   
3. Create a ```.env``` file in the ```/backend``` folder:
   DATABASE_URL=mysql+pymysql://root:root@localhost:3306/movie_tracker
   TMDB_READ_ACCESS_TOKEN=your_tmdb_token
   JWT_SECRET_KEY=your_secret_key

4. Start a MySQL container:
   ```bash
   docker run --name movie-tracker-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=movie-tracker -p 3306:3306 -d mysql:8.0
   ```
   
5. Run the backend:
   ```bash
   fastapi dev main.py
   ```
   
**Frontend**

1. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
   
2. Run the frontend:
   ```bash
   npm run dev
   ```