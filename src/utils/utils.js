// node --experimental-fetch

//
// const fs = require('fs')
// let films = await fetch('https://api.nomoreparties.co/beatfilm-movies')
// let fj = await films.json()

import {SHORTS_DUR} from "./constants";

function simplifyMovie(movie) {
    const baseurl = 'https://api.nomoreparties.co/'
    let simped = {}
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
    return simped
}

// simped = fj.map(simplifyMovie)
// fs.writeFileSync('.\\beatfilm_mock_data.js', 'export default ' + JSON.stringify(simped, null, 2), 'utf-8');

function filterShorts(movies) {
    return movies.filter(movie => movie.duration < SHORTS_DUR);
}

// преобразование длительности
function niceDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if(hours === 0) {
        return `${minutes}м`;
    } else {
        return `${hours}ч ${minutes}м`;
    }
}

export {filterShorts, niceDuration}