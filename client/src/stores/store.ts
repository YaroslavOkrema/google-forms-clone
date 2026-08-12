import { configureStore } from '@reduxjs/toolkit';

import { formsApi } from 'src/api/formsApi';
import { formBuilderReducer } from 'src/stores/formBuilderSlice';

export const store = configureStore({
  reducer: {
    [formsApi.reducerPath]: formsApi.reducer,
    formBuilder: formBuilderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formsApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
