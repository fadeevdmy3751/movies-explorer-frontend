import './FilterCheckbox.css';

export default function FilterCheckbox({state, handleShorts}) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShorts}
        checked={state}
      />
      <span className="filter__tumbler"/>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}