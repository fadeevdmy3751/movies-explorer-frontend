import './AboutMe.css';
import userpic from '../../images/userpic.jpg';

export default function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__container">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__bio-container">
                    <div className="about-me__bio">
                        <h3 className="about-me__name">Дима</h3>
                        <p className="about-me__age">Фронтенд-разработчик, 25 лет</p>
                        <p className="about-me__text">
                            Я менеджер самого среднего звена,<br/>
                            У меня есть дети, у меня есть жена,<br/>
                            Я работаю в компании «Связь-интерком»<br/>
                            И каждый понедельник я - огурцом!
                        </p>
                        <ul className="about-me__socials">
                            <li>
                                <a
                                    href="https://t.me/+79998426108"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="about-me__social-link"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/fadeevdmy3751"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="about-me__social-link"
                                >
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                    <img
                        className="about-me__avatar"
                        src={userpic}
                        alt="фотография разработчика приложения"
                    />
                </div>
            </div>
        </section>
    );
}
