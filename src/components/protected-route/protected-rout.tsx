import type { ReactNode } from 'react';
import type { Location } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const/authorization-status';
//import { selectUserInfo } from '../../store/selectors';

import { Navigate, useLocation } from 'react-router-dom';


type ProtectedRouteProps = {
  children: ReactNode;
  onlyAuth?: boolean;
}

 type FromState = {
   from?: Location;
};

export default function ProtectedRoute({ children, onlyAuth }: ProtectedRouteProps) {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  console.log(authorizationStatus);

  const location = useLocation();

  const user = authorizationStatus === AuthorizationStatus.Auth;

  if (onlyAuth && user) {
    const from = (location.state as FromState)?.from || { pathname: AppRoute.MainPage};
    return <Navigate to={from} />;
  }
  if (!onlyAuth && !user) {
    return <Navigate state={{ from: location}} to={AppRoute.Login} />;
  }
  return children;
}

