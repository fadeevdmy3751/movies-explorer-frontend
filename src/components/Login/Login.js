// import './Login.css';
import '../CommonForm/CommonForm.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

export default function Login({handleLogin}) {

    const [email, setEmail] = useState()

    function onLogin(e) {
        e.preventDefault()
        handleLogin({email})
    }

    return (<main className="commonForm">
        <form
            className="commonForm__form"
            name="login"
            // noValidate // todo потом убрать
            onSubmit={onLogin}
        >
            <Link to='/' className='commonForm__link'>
                <img src={logo} alt="Логотип" className="commonForm__logo"/>
            </Link>
            <h1 className="commonForm__title">Рады видеть!</h1>
            <div className="commonForm__labels-container">
                <label className="commonForm__label">
                    <span className="commonForm__label-text">E-mail</span>
                    <input
                        name="email"
                        className={`commonForm__input commonForm__input_error'}`}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ''}
                        type="email"
                        required
                    />
                    <span className="commonForm__error">ошибка мыла</span>
                </label>
                <label className="commonForm__label">
                    <span className="commonForm__label-text">Пароль</span>
                    <input
                        name="password"
                        className={'commonForm__input commonForm__input_error'}
                        defaultValue=""
                        type="password"
                        required
                    />
                    <span className="commonForm__error">ошибка пароля</span>
                </label>
            </div>
            <button
                type="submit"
                className={`commonForm__button`} //'commonForm__button_disabled'
                disabled={false}
            >
                Войти
            </button>
            <span className="commonForm__support">
                    Ещё не зарегистрированы?&nbsp;
                <Link to='/signup' className="commonForm__link">
                  Регистрация
                </Link>
            </span>
        </form>
    </main>);
}