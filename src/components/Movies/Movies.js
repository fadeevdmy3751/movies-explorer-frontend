import './Movies.css';
import {filterShorts} from "../../utils/utils";
import {useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useLocation} from "react-router-dom";

const moviesList = require('../../utils/beatfilm_mock_data')

export default function Movies() {
  const [shortsOnly, setShortsOnly] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(moviesList); // отфильтрованные по чекбоксу и запросу фильмы
  
  const location = useLocation();
  
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
      { (location.pathname === '/saved-movies' && shortsOnly)?
        <MoviesCardList
          moviesList={[]}  // для отладки отображения пустого набора
        />
      :
        <MoviesCardList
          moviesList={filteredMovies}
        />
      }
    </main>
  );
}