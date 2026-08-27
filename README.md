# Movie Tracker

A full-stack web application for tracking movies you want to watch and have already watched.
Search for movies using the TMDB API, organize them into watchlist/watched categories, and
manage your personal movie collection.

## Features

 - User registration and authentication (JWT)
 - Search for movies via TMDB API
 - Browse movies by category (Action, Comedy, Drama, Sci-Fi, Thriller)
 - Add movies to your Watchlist or mark them as Watched
 - View and manage your personal movie collection
 - Remove movies from your list

## Screenshots

### Login
![Login Page](./screenshots/login.png)

### Register
![Register Page](./screenshots/register.png)

### Home Page
![Home Page](./screenshots/homepage.png)

### Search
![Search Results](./screenshots/search.png)

### My List
![My List Page](./screenshots/mylist.png)

### API Documentation (Swagger)
![Swagger UI](./screenshots/swagger.png)

### Movie status

Each movie card has a menu (accessed via the ⋮ icon) where you can mark a movie as **Add to Watchlist** or **Watched**. A colored badge on the card indicates its current status:

 - 🟡 **Yellow** — in your Watchlist
 - 🟢 **Green** — marked as Watched
 - ⚪ **Gray** — not yet added to your list

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

2. Create a `.env` file in the root directory and add the following:

   ```env
   # Database & Auth (Choose your own values)
   MYSQL_ROOT_PASSWORD=your_custom_mysql_password
   MYSQL_DATABASE=movie_tracker
   DATABASE_URL=mysql+pymysql://root:your_custom_mysql_password@mysql:3306/movie_tracker
   JWT_SECRET_KEY=generate_any_random_string_here

   # External API (Required)
   # Get your free token at: https://www.themoviedb.org (Settings -> API -> API Read Access Token)
   TMDB_READ_ACCESS_TOKEN=your_actual_tmdb_v4_token
   ```

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
   
3. Create a `.env` file in the `/backend` folder:
   ```env
   DATABASE_URL=mysql+pymysql://root:root@localhost:3306/movie_tracker
   TMDB_READ_ACCESS_TOKEN=your_actual_tmdb_v4_token
   JWT_SECRET_KEY=generate_any_random_string_here
   ```

4. Start a MySQL container:
   ```bash
   docker run --name movie-tracker-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=movie_tracker -p 3306:3306 -d mysql:8.0
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

## Project Structure

```
movie-tracker/
├── backend/          # FastAPI backend (Python)
│   ├── app/
│   │   ├── controllers/   # API routes
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Database access
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── core/           # Config, database, security
│   ├── main.py
│   └── requirements.txt
├── frontend/         # React frontend (TypeScript)
│   └── src/
│       ├── pages/
│       ├── components/
│       └── shared/
└── docker-compose.yml
```

## Database Schema

The application uses three main entities: **Users**, **Movies**, and **UserMovies** (a many-to-many join table tracking each user's watchlist/watched status per movie).

```mermaid
erDiagram
  USERS ||--o{ USER_MOVIES : has
  MOVIES ||--o{ USER_MOVIES : appears_in
  USERS {
    int id PK
    string full_name
    string email
    string hashed_password
  }
  MOVIES {
    int id PK
    string title
    int year
    string category
    string poster_url
    int tmdb_id
  }
  USER_MOVIES {
    int id PK
    int user_id FK
    int movie_id FK
    string status
  }
```

## API Documentation

Once the backend is running, interactive API documentation (Swagger UI) is automatically available at:

[http://localhost:8000/docs](http://localhost:8000/docs)

This includes all available endpoints, request/response schemas and the ability to test API calls directly from the browser.


## Running Tests

The backend includes unit tests covering authentication logic, password security and business rules (duplicate prevention when adding movies to a list).

To run the tests:

   ```bash
   cd backend
   pytest
   ```

## Integration Testing (Postman)

The `postman/` folder contains a Postman collection with integration tests covering the full authentication flow (register → login → authenticated request).

To run it:

1. Import `postman/movie-tracker.postman_collection.json` into Postman
2. Create an environment (or use the collection with no environment — it uses collection variables)
3. Ensure the backend is running at `http://127.0.0.1:8000`
4. Run the collection using Postman's Collection Runner
