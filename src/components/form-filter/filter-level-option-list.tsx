import FilterLevelOption from './filter-level-option';
import { FILTER_BY_LEVEL } from '../../const/filter-by-difficulty';

function FilterLevelOptionsList():JSX.Element {

  return(
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul
        className="filter__list"
      >
        {FILTER_BY_LEVEL.map(({level, title}) => (
          <FilterLevelOption
            level={level}
            title={title}
            key={level}
          />
        ))}
      </ul>
    </fieldset>
  );
}

export default FilterLevelOptionsList;
