import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state/state';
import { ApiRoutes } from '../../const/api-routes';
import { ReservationsData, BookingInfo } from '../../types/reservation/reservation';


export const fetchReservationsAction = createAsyncThunk<
ReservationsData,
undefined,
{
  dispatch: Dispatch;
  state: State;
  extra: AxiosInstance;
}
>('reservation/fetchReservations',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<ReservationsData>(ApiRoutes.Reservation);

    return data;
  }
);

export const sendBookingInfoAction = createAsyncThunk<
  void,
  BookingInfo,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('booking/sendBookingInfo',
    async(ReservationInfo, {extra: api}) => {

      await api.post<BookingInfo>(`${ApiRoutes.Quests}/${ReservationInfo.questId}/booking`, ReservationInfo);
    }
  );

export const deleteReservationAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('reservation/deleteReservationById',
    async (id, {extra: api}) => {
      await api.delete(`${ApiRoutes.Reservation}/${id}`);
    }
  );
