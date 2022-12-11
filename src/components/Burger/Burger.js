import './Burger.css';
import {useEffect} from 'react';

export default function Burger({isBurgerOpened, onClickBurger}) {
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
            className={`burger-button burger-button_${
                isBurgerOpened ? 'on' : 'off'
            }`}
            onClick={handleOnClickBurger}
        >
            <span/>
        </button>
    );
}
