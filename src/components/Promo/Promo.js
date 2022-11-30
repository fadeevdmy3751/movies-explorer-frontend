import './Promo.css';

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__about-project">
                    <h1 className="promo__title">
                        Учебный проект студента факультета Веб&#8209;разработки.
                    </h1>
                    <ul className="promo__link-list">
                        <li>
                            <a className="promo__link" href="#about-project">О проекте</a>
                        </li>
                        <li>
                            <a className="promo__link" href="#techs">Технологии</a>
                        </li>
                        <li>
                            <a className="promo__link" href="#aboutMe">Студент</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
