import httpx
from app.core.config import settings

def search_movies_service(query):
    first_page = httpx.get('https://api.themoviedb.org/3/search/movie',
        params={'query': query, 'page': 1}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']
    second_page = httpx.get('https://api.themoviedb.org/3/search/movie',
        params={'query': query, 'page': 2}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']
    return first_page + second_page

def discover_movies_service(genre_id):
    return httpx.get('https://api.themoviedb.org/3/discover/movie',
            params={'with_genres': genre_id, 'sort_by': 'popularity.desc'}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']
