import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SearchForm({ handleSearchSubmit, handleShorts, shortsOnly }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  
  const [errorQuery, setErrorQuery] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  }
  
  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      values.search = localStorage.getItem(`${currentUser.email} - movieSearch`);
      setIsValid(true);
    }
  }, [currentUser]);

    return (
        <section className="search">
          <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    name="search"
                    type="text"
                    placeholder="Фильм"
                    autoComplete="off"
                    value={values.search || ''}
                    onChange={handleChange}
                    required
                />
                <span className="search__error">{errorQuery}</span>
                <button className="search__button" type="submit"/>
            </form>
            <FilterCheckbox state={shortsOnly} handleShorts={handleShorts}/>
        </section>
    )
}