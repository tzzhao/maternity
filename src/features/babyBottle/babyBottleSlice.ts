import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {BabyBottleData} from '../../interfaces/babyBottle.interface';
import { deleteBabyBottleData, putBabyBottleData } from '../../utils';

export enum BabyBottleStatus {
  IDLE, FEEDING
}

export interface BabyBottleState {
  data: {[start: number]: BabyBottleData};
  status: BabyBottleStatus;
  lastStart: number | undefined;
}

const initialState: BabyBottleState = {
  data: {},
  status: BabyBottleStatus.IDLE,
  lastStart: undefined
};

function updateStorage(data: BabyBottleData) {
  putBabyBottleData(data);
}

export const babyBottleSlice = createSlice({
  name: 'babyBottle',
  initialState,
  reducers: {
    startBabyBottle: (state) => {
      state.status = BabyBottleStatus.FEEDING;
      state.lastStart = Math.round(Date.now() / 1000);
    },
    stopBabyBottle: (state, action: PayloadAction<{duration: number, quantity: number} | undefined>) => {
      const previousStatus = state.status;
      const start = state.lastStart;
      if (start !== undefined && previousStatus !== BabyBottleStatus.IDLE && action.payload !== undefined) {
        const {duration, quantity} = action.payload;
        const babyBottleData: BabyBottleData = {
          start,
          duration,
          quantity
        };
        state.data = {...state.data, [start]: babyBottleData};
        updateStorage(babyBottleData);
      }

      state.status = BabyBottleStatus.IDLE;
      state.lastStart = undefined;
    },
    loadData: (state, action: PayloadAction<{[start: number]: BabyBottleData}>) => {
      state.data = action.payload;
    },
    addBabyBottleData: (state, action: PayloadAction<BabyBottleData>) => {
      state.data = {...state.data, [action.payload.start]: action.payload};
      updateStorage(action.payload);
    },
    removeBabyBottleData: (state, action: PayloadAction<number>) => {
      delete state.data[action.payload];
      deleteBabyBottleData(action.payload);
    },
    importBabyBottleData: (state, action: PayloadAction<{[start: number]: BabyBottleData}>) => {
      state.data = {...state.data, ...action.payload};
    },
  },
});

export const babyBottleActions = babyBottleSlice.actions;

export const babyBottleReducer = babyBottleSlice.reducer;
