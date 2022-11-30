import './Profile.css';
import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({loggedIn, handleSignOut}) {
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
    } // заглушка

    return (<main className="profile">
        <form className="profile__form" name="profile"
            //noValidate
              onSubmit={handleSubmit}>
            <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
            <div className="profile__labels-container">
                <label className="profile__label">
                    <span className="profile__label-text">Имя</span>
                    <input
                        name="name"
                        className='profile__input'
                        defaultValue={currentUser.name || ''}
                        type="text"
                        required
                        minLength="2"
                        maxLength="30"
                        pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                    />
                    <span className="profile__error-name">Ошибка для примера</span>
                </label>
                <label className="profile__label">
                    <span className="profile__label-text">E-mail</span>
                    <input
                        name="email"
                        className='profile__input profile__input_error'
                        defaultValue={currentUser.email || ''}
                        type="email"
                        required
                    />
                    <span
                        className="profile__error">еще Ошибка для примера</span>{/* здесь будет сообщение от валидатора */}
                </label>
            </div>
            <div className="profile__button-container">
                <button
                    type="submit"
                    className={'profile__button-edit'}
                    disabled={false}
                >
                    Редактировать
                </button>
                <button type="submit" className="profile__button-exit" onClick={handleSignOut}>
                    Выйти из аккаунта
                </button>
            </div>
        </form>
    </main>);
}