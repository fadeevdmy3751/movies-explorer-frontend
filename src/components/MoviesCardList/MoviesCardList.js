import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";
import {
  // getColumnsCount,
  getSavedMovieCard} from "../../utils/utils";
import useScreenWidth from "../../hooks/useScreenWidth";
import {useEffect, useState} from "react";
import {WIDTH_PARAMS} from '../../utils/constants'
export default function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {
  const screenWidth = useScreenWidth();
  const location = useLocation();
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 4 })
  
  function getCardListParams(width){
      for (let params in WIDTH_PARAMS){
        if (width >= params.width)
          return params
      }
  }
  
  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (location.pathname === '/movies') {
      let params = getCardListParams(screenWidth)
      setCardsShowDetails(params);
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, location.pathname]);
  
  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);
  
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
            key={movie.id || movie._id}
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