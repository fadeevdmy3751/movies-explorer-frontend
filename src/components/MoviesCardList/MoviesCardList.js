import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";
import {getSavedMovieCard} from "../../utils/utils";
import useScreenWidth from "../../hooks/useScreenWidth";
import {useEffect, useState} from "react";
import {WIDTH_PARAMS} from '../../utils/constants'

export default function MoviesCardList({moviesList, savedMoviesList, onLikeClick, onDeleteClick}) {
    const screenWidth = useScreenWidth();
    const location = useLocation();
    const [isMount, setIsMount] = useState(true);
    const [showMovieList, setShowMovieList] = useState([]);
    const [cardsShowDetails, setCardsShowDetails] = useState({total: 12, more: 4})

    function getCardListParams(width) {
        for (let params of WIDTH_PARAMS) {
            if (width >= params.width)
                return params
        }
    }

    // количество отображаемых карточек при разной ширине экрана
    useEffect(() => {
        if (location.pathname === '/movies') {
            let params = getCardListParams(screenWidth)
            console.log({params, screenWidth})
            setCardsShowDetails(params);
            return () => setIsMount(false);
        }
    }, [screenWidth, isMount, location.pathname, cardsShowDetails]);

    // изменяем отображаемый массив фильмов в зависимости от ширины экрана
    useEffect(() => {
        if (moviesList.length) {
            // const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
            const res = moviesList.slice(0, cardsShowDetails.total)
            setShowMovieList(res);
        }
    }, [moviesList, cardsShowDetails]);

    // добавление карточек при клике по кнопке "Еще"
    function handleClickMoreMovies() {
        const start = showMovieList.length;
        // const end = start + cardsShowDetails.more;
        const end = start + cardsShowDetails.more
        const additional = moviesList.length - start;

        if (additional > 0) {
            const newCards = moviesList.slice(start, end);
            setShowMovieList([...showMovieList, ...newCards]);
        }
    }

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__list">
                {showMovieList.map(movie => (
                    <MoviesCard
                        // key={movie.id || movie._id}
                        key={movie.movieId}
                        saved={getSavedMovieCard(savedMoviesList, movie)}
                        onLikeClick={onLikeClick}
                        onDeleteClick={onDeleteClick}
                        movie={movie}
                    />
                ))}
            </ul>
            {location.pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
                <button
                    className="movies-card-list__show-more"
                    onClick={handleClickMoreMovies}
                >
                    Ещё
                </button>
            )}
        </section>
    );
}