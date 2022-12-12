import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useRef} from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {searchError} from "../../utils/constants";


export default function SearchForm({handleSearchSubmit, handleShorts, shortsOnly}) {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();
    const {errors, values, handleChange, isValid, setIsValid} = useFormWithValidation();

    const searchInput = useRef();
    const submitButton = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        searchInput.current.disabled = true;
        submitButton.current.disabled = true;
        if (errors.search === 'empty')  // чтоб сразу не было красного
            setIsValid(e.target.checkValidity())
        else if (isValid) handleSearchSubmit(values.search)
        searchInput.current.disabled = false;
        submitButton.current.disabled = false;
    }

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`movieSearch`)) {
            values.search = localStorage.getItem(`movieSearch`);
        }
        setIsValid(true);
        errors.search = 'empty'
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
                    ref={searchInput}
                    required
                />
                {!isValid && <span className="search__error">{searchError}</span>}
                <button className="search__button" type="submit" ref={submitButton}/>
            </form>
            <FilterCheckbox state={shortsOnly} handleShorts={handleShorts}/>
        </section>
    )
}