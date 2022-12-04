import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";

export default function MoviesCardList({moviesList}) {
    const location = useLocation();
    console.log({moviesList})

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
            {location.pathname === '/movies' && moviesList.length > 0 &&
                <button className="movies-card-list__show-more">
                    Ещё
                </button>
            }
        </section>
    );
}