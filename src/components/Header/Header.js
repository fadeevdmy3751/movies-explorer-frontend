import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";

export default function Header({loggedIn, onClickBurger, isBurgerOpened, closeBurger}) {
    return (
        <header className='header'>
            <div className="header__container">
                <Link to='/' className='header__link'>
                    <img src={logo} alt="Логотип"/>
                </Link>
                <Navigation
                    loggedIn={loggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    closeBurger={closeBurger}
                />
            </div>
        </header>
    );
}