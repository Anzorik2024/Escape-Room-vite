import { Link } from 'react-router-dom';

import HeaderNavigation from './header-navigation';
import { AppRoute } from '../../const/app-route';

type HeaderNoAuthProps = {
  user: boolean;
}

function HeaderNoAuth({user}:HeaderNoAuthProps): JSX.Element {

  return (
    <div className="container container--size-l">
      <span className="logo header__logo">
        <svg width={134} height={52} aria-hidden="true">
          <use xlinkHref="#logo" />
        </svg>
      </span>
      <HeaderNavigation user={user}/>
      <div className="header__side-nav">
        <Link
          className="btn btn--accent header__side-item"
          to={AppRoute.Login}
          title="To the login page"
        >
        Войти
        </Link>
        <a
          className="link header__side-item header__phone-link"
          href="tel:88003335599"
        >
        8 (000) 111-11-11
        </a>
      </div>
    </div>
  );
}

export default HeaderNoAuth;
