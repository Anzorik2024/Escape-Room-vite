import Header from '../../components/header/header';
import BackgroundPictureEmpty from '../../components/background-picture-empty/background-picture-empty';
import ReservationCard from '../../components/reservation-card/reservation-card';
import LoadingPage from '../loading-page/loading-page';
import EmptyPlug from '../../components/empty-plug/empty-plug';

import { useAppSelector } from '../../hooks';
import { getAllReservations, isReservationsLoading } from '../../store/reservation-process/reservation-process-selectors';

import { EmptyPlugText } from '../../const/empty-plug-text';

function ReservationsPage():JSX.Element {
  const reservations = useAppSelector(getAllReservations);
  const isLoading = useAppSelector(isReservationsLoading);

  return(
    isLoading ? <LoadingPage/>
      :
      <>
        <Header />
        <main className="page-content decorated-page">
          <BackgroundPictureEmpty/>
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="title title--size-m page-content__title">
            Мои бронирования
              </h1>
            </div>
            <div className="cards-grid">
              { reservations?.length ?
                reservations.map((reservation) => (
                  <ReservationCard
                    reservation={reservation}
                    key={reservation.id}
                  />
                ))
                : <EmptyPlug text={EmptyPlugText.NoReservationsYet}/>}
            </div>
          </div>
        </main>
      </>
  );
}

export default ReservationsPage;
