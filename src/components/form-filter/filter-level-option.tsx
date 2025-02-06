import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilterOptionByLevel } from '../../store/selectors';
import { ChangeEvent } from 'react';
import { changeLevel } from '../../store/filter-process/filter-process';
import { QuestLevelRaw } from '../../const/quest-level';

type FilterLevelOptionProps = {
  level: string;
  title: string;
};

function FilterLevelOption({level, title}: FilterLevelOptionProps):JSX.Element {
  const selectedLevel = useAppSelector(getFilterOptionByLevel);

  const dispatch = useAppDispatch();

  const handleFilteLevelOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target as HTMLInputElement;
    dispatch(changeLevel(selectedOption.id as QuestLevelRaw));
  };

  return(
    <li className="filter__item">
      <input
        type="radio"
        name="level"
        id={level}
        onChange={handleFilteLevelOptionChange}
        checked={selectedLevel === level}
      />
      <label
        className="filter__label"
        htmlFor={level}
      >
        <span
          className="filter__label-text"
        >
          {title}
        </span>
      </label>
    </li>
  );
}

export default FilterLevelOption;
