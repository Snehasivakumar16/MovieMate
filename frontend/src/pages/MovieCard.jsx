import React from 'react';
import './MovieCard.css';
import axios from 'axios';

const MovieCard = ({ movie, onDelete, onEdit }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Platform:</strong> {movie.platform}
      </p>
      <p>
        <strong>Status:</strong> {movie.status}
      </p>
      <p>
        <strong>Episodes:</strong> {movie.episodes_watched}/
        {movie.total_episodes}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Review:</strong> {movie.review || 'nil'}
      </p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(movie.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
