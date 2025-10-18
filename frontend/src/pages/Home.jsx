import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null); // store movie being edited
  const [form, setForm] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    status: '',
    episodes_watched: '',
    total_episodes: '',
    rating: '',
    review: '',
  });
  const [filters, setFilters] = useState({
    genre: '',
    platform: '',
    status: '',
  });

  const platforms = ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Other'];
  const statuses = ['wishlist', 'watching', 'completed'];
  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);
  const genres = [
    'Action','Comedy','Drama','Romance','Thriller','Horror','Sci-Fi','Fantasy','Documentary','Other'
  ];

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/movies/');
      setMovies(res.data);
      setDisplayedMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilter = () => {
    let filtered = movies;
    if (filters.genre) filtered = filtered.filter(m => m.genre === filters.genre);
    if (filters.platform) filtered = filtered.filter(m => m.platform === filters.platform);
    if (filters.status) filtered = filtered.filter(m => m.status === filters.status);
    setDisplayedMovies(filtered);
  };

  const resetFilter = () => {
    setFilters({ genre: '', platform: '', status: '' });
    setDisplayedMovies(movies);
  };

  // Add or Update Movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      episodes_watched: form.episodes_watched || 0,
      total_episodes: form.total_episodes || 0,
      rating: form.rating || 0,
    };

    try {
      if (editingMovie) {
        // Update existing movie
        await axios.put(`http://127.0.0.1:8000/api/movies/${editingMovie.id}/`, payload);
        setEditingMovie(null);
      } else {
        // Add new movie
        await axios.post('http://127.0.0.1:8000/api/movies/', payload);
      }
      setForm({
        title: '',
        director: '',
        genre: '',
        platform: '',
        status: '',
        episodes_watched: '',
        total_episodes: '',
        rating: '',
        review: '',
      });
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/movies/${id}/`);
      setMovies(movies.filter(m => m.id !== id));
      setDisplayedMovies(displayedMovies.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setForm({
      title: movie.title,
      director: movie.director,
      genre: movie.genre,
      platform: movie.platform,
      status: movie.status,
      episodes_watched: movie.episodes_watched,
      total_episodes: movie.total_episodes,
      rating: movie.rating,
      review: movie.review,
    });
  };

  return (
    <div className="container">
      <h1>MovieMate</h1>

      <div className="content-wrapper">
        {/* Add/Edit Movie Form */}
        <form onSubmit={handleSubmit} className="movie-form">
          <h3>{editingMovie ? 'Edit Movie' : 'Add Movie'}</h3>
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input type="text" name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
          <select name="genre" value={form.genre} onChange={handleChange} required>
            <option value="" disabled>Genre</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select name="platform" value={form.platform} onChange={handleChange} required>
            <option value="" disabled>Platform</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="" disabled>Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="group">
            <input type="number" name="episodes_watched" placeholder="Episodes watched" value={form.episodes_watched} onChange={handleChange} min="0" />
            <input type="number" name="total_episodes" placeholder="Total episodes" value={form.total_episodes} onChange={handleChange} min="0" />
          </div>

          <div className="group">
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value="" disabled>Rating</option>
              {ratings.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <input type="text" name="review" placeholder="Review" value={form.review} onChange={handleChange} />
          </div>

          <button type="submit">{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
        </form>

        {/* Filter Section */}
        <div className="filter-container">
          <h3>Filter Movies</h3>
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">All Genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select name="platform" value={filters.platform} onChange={handleFilterChange}>
            <option value="">All Platforms</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="filter-buttons" style={{ marginTop: '10px' }}>
            <button type="button" onClick={applyFilter}>Apply Filter</button>
            <button type="button" onClick={resetFilter} style={{ marginLeft: '10px' }}>Reset</button>
          </div>
        </div>
      </div>

      {/* Movies List */}
      <div className="movies-list">
        {displayedMovies.length === 0 ? (
          <p>No movies yet.</p>
        ) : (
          displayedMovies.map(m => <MovieCard key={m.id} movie={m} onDelete={handleDeleteMovie} onEdit={handleEditMovie} />)
        )}
      </div>
    </div>
  );
};

export default Home;
