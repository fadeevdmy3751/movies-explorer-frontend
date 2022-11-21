import './Movies.css';
import {filterShorts} from "../../utils/utils";
import {useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const moviesList = require('../../utils/beatfilm_mock_data')


export default function Movies() {
  const [shortsOnly, setShortsOnly] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(moviesList); // отфильтрованные по чекбоксу и запросу фильмы
  
  
  
  function handleShorts() {
    setShortsOnly(!shortsOnly);
    if (!shortsOnly) {
      setFilteredMovies(filterShorts(moviesList));
    } else {
      setFilteredMovies(moviesList);
    }
  }
  
  return (
    <main className="movies">
      <SearchForm shortsOnly={shortsOnly} handleShorts={handleShorts}/>
      <MoviesCardList
        moviesList={filteredMovies}
      />
    </main>
  );
}