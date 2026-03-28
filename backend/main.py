import os
import pickle
import re
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn


load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DEFINE PATH FIRST
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, '..', 'model')

# ✅ THEN LOAD MODELS
movies = pickle.load(open(os.path.join(model_path, 'movies.pkl'), 'rb'))
similarity = pickle.load(open(os.path.join(model_path, 'similarity.pkl'), 'rb'))

# 🔥 NEW MODELS (AFTER PATH)
user_movie = pickle.load(open(os.path.join(model_path, 'user_movie.pkl'), 'rb'))
user_similarity = pickle.load(open(os.path.join(model_path, 'user_similarity.pkl'), 'rb'))

@app.get("/")
def home():
    return {"message": "API running"}

@app.get("/movies")
def get_movies():
    return movies['title'].tolist()

@app.get("/recommend/{movie_name}")
def recommend(movie_name: str):

    if movie_name not in movies['title'].values:
        return []

    # 🎯 CONTENT-BASED PART
    movie_index = movies[movies['title'] == movie_name].index[0]
    distances = similarity[movie_index]

    content_recs = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:10]

    # 🎯 COLLABORATIVE PART (simple fallback)
    collab_movies = movies.sample(5).index.tolist()

    # 🔥 COMBINE BOTH
    final_indices = list(set([i[0] for i in content_recs] + collab_movies))[:6]

    result = []

    for idx in final_indices:
        title = movies.iloc[idx].title
        clean_title = re.sub(r"\(\d{4}\)", "", title).strip()

        poster = "https://via.placeholder.com/150"
        rating = "N/A"
        year = "N/A"
        description = "No description available"
        genre = "N/A"

        try:
            url = f"http://www.omdbapi.com/?t={clean_title}&apikey={API_KEY}"
            data = requests.get(url).json()

            if data.get("Response") == "True":
                poster = data.get("Poster", poster)
                rating = data.get("imdbRating", "N/A")
                year = data.get("Year", "N/A")
                description = data.get("Plot", description)
                genre = data.get("Genre", "N/A")

        except:
            pass

        result.append({
            "title": title,
            "poster": poster,
            "rating": rating,
            "year": year,
            "description": description,
            "genre": genre
        })

    return result

@app.get("/banner")
def get_banner():
    import random

    movie = movies.sample(1).iloc[0]
    title = movie.title

    clean_title = re.sub(r"\(\d{4}\)", "", title).strip()

    poster = ""
    description = ""

    try:
        url = f"http://www.omdbapi.com/?t={clean_title}&apikey={API_KEY}"
        data = requests.get(url).json()

        if data.get("Response") == "True":
            poster = data.get("Poster", "")
            description = data.get("Plot", "")
    except:
        pass

    return {
        "title": title,
        "poster": poster,
        "description": description
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)