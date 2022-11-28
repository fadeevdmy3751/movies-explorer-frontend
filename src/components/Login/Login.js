import './Login.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

export default function Login({handleLogin}) {

    const [email, setEmail] = useState()

    function onLogin(e) {
        e.preventDefault()
        handleLogin({email})
    }

    return (<main className="login">
        <form
            className="login__form"
            name="login"
            // noValidate // todo потом убрать
            onSubmit={onLogin}
        >
            <Link to='/' className='login__link'>
                <img src={logo} alt="Логотип" className="login__logo"/>
            </Link>
            <h1 className="login__title">Рады видеть!</h1>
            <div className="login__labels-container">
                <label className="login__label">
                    <span className="login__label-text">E-mail</span>
                    <input
                        name="email"
                        className={`login__input login__input_error'}`}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ''}
                        type="email"
                        required
                    />
                    <span className="login__error">ошибка мыла</span>
                </label>
                <label className="login__label">
                    <span className="login__label-text">Пароль</span>
                    <input
                        name="password"
                        className={'login__input login__input_error'}
                        defaultValue=""
                        type="password"
                        required
                    />
                    <span className="login__error">ошибка пароля</span>
                </label>
            </div>
            <button
                type="submit"
                className={`login__button`} //'login__button_disabled'
                disabled={false}
            >
                Войти
            </button>
            <span className="login__support">
                    Ещё не зарегистрированы?&nbsp;
                <Link to='/signup' className="login__link">
                  Регистрация
                </Link>
            </span>
        </form>
    </main>);
}