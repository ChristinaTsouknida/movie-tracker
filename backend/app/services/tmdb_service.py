import httpx
from app.core.config import settings

def search_movies(query):
    return httpx.get('https://api.themoviedb.org/3/search/movie',
            params={'query': query}, headers={'Authorization': f'Bearer {settings.tmdb_read_access_token}'}).json()['results']
