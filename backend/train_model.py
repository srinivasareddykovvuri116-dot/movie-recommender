import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Create model folder automatically
os.makedirs('../model', exist_ok=True)

movies = pd.read_csv('../data/movies.csv')
movies = movies.head(5000)
# Clean column names
movies.columns = movies.columns.str.strip().str.lower()

print("Columns: - train_model.py:15", movies.columns)

# Fill missing
movies['genres'] = movies['genres'].fillna('')

# Use only genres as tags (LIMITED BUT WORKS)
movies['tags'] = movies['genres']

# Vectorization
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(movies['tags']).toarray()

# Similarity
similarity = cosine_similarity(vectors)

# Save
pickle.dump(movies, open('../model/movies.pkl', 'wb'))
pickle.dump(similarity, open('../model/similarity.pkl', 'wb'))

print("✅ Model trained (GENREBASED ONLY) - train_model.py:34")