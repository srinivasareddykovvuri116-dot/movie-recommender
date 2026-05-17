# Movie Recommender System

A full-stack AI-powered Movie Recommendation Web Application built using React, FastAPI, and Machine Learning. The system recommends similar movies based on user ratings using the Cosine Similarity algorithm and displays movie posters, IMDb ratings, genres, release years, and movie descriptions using the OMDb API.

---

## Features

* Search movies instantly
* Get personalized movie recommendations
* Display movie posters
* Show IMDb ratings
* Display release year
* Show movie genres
* Display movie descriptions
* FastAPI backend for high performance
* Fully deployed frontend and backend

---

## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* FastAPI
* Pandas
* Scikit-learn
* Cosine Similarity

### APIs

* OMDb API

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Machine Learning Concept

This project uses Collaborative Filtering with Cosine Similarity to recommend movies. A movie-user matrix is created from user ratings, and similarity scores are calculated between movies to recommend similar content.

---

## Project Structure

movie-recommender-fullstack/

├── backend/
│   ├── main.py
│   ├── model.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── data/
│   ├── movies.csv
│   ├── ratings.csv

---

## Installation

### Clone Repository

```bash
git clone https://github.com/srinivasareddykovvuri116-dot/movie-recommender-fullstack.git
cd movie-recommender-fullstack
```

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Live Demo

### Frontend

https://movie-recommender-nu-black.vercel.app/

---

## Future Improvements

* AI-based hybrid recommendation system
* User authentication
* Watchlist feature
* Trending movies section
* Recommendation analytics dashboard
* Dark mode UI

---

##Author

K R S Srinivasa Reddy

B.Tech Student | Python Developer | AI & Full-Stack Enthusiast

---

## Support

If you like this project, give it a star on GitHub 
