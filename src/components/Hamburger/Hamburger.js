import './Hamburger.css';
import {useEffect} from 'react';

export default function Hamburger({isBurgerOpened, onClickBurger}) {
    // определяем ширину экрана, для правильной логики работы классов и отображения меню
    const isMobile = document.documentElement.clientWidth < 800

    function handleOnClickBurger() {
        onClickBurger();
    }

    useEffect(() => {
        if (!isMobile && isBurgerOpened) {
            onClickBurger();
        }
    }, [isBurgerOpened, isMobile, onClickBurger]);

    return (
        <button
            type="button"
            className={`hamburger-button hamburger-button_${
                isBurgerOpened ? 'on' : 'off'
            }`}
            onClick={handleOnClickBurger}
        >
            <span/>
        </button>
    );
}
