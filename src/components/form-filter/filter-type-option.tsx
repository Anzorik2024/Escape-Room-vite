import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { ChangeEvent } from 'react';
import { QuestType } from '../../const/quest-type';
import { changeType } from '../../store/filter-process/filter-process';
import { getFilterOptionByType } from '../../store/selectors';

type FilterTypeOptionProps = {
  type: string;
  title: string;
  pictureHref: string;
};

function FilterTypeOption({type, title, pictureHref}: FilterTypeOptionProps):JSX.Element {
  const selectedType = useAppSelector(getFilterOptionByType);

  const dispatch = useAppDispatch();

  const handleFilterTypeOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target as HTMLInputElement;

    dispatch(changeType(selectedOption.id as QuestType));

  };


  return(
    <li className="filter__item">
      <input
        type="radio"
        name="type"
        id={type}
        onChange={handleFilterTypeOptionChange}
        checked={selectedType === type}
      />
      <label
        className="filter__label"
        htmlFor={type}
      >
        <svg
          className="filter__icon"
          width={26}
          height={30}
          aria-hidden="true"
        >
          <use xlinkHref={pictureHref} />
        </svg>
        <span
          className="filter__label-text"
        >
          {title}
        </span>
      </label>
    </li>
  );
}

export default FilterTypeOption;
