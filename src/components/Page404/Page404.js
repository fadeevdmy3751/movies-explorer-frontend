import './Page404.css';
import {useHistory} from "react-router-dom";

export default function Page404() {
  const history = useHistory();
  
  return (
    <main className="not-found">
      <p className="not-found__text-container">
        <span className="not-found__error">404</span>
        <span className="not-found__error-name">Страница не найдена</span>
      </p>
      <button className="not-found__button" onClick={history.goBack}>
        Назад
      </button>
    </main>
  );
}
