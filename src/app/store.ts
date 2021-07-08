import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { babyBottleReducer } from '../features';
import {breastFeedReducer} from '../features/breastFeed/breastFeedSlice';
import {diaperReducer} from '../features/diaper/diaperSlice';

export const store = configureStore({
  reducer: {
    babyBottle: babyBottleReducer,
    breastFeed: breastFeedReducer,
    diaper: diaperReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
