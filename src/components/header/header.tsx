import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const/authorization-status';
import HeaderAuth from './header-auth';
import HeaderNoAuth from './header-no-auth';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const checkUser = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      {checkUser ? <HeaderAuth user={checkUser} /> : <HeaderNoAuth user={checkUser}/>}
    </header>
  );
}

export default Header;
