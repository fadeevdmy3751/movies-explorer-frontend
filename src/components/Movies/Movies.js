import './Movies.css';
import {filterShorts} from "../../utils/utils";
import {useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

// const moviesList = require('../../utils/beatfilm_mock_data')

export default function Movies() {
    const [shortsOnly, setShortsOnly] = useState(false);
    const [queriedMovies, setQueriedMovies] = useState([]); // отфильтрованные по запросу
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
    const [showLoader, setShowLoader] = useState(false)
    const [films, setFilms] = useState([]) // все фильмы
    const [query, setQuery] = useState("") // все фильмы

    function handleShortsCheck() {
        setShortsOnly(!shortsOnly);
    }

    function handleSearch(userQuery) {
        console.log({userQuery})
        setQuery(userQuery)
    }

    useEffect(() => {

    }, [query])
    //     let FilmsFromStor = JSON.parse(localStorage.getItem("films"));
    //     if (FilmsFromStor === null) {
    //         console.log('localstor empty')
    //         setShowLoader(true)
    //         getAllMovies().then(r => {
    //             const simped = r.map(simplifyMovie)
    //             setFilms(simped)
    //             console.log('simped')
    //             localStorage.setItem("films", JSON.stringify(simped))
    //             // setShowLoader(false)
    //         })
    //     } else if (!films.length) {
    //         console.log('films empty')
    //         setShowLoader(true)
    //         console.log({FilmsFromStor})    // 100
    //         setFilms([...FilmsFromStor])
    //         console.log({films})            // 0
    //         // setShowLoader(false)
    //     }
    //     // now we have films !! or not!
    //     console.log({films})                // 0
    //     setQueriedMovies(FilmsFromStor.filter(film => filterQuery(film, query)))
    //     console.log({queriedMovies})            // 0
    //     console.log({filteredMovies})            // 0
    //     setShowLoader(false)
    // }

    useEffect(() => {
        console.log('usef shorts quer')
        if (shortsOnly) {
            setFilteredMovies(filterShorts(queriedMovies));
            console.log("filterShorts(queriedMovies")
        } else {
            setFilteredMovies(...queriedMovies);
            console.log("...queriedMovies")
        }
    }, [shortsOnly, queriedMovies, filteredMovies])

    useEffect(() => {       // контрольнгый
        console.log('usef filt_mov')
        console.log({filteredMovies})
    }, [filteredMovies])

    console.log('movies (re)rendered')
    console.log({films, filteredMovies, queriedMovies})
    return (<main className="movies">
        <SearchForm shortsOnly={shortsOnly} handleShorts={handleShortsCheck} handleSearch={handleSearch}/>
        {showLoader ? <Preloader/> : <MoviesCardList moviesList={filteredMovies}/>}
    </main>);
}