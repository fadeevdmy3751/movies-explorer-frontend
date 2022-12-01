import './Movies.css';
import {filterQuery, filterShorts} from "../../utils/utils";
import {useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import getAllMovies from "../../utils/MoviesApi";

// const moviesList = require('../../utils/beatfilm_mock_data')

export default function Movies() {
  const [shortsOnly, setShortsOnly] = useState(false);
  const [queriedMovies,setQueriedMovies] = useState(undefined); // отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState(undefined); // отфильтрованные по чекбоксу и запросу фильмы
  const [showLoader, setShowLoader] = useState(false)
  const [films,setFilms]=useState(undefined)
  
  function handleShortsCheck() {
    setShortsOnly(!shortsOnly);
    shortsOrNot()
  }
  
  function shortsOrNot() {
    if (!shortsOnly) {
      setFilteredMovies(filterShorts(queriedMovies));
    } else {
      setFilteredMovies(queriedMovies);
    }
  }
  
  function handleSearch(query){
    if (localStorage.getItem("films") === null){
      setShowLoader(true)
      getAllMovies().then(r => {
        setFilms(r)
        localStorage.setItem("films", JSON.stringify(r))
        setShowLoader(false)
      })
    } else if (films === undefined) {
      setShowLoader(true)
      setFilms(JSON.parse(localStorage.getItem("films")))
      setShowLoader(false)
    }
    // now we have films
    setFilteredMovies(films.filter(film=>filterQuery(film, query)))
    shortsOrNot()
  }
  
  
  return (<main className="movies">
      <SearchForm shortsOnly={shortsOnly} handleShorts={handleShortsCheck} handleSearch={handleSearch}/>
      {showLoader ? <Preloader/> : <MoviesCardList moviesList={filteredMovies}/>}
    </main>);
}