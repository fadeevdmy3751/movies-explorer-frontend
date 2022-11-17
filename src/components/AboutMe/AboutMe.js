import './AboutMe.css';
import userpic from '../../images/userpic.png';

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
              Я люблю свою работу
              я прийду сюда в субботу
              от работы дохнут кони
              ну а я пока работаю в конторе за гроши но зато бля для души
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://vk.com/nikkach"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TinaevNK"
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
