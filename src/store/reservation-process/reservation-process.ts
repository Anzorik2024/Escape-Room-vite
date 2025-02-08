import { createSlice } from '@reduxjs/toolkit';
import { fetchReservationsAction } from '../thunks/resrvation-process';
import { ReservationProcess } from '../../types/reservation/reservation-types';
import { deleteReservationAction } from '../thunks/resrvation-process';


const initialState: ReservationProcess = {
  reservations: [],
  isReservationsLoading: false,
  isReservationsDeleteLoading: false,
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
      })
      .addCase(deleteReservationAction.fulfilled, (state) => {
        state.isReservationsDeleteLoading = false;
      })
      .addCase(deleteReservationAction.pending, (state) => {
        state.isReservationsDeleteLoading = false;
      })
      .addCase(deleteReservationAction.rejected, (state) => {
        state.isReservationsDeleteLoading = false;
      });
  }
});

const reservationProcessAction = {
  fetchReservationsAction
};

const reservationProcessReducer = reservationProcess.reducer;

export {reservationProcessReducer, reservationProcessAction };
