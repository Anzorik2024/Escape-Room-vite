type FilterItemProps = {
  typeId: string;
  activeType: string;
}

function FilterItem({typeId, activeType} : FilterItemProps) : JSX.Element {

  return (
    <li className="filter__item">
      <input type="radio" name="type" id="all" checked={typeId === activeType}/>
      <label className="filter__label" htmlFor={typeId}>
        <svg className="filter__icon" width="26" height="30" aria-hidden="true">
          <use xlinkHref={`#icon-${typeId}`}></use>
        </svg><span className="filter__label-text">{typeId}</span>
      </label>
    </li>
  );
}

export default FilterItem;
