import { useState } from 'react';
import { API } from '../api';

export default function MovieForm({ fetchMovies }) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    status: 'wishlist',
    episodes_watched: 0,
    total_episodes: 0,
    rating: 0,
    review: '',
  });

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/', movie);
    setMovie({
      title: '',
      director: '',
      genre: '',
      platform: '',
      status: 'wishlist',
      episodes_watched: 0,
      total_episodes: 0,
      rating: 0,
      review: '',
    });
    fetchMovies();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
        required
      />
      <input
        name="director"
        placeholder="Director"
        value={movie.director}
        onChange={handleChange}
      />
      <input
        name="genre"
        placeholder="Genre"
        value={movie.genre}
        onChange={handleChange}
        required
      />
      <input
        name="platform"
        placeholder="Platform"
        value={movie.platform}
        onChange={handleChange}
      />
      <select name="status" value={movie.status} onChange={handleChange}>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
        <option value="wishlist">Wishlist</option>
      </select>
      <input
        type="number"
        name="episodes_watched"
        placeholder="Episodes Watched"
        value={movie.episodes_watched}
        onChange={handleChange}
      />
      <input
        type="number"
        name="total_episodes"
        placeholder="Total Episodes"
        value={movie.total_episodes}
        onChange={handleChange}
      />
      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating"
        value={movie.rating}
        onChange={handleChange}
      />
      <textarea
        name="review"
        placeholder="Review"
        value={movie.review}
        onChange={handleChange}
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}
