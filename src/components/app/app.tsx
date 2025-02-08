import { useEffect } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useActionCreators } from '../../hooks/use-action-creators';
import { questAction } from '../../store/main-slice/main-slice';
import { AppRoute } from '../../const/app-route';
import Main from '../../pages/main/main';
import QuestPage from '../../pages/quest-page/quest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import LoginPage from '../../pages/login-page/login-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import Page404 from '../../pages/page404/page404';
import { getToken } from '../../services/token';
import { userActions } from '../../store/user-process/user-process';
import ProtectedRoute from '../protected-route/protected-rout';
import { ToastContainer, toast} from 'react-toastify';
import ReservationsPage from '../../pages/reservations-page/reservations-page2';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {

  const { questOffers } = useActionCreators(questAction);
  const {checkAuthorization} = useActionCreators(userActions);

  const errorMessage = 'Не удалось загрузить данные!';


  useEffect(() => {
    questOffers()
      .unwrap()
      .catch(() => {
        toast.error(errorMessage);
      });

  }, [ questOffers]);


  const token = getToken();

  useEffect(() => {
    checkAuthorization();
  }, [token, checkAuthorization]);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={<Main/>}
        />
        <Route
          path={AppRoute.QuestPage}
          element={<QuestPage/>}
        />
        <Route
          path={`${AppRoute.Quest}/:id/booking`}
          element={
            <ProtectedRoute>
              <BookingPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <ProtectedRoute onlyAuth>
              <LoginPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path= {AppRoute.MyQuests}
          element={
            <ProtectedRoute>
              <ReservationsPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path= '*'
          element={<Page404/>}
        />
      </Routes>
    </BrowserRouter>

  );

}
export default App;
