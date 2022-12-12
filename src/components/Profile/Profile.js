import './Profile.css';
import {useContext, useEffect, useRef} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Profile({handleSignOut, handleProfile}) {
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    const emailInput = useRef();
    const nameInput = useRef();
    const submitButton = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        emailInput.current.disabled = true;
        nameInput.current.disabled = true;
        submitButton.current.disabled = true;
        handleProfile(values);
        emailInput.current.disabled = false;
        nameInput.current.disabled = false;
        submitButton.current.disabled = false;
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    const onSubmit = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    return (
        <main className="profile">
            <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
                <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
                <div className="profile__labels-container">
                    <label className="profile__label">
                        <span className="profile__label-text">Имя</span>
                        <input
                            name="name"
                            className={`profile__input ${errors.name && 'profile__input_error'}`}
                            onChange={handleChange}
                            value={values.name || ''}
                            type="text"
                            ref={nameInput}
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                        />
                        <span className="profile__error-name">{errors.name || ''}</span>
                    </label>
                    <label className="profile__label">
                        <span className="profile__label-text">E-mail</span>
                        <input
                            name="email"
                            className={`profile__input ${errors.email && 'profile__input_error'}`}
                            onChange={handleChange}
                            value={values.email || ''}
                            type="email"
                            ref={emailInput}
                            required
                        />
                        <span className="profile__error">{errors.email || ''}</span>
                    </label>
                </div>
                <div className="profile__button-container">
                    <button
                        type="submit"
                        className={`profile__button-edit ${onSubmit ? 'profile__button-edit_disabled' : ''}`}
                        disabled={onSubmit}
                        ref={submitButton}
                    >
                        Редактировать
                    </button>
                    <button type="submit" className="profile__button-exit" onClick={handleSignOut}>
                        Выйти из аккаунта
                    </button>
                </div>
            </form>
        </main>
    );
}
