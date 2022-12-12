// node --experimental-fetch

//
// const fs = require('fs')
// let films = await fetch('https://api.nomoreparties.co/beatfilm-movies')
// let fj = await films.json()

import {SHORTS_DUR} from "./constants";

function simplifyMovie(movie) {
    const baseurl = 'https://api.nomoreparties.co'
    let simped = {}
    try {
        simped.country = movie.country
        simped.director = movie.director
        simped.duration = movie.duration
        simped.year = movie.year
        simped.description = movie.description
        simped.image = baseurl + movie.image.url
        simped.trailerLink = movie.trailerLink
        simped.thumbnail = baseurl + movie.image.formats.thumbnail.url
        simped.movieId = movie.id
        simped.nameRU = movie.nameRU
        simped.nameEN = movie.nameEN
        simped._id = movie._id
    } catch (e) {
        console.log(e)
    }
    return simped
}

// simped = fj.map(simplifyMovie)
// fs.writeFileSync('.\\beatfilm_mock_data.js', 'export default ' + JSON.stringify(simped, null, 2), 'utf-8');

function filterShorts(movies) {
    return movies.filter(movie => movie.duration < SHORTS_DUR);
}

function filterMovies(movies, userQuery, shortMoviesCheckbox) {
    const filteredMovies = movies.filter((movie) => {
        const movieRu = movie.nameRU.toLowerCase().trim();
        const movieEn = movie.nameEN.toLowerCase().trim();
        const description = movie.description.toLowerCase().trim();
        const query = userQuery.toLowerCase().trim();
        return movieRu.includes(query) || movieEn.includes(query) || description.includes(query);
    });
    if (shortMoviesCheckbox) {
        return filterShorts(filteredMovies);
    } else {
        return filteredMovies;
    }
}

// преобразование длительности
function niceDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (!hours) {
        return `${minutes}м`;
    } else {
        return `${hours}ч${minutes}м`;
    }
}

// проверка ответа от апи
function checkResponse(res, errorMes) {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`${errorMes + res.status}`);
}

// function getColumnsCount(selector) {
//     //'.movies-card-list__list'
//     const element = document.querySelector(selector)
//     return getComputedStyle(element).gridTemplateColumns.split(' ').length
// }

// cравнение сохраненных фильмов
function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
        return item.movieId === (movie.movieId);
    });
}

export {
    simplifyMovie,
    filterShorts,
    niceDuration,
    checkResponse,
    filterMovies,
    // getColumnsCount,
    getSavedMovieCard,
}