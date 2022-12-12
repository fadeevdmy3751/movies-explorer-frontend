import '../CommonForm/CommonForm.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation'
import {useEffect, useRef} from "react";

export default function Register({handleRegister}) {
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

    const emailInput = useRef();
    const passwordInput = useRef();
    const nameInput = useRef();
    const submitButton = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        emailInput.current.disabled = true;
        passwordInput.current.disabled = true;
        nameInput.current.disabled = true;
        submitButton.current.disabled = true;
        handleRegister(values);
        emailInput.current.disabled = false;
        passwordInput.current.disabled = false;
        nameInput.current.disabled = false;
        submitButton.current.disabled = false;
    }

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    return (
        <main className="commonForm">
            <form className="commonForm__form" name="register"
                  noValidate onSubmit={handleSubmit}>
                <Link to="/" className="commonForm__link">
                    <img src={logo} alt="Логотип" className="commonForm__logo"/>
                </Link>
                <h1 className="commonForm__title">Добро пожаловать!</h1>
                <div className="commonForm__labels-container">
                    <label className="commonForm__label">
                        <span className="commonForm__label-text">Имя</span>
                        <input
                            name="name"
                            className={`commonForm__input ${errors.name && 'commonForm__input_error'}`}
                            onChange={handleChange}
                            value={values.name || ''}
                            type="text"
                            ref={nameInput}
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                        />
                        <span className="commonForm__error">{errors.name || ''}</span>
                    </label>
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
                            className={`commonForm__input ${errors.password && 'commonForm__input_error'}`}
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
