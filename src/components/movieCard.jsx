const MovieCard = ({ movie: { title, id, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className="movie-card" key={id}> {/* 👈 envuelve todo */}
      <img
        src={poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}` // 👈 quita el / antes de poster_path
          : "./no-movie.png"
        }
        alt={title}  // 👈 agrega alt para accesibilidad
      />
      <div className="mt-4">
        <h3>{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star icon" />
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date?.split("-")[0]}</p> {/* 👈 solo el año */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard
