// import './Register.css';
import '../CommonForm/CommonForm.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

export default function Register() {
    return (
        <main className="commonForm">
            <form className="commonForm__form" name="register"
                  noValidate
            >
                <Link to="/" className="commonForm__link">
                    <img src={logo} alt="Логотип" className="commonForm__logo"/>
                </Link>
                <h1 className="commonForm__title">Добро пожаловать!</h1>
                <div className="commonForm__labels-container">
                    <label className="commonForm__label">
                        <span className="commonForm__label-text">Имя</span>
                        <input
                            name="name"
                            className={`commonForm__input`}
                            defaultValue={''}
                            type="text"
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                        />
                        <span className="commonForm__error">ошибка имени</span>
                    </label>
                    <label className="commonForm__label">
                        <span className="commonForm__label-text">E-mail</span>
                        <input
                            name="email"
                            className={'commonForm__input commonForm__input_error'}
                            defaultValue=""
                            type="email"
                            required
                        />
                        <span className="commonForm__error">ошибка мыла</span>
                    </label>
                    <label className="commonForm__label">
                        <span className="commonForm__label-text">Пароль</span>
                        <input
                            name="password"
                            className={'commonForm__input'}
                            defaultValue={''}
                            type="password"
                            required
                        />
                        <span className="commonForm__error">ошибка пароля</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className={`commonForm__button commonForm__button_disabled`} // для теста
                    disabled={false}
                >
                    Зарегистрироваться
                </button>
                <span className="commonForm__support">
          Уже зарегистрированы?&nbsp;
                    <Link to="signin" className="commonForm__link">
            Войти
          </Link>
        </span>
            </form>
        </main>
    )
}
