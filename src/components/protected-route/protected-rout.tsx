// import type { ReactNode } from 'react';
// import type { Location } from 'react-router-dom';
// //import { selectUserInfo } from '../../store/selectors';

// import { Navigate, useLocation } from 'react-router-dom';

// import { AppRoute } from '../../const/app-route';
// //import { useAppSelector } from '../../hooks/use-app-selector';


// type ProtectedRouteProps = {
//   children: ReactNode;
//   onlyAuth?: boolean;
// }

// type FromState = {
//   from?: Location;
// };

// export default function ProtectedRoute({ children, onlyAuth }: ProtectedRouteProps) {

//   const location: Location<FromState> = useLocation() as Location<FromState>;

//   //const user = useAppSelector(selectUserInfo);
//   const user = true;

//   if (onlyAuth && user) {
//     const from = location.state?.from || { pathname: AppRoute.MainPage};
//     return <Navigate to={from} />;
//   }
//   if (!onlyAuth && !user) {
//     return <Navigate state={{ from: location}} to={AppRoute.LoginPage} />;
//   }
//   return children;
// }

