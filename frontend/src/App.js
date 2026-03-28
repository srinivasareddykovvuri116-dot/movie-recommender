import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://movie-recommender-6cgf.onrender.com";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);

  // Load movies + banner
  useEffect(() => {
    axios.get(`${API}/movies`)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));

    axios.get(`${API}/banner`)
      .then(res => setBanner(res.data))
      .catch(err => console.error(err));
  }, []);

  // Search filter
  useEffect(() => {
    if (query.trim().length > 0) {
      const results = movies.filter(movie =>
        movie.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results.slice(0, 5));
    } else {
      setFiltered([]);
    }
  }, [query, movies]);

  // Recommend
  const handleRecommend = async (movieName) => {
    const selectedMovie = movieName || query;

    if (!selectedMovie || selectedMovie.trim() === "") {
      alert("Enter a movie name");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(`${API}/recommend/${selectedMovie}`);

      if (res.data.length === 0) {
        alert("No recommendations found");
      }

      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(to bottom, #000, #111)",
      color: "white",
      minHeight: "100vh"
    }}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "black"
      }}>
        <h2 style={{ color: "red" }}>NETFLIX AI</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              outline: "none"
            }}
          />

          <button
            onClick={() => handleRecommend()}
            style={{
              padding: "8px 15px",
              background: "red",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Recommend
          </button>
        </div>
      </div>

      {/* SEARCH SUGGESTIONS */}
      {filtered.length > 0 && (
        <div style={{
          position: "absolute",
          background: "white",
          color: "black",
          width: "250px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "5px",
          zIndex: 10
        }}>
          {filtered.map((movie, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd"
              }}
              onClick={() => {
                setQuery(movie);
                setFiltered([]);
                setTimeout(() => handleRecommend(movie), 100);
              }}
            >
              {movie}
            </div>
          ))}
        </div>
      )}

      {/* 🎬 NETFLIX BANNER */}
      {banner && banner.poster && (
        <div style={{
          height: "400px",
          backgroundImage: `url(${banner.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}>

          {/* Overlay */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to right, black, transparent)"
          }} />

          {/* Content */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50px",
            transform: "translateY(-50%)",
            maxWidth: "500px"
          }}>
            <h1>{banner.title}</h1>

            <p style={{ fontSize: "14px" }}>
              {banner.description?.slice(0, 150)}...
            </p>

            <button
              onClick={() => handleRecommend(banner.title)}
              style={{
                padding: "10px 20px",
                background: "red",
                border: "none",
                color: "white",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              ▶ Recommend
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <h3 style={{ textAlign: "center" }}>
          Loading...
        </h3>
      )}

      {/* RESULTS */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "20px"
      }}>
        {recommendations.map((movie, i) => (
          <div key={i} style={{
            width: "250px",
            margin: "15px",
            background: "#222",
            borderRadius: "10px",
            padding: "10px",
            transition: "transform 0.3s"
          }}>
            <img
              src={movie.poster}
              alt={movie.title}
              width="100%"
              style={{ borderRadius: "10px" }}
            />

            <h3>{movie.title}</h3>

            <p>⭐ {movie.rating} | 📅 {movie.year}</p>

            <p>🎭 {movie.genre}</p>

            <p style={{ fontSize: "14px" }}>
              {movie.description?.slice(0, 120)}...
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;