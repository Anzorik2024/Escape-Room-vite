import { useEffect } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useActionCreators } from '../../hooks/use-action-creators';
import { questAction } from '../../store/main-slice/main-slice';
import { AppRoute } from '../../const/app-route';
import Main from '../../pages/main/main';
import QuestPage from '../../pages/quest-page/quest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import { AuthorizationStatus } from '../../const/authorization-status';
import PrivateRoute from '../private-route/private-route';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import Page404 from '../../pages/page404/page404';
//import { ToastContainer} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


function App(): JSX.Element {
  const { questOffers } = useActionCreators(questAction);


  useEffect(() => {
    questOffers()
      .unwrap()
      .catch(() => {
        //toast.error();
      });

  }, [ questOffers]);

  return (
    <BrowserRouter>

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
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <BookingPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsPage/>}
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
