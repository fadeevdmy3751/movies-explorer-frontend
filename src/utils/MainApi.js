const MainApiUrl = "https://api.fadeeploma.nomoredomains.club/api"

// класс для взаимодействия с сервером
class Api {
    apiConfig = {
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
        if (res.ok) {
            return res.json();
        }
        // если ошибка 401, устанавливаем специальное сообщение, будем разлогинивать
        if (res.status === 401){
            return Promise.reject('tokenError');
        }

        return Promise.reject(errorMes);
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
    }

    // вход
    login(email, password) {
        return this._makeFetch(`${this._baseUrl}/signin`,
            'POST',
            'Неверное имя пользователя или пароль',
            {email, password}
        )
    }

    //выход
    logout() {
        return this._makeFetch(`${this._baseUrl}/logout`,
            'POST',
            'ошибка выхода'
        )
    }

    // запрос данных пользователя
    getUserInfo() {
        return this._makeFetch(`${this._baseUrl}/users/me`,
            'GET',
            'Ошибка getUserInfo'
        )
    }

    // запрос на редактирование данных пользователя
    updateUser(name, email) {
        return this._makeFetch(`${this._baseUrl}/users/me`,
            'PATCH',
            'ошибка обновления пользователя',
            {name, email}
        )
    }

    // запрос фильмов
    getSavedMovies() {
        return this._makeFetch(`${this._baseUrl}/movies`,
            'GET',
            'ошибка getSavedMovies'
        )
    }

    // сохранение фильма
    addNewMovie(data) {
        return this._makeFetch(`${this._baseUrl}/movies`,
            'POST',
            'ошибка сохранения фильма',
            data
        )
    }

    // удаление фильма из сохранённых
    deleteMovie(data) {
        return this._makeFetch(`${this._baseUrl}/movies/${data}`,
            'DELETE',
            'ошибка удаление фильма из сохранённых'
        )
    }
}

const mainApi = new Api(MainApiUrl);

export default mainApi;
