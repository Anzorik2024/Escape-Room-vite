import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state/state';
import { ApiRoutes } from '../../const/api-routes';
import { ReservationsData, BookingInfo } from '../../types/reservation/reservation-types';


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

//   interface PostCommentProps {
//     offerId: number;
//   }

// export const postCommentBook = createAsyncThunk<void, BookingInfo, {extra: AxiosInstance}>('comments/post', async ({ body, offerId }, { extra : api}) => {
//   const response = await api.post<BookingInfo>(`${ApiRoutes.Quests}/${offerId}/booking`, body);
//   return response.data;
// });
