import FilterLevelOptionsList from './filter-level-option-list';
import FilterTypeOptionList from './filter-type-options-list';


function FormFilter():JSX.Element {
  return (
    <form className="filter" action="#" method="get">
      <FilterTypeOptionList/>
      <FilterLevelOptionsList/>
    </form>
  );
}

export default FormFilter;
