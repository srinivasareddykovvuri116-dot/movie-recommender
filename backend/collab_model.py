import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# Load ratings dataset
ratings = pd.read_csv('../data/ratings.csv')

# Create user-item matrix
user_movie = ratings.pivot_table(index='userId', columns='movieId', values='rating').fillna(0)

# Similarity between users
user_similarity = cosine_similarity(user_movie)

# Save
pickle.dump(user_movie, open('../model/user_movie.pkl', 'wb'))
pickle.dump(user_similarity, open('../model/user_similarity.pkl', 'wb'))

print("✅ Collaborative model created - collab_model.py:18")