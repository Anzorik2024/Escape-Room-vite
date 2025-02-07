import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

type HeaderNavigationProps = {
  user: boolean;
}


function HeaderNavigation({user} : HeaderNavigationProps):JSX.Element {

  return (
    <nav className="main-nav header__main-nav">
      <ul
        className="main-nav__list"
      >
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => (isActive ? 'link active' : 'link')}
            to={AppRoute.MainPage} end
          >
            Квесты
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className={({isActive}) => (isActive ? 'link active' : 'link')}
            to={AppRoute.Contacts}
          >
            Контакты
          </NavLink>
        </li>
        {user &&
          <li className="main-nav__item">
            <NavLink
              className={({isActive}) => (isActive ? 'link active' : 'link')}
              to={AppRoute.MyQuests}
            >
            Мои бронирования
            </NavLink>
          </li>}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
