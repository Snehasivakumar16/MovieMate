export default function MovieList({ movies }) {
  if (!movies.length) return <p>No movies yet.</p>;

  return (
    <div>
      {movies.map(m => (
        <div
          key={m.id}
          style={{ border: '1px solid black', margin: '5px', padding: '5px' }}
        >
          <h3>
            {m.title} ({m.status})
          </h3>
          <p>Director: {m.director}</p>
          <p>Genre: {m.genre}</p>
          <p>Platform: {m.platform}</p>
          <p>
            Episodes: {m.episodes_watched}/{m.total_episodes}
          </p>
          <p>Rating: {m.rating}</p>
          <p>Review: {m.review}</p>
        </div>
      ))}
    </div>
  );
}
