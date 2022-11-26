import './MoviesCard.css';
import {niceDuration} from "../../utils/utils";
import {useLocation} from "react-router-dom";

export default function MoviesCard({movie}) {
  const location = useLocation();
  // заглушка
  function handleLikeClick() {
  }
  
  // заглушка
  function handleDeleteClick() {
  }
  
  // заглушка
  let saved = movie.nameRU.length % 2
  
  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a target="_blank" rel="noreferrer" className="movies-card__link" href={movie.trailerLink}>
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
            className="movies-card__poster"
          />
        </a>
        <div className="movies-card__description">
          <p className="movies-card__title">{movie.nameRU}</p>
          {location.pathname === '/movies' && (
            <button
              type="button"
              className={`movies-card__button movies-card__button_type_${
                saved ? 'saved' : 'save'
              }`}
              onClick={saved ? handleDeleteClick : handleLikeClick}
              aria-label={`${
                saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
              }`}
              title={`${
                saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
              }`}
            />
          )}
          {location.pathname === '/saved-movies' && (
            <button
              type="button"
              className="movies-card__button movies-card__button_type_forget"
              onClick={handleDeleteClick}
              aria-label="Удалить фильм из сохранённых"
              title="Удалить фильм из сохранённых"
            />
          )}
        </div>
        <span className="movies-card__duration">
          {niceDuration(movie.duration)}
        </span>
      </article>
    </li>
  );
}