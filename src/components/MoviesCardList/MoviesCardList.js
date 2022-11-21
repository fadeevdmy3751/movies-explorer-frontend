import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({moviesList}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesList.slice(0, 10).map(movie => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
          />
        ))}
      </ul>
      <button className="movies-card-list__show-more">
        Ещё
      </button>
    </section>
  );
}