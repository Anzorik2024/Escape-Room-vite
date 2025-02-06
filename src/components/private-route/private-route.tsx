import {Navigate} from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
//import { AuthorizationStatus } from '../../const/authorization-status';
import { AuthorizationStatus } from '../../const/authorization-status';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
