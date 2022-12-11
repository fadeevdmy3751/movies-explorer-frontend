import './Navigation.css';
import {Link, NavLink} from "react-router-dom";
import Burger from "../Burger/Burger";
import profile_pic from "../../images/profile.svg"

export default function Navigation({loggedIn, isBurgerOpened, onClickBurger, closeBurger}) {
    const activeLink = `navigation__link_active_${isBurgerOpened ? 'mobile' : 'desktop'}`;

    function handleClickOverlay(e) {
        e.stopPropagation();
    }

    return (
        <>
            {!loggedIn ? (
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li>
                            <Link to='/signup' className='navigation__link navigation__link_landing'>
                                Регистрация
                            </Link>
                        </li>
                        <li>
                            <Link to='/signin'
                                  className='navigation__link navigation__link_landing navigation__link_signin'>
                                Войти
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`}
                     onClick={isBurgerOpened ? onClickBurger : undefined}>
                    <Burger isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger}/>
                    <ul className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`}
                        onClick={handleClickOverlay}>
                        {isBurgerOpened && (
                            <li className="navigation__item">
                                <NavLink exact to='/' className='navigation__link'
                                         activeClassName={activeLink}
                                         onClick={closeBurger}>
                                    Главная
                                </NavLink>
                            </li>
                        )}
                        <div className='navigation__list-left'>
                            <li className='navigation__item'>
                                <NavLink to='/movies' className='navigation__link' activeClassName={activeLink}
                                         onClick={closeBurger}>
                                    Фильмы
                                </NavLink>
                            </li>
                            <li className="navigation__item">
                                <NavLink to='/saved-movies' className='navigation__link' activeClassName={activeLink}
                                         onClick={closeBurger}>
                                    Сохранённые фильмы
                                </NavLink>
                            </li>
                        </div>
                        <li className="navigation__item navigation__item_type_account">
                            <NavLink to='/profile' className='navigation__link'
                                     activeClassName={activeLink}
                                     onClick={closeBurger}>
                                Аккаунт
                                <img className='navigation__account-img' alt='профиль'
                                     src={profile_pic}/>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}
