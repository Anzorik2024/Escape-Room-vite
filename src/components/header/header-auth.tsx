import { Link } from 'react-router-dom';
import { useActionCreators } from '../../hooks/use-action-creators';
import { userActions } from '../../store/user-process/user-process';
import { AppRoute } from '../../const/app-route';
import HeaderNavigation from './header-navigation';

type HeaderAuthProps = {
  user: boolean;
}


function HeaderAuth({user} : HeaderAuthProps): JSX.Element {

  const {logout} = useActionCreators(userActions);

  const handleButtonClick = () => {
    logout();
  };

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
          to={AppRoute.MainPage}
          title="To the main page"
          onClick={handleButtonClick}
        >
        Выйти
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

export default HeaderAuth;
