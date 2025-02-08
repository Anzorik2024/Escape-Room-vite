import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, QuestInfo } from '../../types/quest/quest-types';


 type BookingProcess = {
  bookedQuest: QuestInfo;
  selectedLocation: Location;
  isValid: boolean;
}

const initialState: BookingProcess = {
  bookedQuest: {} as QuestInfo,
  selectedLocation: {} as Location,
  isValid: false
};

const bookingProcess = createSlice({
  name: 'QUEST',
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    }
  },
});

const bookingProcessReducer = bookingProcess.reducer;

export const { changeLocation } = bookingProcess.actions;
export {bookingProcessReducer};
