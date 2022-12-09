const MainApiUrl = "https://api.fadeeploma.nomoredomains.club/api"

// класс для взаимодействия с сервером
class Api {
    apiConfig = {
        // baseUrl: MainApiUrl,
        headers: {
            credentials: 'include',
            'Content-Type': 'application/json'
        }
    }

    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._headers = this.apiConfig.headers
    }

    _checkResponse(res, errorMes) {
        // console.log(res, errorMes)
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`${errorMes + res.status}`);
    }

    _makeFetch(fetchResource, requestMethod, errorMes, requestBody = undefined) {
        const fetchOptions = {
            method: requestMethod,
            headers: this._headers,
            credentials: 'include'
        };

        // проверка на наличие body и включение в тело запроса
        if (requestBody !== undefined) {
            fetchOptions.body = JSON.stringify(requestBody);
        }

        return fetch(fetchResource, fetchOptions)
            .then(res => this._checkResponse(res, errorMes))
    }

    // todo rewrite all as in Mesto

    // проверка статуса запроса
    // async _requestResult(res) {
    //     const result = await res.json();
    //     return res.ok ? result : Promise.reject(result.message);
    // }

    // регистрация
    createUser(name, email, password) {
        return this._makeFetch(`${this._baseUrl}/signup`,
            'POST',
            'ошибка создания пользователя',
            {
                name,
                email,
                password,
            })
        //.then(res => this._requestResult(res));
    }

    // вход
    login(email, password) {
        return this._makeFetch(`${this._baseUrl}/signin`,
            'POST',
            'ошибка входа',
            {email, password}
        )
        //.then(res => this._requestResult(res));
    }

    logout() {
        return this._makeFetch(`${this._baseUrl}/logout`,
            'POST',
            'ошибка выхода'
        )
        // .then(res => res.json())
    }

// todo везде авторизацию на переделать
    // запрос данных пользователя
    getUserInfo() {
        return this._makeFetch(`${this._baseUrl}/users/me`,
            'GET',
            'Ошибка getUserInfo'
        )
        //  .then(res => this._requestResult(res));
    }

    // запрос на редактирование данных пользователя
    updateUser(name, email) {
        return this._makeFetch(`${this._baseUrl}/users/me`,
            'PATCH',
            'ошибка обновления пользователя',
            {name, email}
        )
        // .then(res => this._requestResult(res));
    }

    // запрос фильмов
    getSavedMovies() {
        return this._makeFetch(`${this._baseUrl}/movies`,
            'GET',
            'ошибка getSavedMovies'
        )
        // .then(res => this._requestResult(res));
    }

    // сохранение фильма
    addNewMovie(data) {
        console.log(data)
        return this._makeFetch(`${this._baseUrl}/movies`,
            'POST',
            'ошибка сохранения фильма',
            data
        )
        // .then(res => this._requestResult(res));
    }

    // удаление фильма из сохранённых
    deleteMovie(data) {
        return this._makeFetch(`${this._baseUrl}/movies/${data}`,
            'DELETE',
            'ошибка удаление фильма из сохранённых'
        )
        // .then(res => this._requestResult(res));
    }
}

// создаём экземляр класса работающего с API сервера
const mainApi = new Api(MainApiUrl);

export default mainApi;
