import '../Movies/Movies.css';
import {filterMovies, filterShorts} from "../../utils/utils";
import {useContext, useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function SavedMovies({setMessageBox, savedMoviesList, onDeleteClick}) {
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
            setMessageBox({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
        } else {
            setNotFound(false);
            setFilteredMovies([...moviesList]);
            setShowedMovies([...moviesList]);
        }
    }

    // состояние чекбокса
    function handleShorts() {
        if (!shortsOnly) {
            setShortsOnly(true);
            localStorage.setItem(`shortSaved`, true);
            setShowedMovies(filterShorts(filteredMovies));
            filterShorts(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
        } else {
            setShortsOnly(false);
            localStorage.setItem(`shortSaved`, false);
            filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
            setShowedMovies([...filteredMovies]);
        }
    }

    // чекбокс в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem(`shortSaved`) === 'true') {
            setShortsOnly(true);
            setShowedMovies(filterShorts(savedMoviesList));
        } else {
            setShortsOnly(false);
            setShowedMovies([...savedMoviesList]);
        }
    }, [savedMoviesList, currentUser]);

    useEffect(() => {
        setFilteredMovies([...savedMoviesList]);
        savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
    }, [savedMoviesList]);

    // console.log('savedMovies rendered')
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