import FilterTypeOption from './filter-type-option';
import { FILTER_BY_TYPE } from '../../const/filter-by-type';

function FilterTypeOptionList():JSX.Element {

  return(
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul
        className="filter__list"
      >
        {FILTER_BY_TYPE.map(({type, title, pictureHref}) => (
          <FilterTypeOption
            type={type}
            title={title}
            pictureHref={pictureHref}
            key={type}
          />
        ))}
      </ul>
    </fieldset>
  );
}

export default FilterTypeOptionList;
