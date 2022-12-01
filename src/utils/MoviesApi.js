import {checkResponse} from "./utils";


const MovieApiUrl = "https://api.nomoreparties.co/beatfilm-movies"
const MovieApiError = "Ошибка внешнего АПИ, невозвожно получить список фильмов "

function getAllMovies(){
  return fetch(MovieApiUrl)
  .then(res => checkResponse(res, MovieApiError))
}

export default getAllMovies
