import { createSlice } from '@reduxjs/toolkit';
import { fetchReservationsAction } from '../thunks/resrvation-process';
import { ReservationProcess } from '../../types/reservation/reservation-types';

// import { NameSpace } from '../../const/name-space';


const initialState: ReservationProcess = {
  reservations: [],
  isReservationsLoading: false
};

export const reservationProcess = createSlice({
  name: 'ReservationProcess',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchReservationsAction.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.isReservationsLoading = false;
      })
      .addCase(fetchReservationsAction.pending, (state) => {
        state.isReservationsLoading = true;
      })
      .addCase(fetchReservationsAction.rejected, (state) => {
        state.isReservationsLoading = false;
      });
  }
});

const reservationProcessReducer = reservationProcess.reducer;
export {reservationProcessReducer};
