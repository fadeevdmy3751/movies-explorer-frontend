import './Movies.css';
import {filterMovies, filterShorts, simplifyMovie} from "../../utils/utils";
import {useContext, useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import getAllMovies from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Movies({
                                   setShowLoader,
                                   setInfoTooltip,
                                   savedMoviesList,
                                   onLikeClick,
                                   onDeleteClick
                               }) {
    const currentUser = useContext(CurrentUserContext);

    const [shortsOnly, setShortsOnly] = useState(false); // состояние чекбокса
    const [queriedMovies, setQueriedMovies] = useState([]); // фильмы по запросу
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    // const [AllMovies, setAllMovies] = useState([]); // все фильмы от сервера, для единоразового обращения к нему

    // поиск по массиву и установка состояния
    function handleSetFilteredMovies(movies, userQuery, shortsOnlyCheckbox) {
        const moviesList = filterMovies(movies, userQuery, false);
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
        setQueriedMovies([...moviesList]);
        setFilteredMovies(
            shortsOnlyCheckbox ? filterShorts(moviesList) : [...moviesList]
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
        console.log(localStorage.getItem('AllMovies'))
        // if (AllMovies.length === 0) {
        if (!localStorage.getItem('AllMovies')) {   // correct
            setShowLoader(true);
            getAllMovies()
                .then(movies => {
                    console.log({movies}, 'in the THEN')
                    const simpedMovies = movies.map(simplifyMovie)
                    console.log({simpedMovies}, 'in the THEN: will set AllMovies')
                    // setAllMovies([...simpedMovies]);
                    localStorage.setItem('AllMovies', JSON.stringify(simpedMovies))
                    handleSetFilteredMovies(
                        simpedMovies,
                        inputValue,
                        shortsOnly
                    );
                })
                .catch((error) =>
                    setInfoTooltip({
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
        console.log({queriedMovies})
        console.log({filteredMovies})
        setShortsOnly(!shortsOnly);
        if (!shortsOnly) {
            setFilteredMovies(filterShorts(queriedMovies));
        } else {
            setFilteredMovies([...queriedMovies]);
        }
        localStorage.setItem(`${currentUser.email} - shortsOnly`, !shortsOnly);
    }

    // чекбокс в локальном хранилище //ок
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortsOnly`) === 'true') {
            setShortsOnly(true);
        } else {
            setShortsOnly(false);
        }
    }, [currentUser]);

    // рендер фильмов из локального хранилища для первого раза //ок
    useEffect(() => {
        console.log('рендер фильмов из локального хранилища')
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - movies`)
            );
            setQueriedMovies(movies);
            if (
                localStorage.getItem(`${currentUser.email} - shortsOnly`) === 'true'
            ) {
                setFilteredMovies(filterShorts(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [currentUser]);
    console.log('movies rendered')
    return (
        <main className="movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShorts={handleShorts}
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