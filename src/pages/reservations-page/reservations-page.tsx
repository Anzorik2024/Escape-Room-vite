import { useEffect } from 'react';
import Header from '../../components/header/header';
import BackgroundPictureEmpty from '../../components/background-picture-empty/background-picture-empty';
import { useAppSelector } from '../../hooks/use-app-selector';
import { isReservationsLoading } from '../../store/selectors';
import Spiner from '../../components/spiner/spiner';
import { useActionCreators } from '../../hooks/use-action-creators';
import { reservationProcessAction } from '../../store/reservation-process/reservation-process';
import { getAllReservations } from '../../store/selectors';
import { toast } from 'react-toastify';
import ReservationCard from '../../components/reservation-card/reservation-card';
import EmptyPlug from '../../components/empty-plug/empty-plug';
import { EmptyPlugText } from '../../const/empty-plug-text';


function ReservationsPage():JSX.Element {
  const { fetchReservationsAction } = useActionCreators(reservationProcessAction);

  useEffect(() => {
    fetchReservationsAction()
      .unwrap()
      .catch(() => {
        toast.error('Не удалось загрузить данные');
      });

  }, [ fetchReservationsAction]);

  const isLoading = useAppSelector(isReservationsLoading);
  const reservations = useAppSelector(getAllReservations);

  if (isLoading) {
    return (
      <Spiner />
    );
  }

  return(

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
