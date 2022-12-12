const SHORTS_DUR = 40;
const WIDTH_PARAMS = [
    {
        width: 1280,
        total: 12,
        more: 4
    },
    {
        width: 910,
        total: 12,
        more: 3
    },
    {
        width: 580,
        total: 8,
        more: 2
    },
    {
        width: 200,
        total: 5,
        more: 2
    },
]

const searchError = 'Нужно ввести ключевое слово.'
const emailError = 'Некорректый адрес почты.'
const nameError = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.'

const EmailRegexp = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"

export {SHORTS_DUR, WIDTH_PARAMS, searchError, emailError, nameError, EmailRegexp}