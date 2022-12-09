import '../Movies/Movies.css';
import {filterMovies, filterShorts } from "../../utils/utils";
import {useContext, useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function SavedMovies({
                                   setInfoTooltip,
                                   savedMoviesList,
                                   onDeleteClick
                               }) {
    const currentUser = useContext(CurrentUserContext);

    const [shortsOnly, setShortsOnly] = useState(false); // состояние чекбокса
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    const [showedMovies, setShowedMovies] = useState(savedMoviesList); // показываемывые фильмы
    
    // поиск по запросу
    function handleSearchSubmit(inputValue) {
        const moviesList = filterMovies(savedMoviesList, inputValue, shortsOnly);
        if (moviesList.length === 0) {
            setNotFound(true);
            setInfoTooltip({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
        } else {
            setNotFound(false);
            setFilteredMovies(moviesList);
            setShowedMovies(moviesList);
        }
    }
    
    // состояние чекбокса
    function handleShorts() {
        if (!shortsOnly) {
            setShortsOnly(true);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
            setShowedMovies(filterShorts(filteredMovies));
            filterShorts(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
        } else {
            setShortsOnly(false);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
            filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
            setShowedMovies(filteredMovies);
        }
    }

    // проверка чекбокса в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
            setShortsOnly(true);
            setShowedMovies(filterShorts(savedMoviesList));
        } else {
            setShortsOnly(false);
            setShowedMovies(savedMoviesList);
        }
    }, [savedMoviesList, currentUser]);
    
    useEffect(() => {
        setFilteredMovies(savedMoviesList);
        savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
    }, [savedMoviesList]);

    return (
        <main className="movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShorts={handleShorts}
                shortsOnly={shortsOnly}
            />
            {!NotFound && (
                <MoviesCardList
                    moviesList={showedMovies}
                    savedMoviesList={savedMoviesList}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </main>
    );
}