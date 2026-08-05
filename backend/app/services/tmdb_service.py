import httpx
from app.core.config import settings

def search_movies_service(query):
    return httpx.get('https://api.themoviedb.org/3/search/movie',
            params={'query': query}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']


def discover_movies_service(genre_id):
    return httpx.get('https://api.themoviedb.org/3/discover/movie',
            params={'with_genres': genre_id, 'sort_by': 'popularity.desc'}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']
