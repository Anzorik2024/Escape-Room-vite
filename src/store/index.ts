import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { mainReducer } from './main-slice/main-slice';
import { filterProcessReducer } from './filter-process/filter-process';
import { userReducer } from './user-process/user-process';
import { questsReducer } from './quests-process/quests-process';
import { bookingProcessReducer } from './booking-process/booking-process';
import { reservationProcessReducer } from './reservation-process/reservation-process';


export const api = createAPI();
export const store = configureStore({
  reducer: {
    main: mainReducer,
    filterProcess: filterProcessReducer,
    userProcess: userReducer,
    questsProcess: questsReducer,
    bookingProcess: bookingProcessReducer,
    reservationProcess: reservationProcessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});


