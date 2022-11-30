import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({handleShorts, shortsOnly}) {
    function handleSubmit(e) {
        e.preventDefault()
    }

    const errorText = ''

    return (
        <section className="search">
            <form className="search__form" name="search"
                //noValidate
                  onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    name="search"
                    type="text"
                    placeholder="Фильм"
                    autoComplete="off"
                    defaultValue=""
                    required
                />
                <span className="search__error">{errorText}</span>
                <button className="search__button" type="submit"/>
            </form>
            <FilterCheckbox state={shortsOnly} handleShorts={handleShorts}/>
        </section>
    )
}