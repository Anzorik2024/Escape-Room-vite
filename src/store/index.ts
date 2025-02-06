import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { mainReducer } from './main-slice/main-slice';
import { filterProcessReducer } from './filter-process/filter-process';


export const api = createAPI();
export const store = configureStore({
  reducer: {
    main: mainReducer,
    filterProcess: filterProcessReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});


