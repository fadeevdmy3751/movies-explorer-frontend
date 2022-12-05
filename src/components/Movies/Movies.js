import './Movies.css';
import {filterMovies, filterShorts, simplifyMovie} from "../../utils/utils";
import {useContext, useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import getAllMovies from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// const moviesList = require('../../utils/beatfilm_mock_data')

export default function Movies({
                                 setShowLoader,
                                 setInfoTooltip,
                                 savedMoviesList,
                                 onLikeClick,
                                 onDeleteClick
                               }) {
  const currentUser = useContext(CurrentUserContext);
  
  const [shortsOnly, setShortsOnly] = useState(false); // состояние чекбокса
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
  const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
  const [AllMovies, setAllMovies] = useState([]); // все фильмы от сервера, для единоразового обращения к нему
  // поиск по массиву и установка состояния
  function handleSetFilteredMovies(movies, userQuery, shortsOnlyCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortsOnlyCheckbox);
    if (moviesList.length === 0) {
      setInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ничего не найдено.',
      });
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortsOnlyCheckbox ? filterShorts(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }
  
  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortsOnly`, shortsOnly);
    
    if (AllMovies.length === 0) {
      setShowLoader(true);
      getAllMovies()
      .then(movies => {
        setAllMovies(movies);
        handleSetFilteredMovies(
          simplifyMovie(movies),
          inputValue,
          shortsOnly
        );
      })
      .catch(() =>
        setInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        })
      )
      .finally(() => setShowLoader(false));
    } else {
      handleSetFilteredMovies(AllMovies, inputValue, shortsOnly);
    }
  }
  
  // состояние чекбокса
  function handleShortFilms() {
    setShortsOnly(!shortsOnly);
    if (!shortsOnly) {
      setFilteredMovies(filterShorts(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortsOnly`, !shortsOnly);
  }
  
  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortsOnly`) === 'true') {
      setShortsOnly(true);
    } else {
      setShortsOnly(false);
    }
  }, [currentUser]);
  
  // рендер фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortsOnly`) === 'true'
      ) {
        setFilteredMovies(filterShorts(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);
  
  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortsOnly={shortsOnly}
      />
      {!NotFound && (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}