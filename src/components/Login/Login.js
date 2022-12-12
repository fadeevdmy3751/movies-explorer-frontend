import '../CommonForm/CommonForm.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {useEffect, useRef} from "react";

export default function Login({handleLogin}) {
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();
    const emailInput = useRef();
    const passwordInput = useRef();
    const submitButton = useRef();

    function handleSubmit(e) {
        e.preventDefault()
        emailInput.current.disabled = true;
        passwordInput.current.disabled = true;
        submitButton.current.disabled = true;
        handleLogin(values)
        emailInput.current.disabled = false;
        passwordInput.current.disabled = false;
        submitButton.current.disabled = false;
    }

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    return (<main className="commonForm">
        <form
            className="commonForm__form"
            name="login"
            noValidate
            onSubmit={handleSubmit}
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
                        className={`commonForm__input ${errors.email && 'commonForm__input_error'}`}
                        onChange={handleChange}
                        value={values.email || ''}
                        type="email"
                        ref={emailInput}
                        required
                    />
                    <span className="commonForm__error">{errors.email || ''}</span>
                </label>
                <label className="commonForm__label">
                    <span className="commonForm__label-text">Пароль</span>
                    <input
                        name="password"
                        className={`commonForm__input ${
                            errors.password && 'commonForm__input_error'
                        }`}
                        onChange={handleChange}
                        value={values.password || ''}
                        type="password"
                        ref={passwordInput}
                        required
                    />
                    <span className="commonForm__error">{errors.password || ''}</span>
                </label>
            </div>
            <button
                type="submit"
                className={`commonForm__button ${!isValid && 'commonForm__button_disabled'}`}
                ref={submitButton}
                disabled={!isValid}
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
