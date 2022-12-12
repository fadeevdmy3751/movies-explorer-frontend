import './Movies.css';
import {filterMovies, filterShorts, simplifyMovie} from "../../utils/utils";
import {useContext, useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import getAllMovies from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

export default function Movies({
                                   setMessageBox,
                                   savedMoviesList,
                                   onLikeClick,
                                   onDeleteClick
                               }) {
    const currentUser = useContext(CurrentUserContext);

    const [shortsOnly, setShortsOnly] = useState(false); // состояние чекбокса
    const [queriedMovies, setQueriedMovies] = useState([]); // фильмы по запросу
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    const [showLoader, setShowLoader] = useState(false)

    // поиск по массиву и установка состояния
    function handleSetFilteredMovies(movies, userQuery, shortsOnlyCheckbox) {
        const moviesList = filterMovies(movies, userQuery, false);
        if (moviesList.length === 0) {
            setMessageBox({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setQueriedMovies([...moviesList]);
        setFilteredMovies(
            shortsOnlyCheckbox ? filterShorts(moviesList) : [...moviesList]
        );
        localStorage.setItem(
            `movies`,
            JSON.stringify(moviesList)
        );
    }

    // поиск по запросу
    function handleSearchSubmit(inputValue) {
        localStorage.setItem(`movieSearch`, inputValue);
        localStorage.setItem(`shortsOnly`, shortsOnly);
        if (!localStorage.getItem('AllMovies')) {   // correct
            setShowLoader(true);
            getAllMovies()
                .then(movies => {
                    const simpedMovies = movies.map(simplifyMovie)
                    localStorage.setItem('AllMovies', JSON.stringify(simpedMovies))
                    handleSetFilteredMovies(
                        simpedMovies,
                        inputValue,
                        shortsOnly
                    );
                })
                .catch((error) =>
                    setMessageBox({
                        isOpen: true,
                        successful: false,
                        text: error + 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
                    })
                )
                .finally(() => setShowLoader(false));
        } else {
            const AllMovies = JSON.parse(localStorage.getItem('AllMovies'))
            handleSetFilteredMovies(AllMovies, inputValue, shortsOnly);
        }
    }

    // состояние чекбокса //вроде ок
    function handleShorts() {
        setShortsOnly(!shortsOnly);
        if (!shortsOnly) {
            setFilteredMovies(filterShorts(queriedMovies));
        } else {
            setFilteredMovies([...queriedMovies]);
        }
        localStorage.setItem(`shortsOnly`, !shortsOnly);
    }

    // чекбокс в локальном хранилище //ок
    useEffect(() => {
        if (localStorage.getItem(`shortsOnly`) === 'true') {
            setShortsOnly(true);
        } else {
            setShortsOnly(false);
        }
    }, [currentUser]);

    // рендер фильмов из локального хранилища для первого раза //ок
    useEffect(() => {
        if (localStorage.getItem(`movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`movies`)
            );
            setQueriedMovies(movies);
            if (
                localStorage.getItem(`shortsOnly`) === 'true'
            ) {
                setFilteredMovies(filterShorts(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [currentUser]);
    // console.log('movies rendered')
    return (
        <main className="movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShorts={handleShorts}
                shortsOnly={shortsOnly}
            />
            {showLoader ? <Preloader/> : null}
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