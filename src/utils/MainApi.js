

const MainApiUrl = "https://api.fadeeploma.nomoredomains.club/api/"
const apiConfig = {
  baseUrl: MainApiUrl,
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json'
  }
}
const fetchOptions = {
  method: requestMethod,
  headers: this._headers,
  credentials: 'include'
};