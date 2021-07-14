import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {DiaperData, PEE, STOOL} from '../../interfaces/diaper.interfaces';
import { deleteDiapersData, putDiapersData, putManyDiaperData } from '../../utils';

export interface DiaperState {
  data: {[start: number]: DiaperData};
}

const initialState: DiaperState = {
  data: {},
};

function updateStorage(data: DiaperData) {
  putDiapersData(data);
}

export const diaperSlice = createSlice({
  name: 'Diaper',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logPeeDiaper: (state) => {
      const start = Math.round(Date.now() / 1000);
      const diaperData: DiaperData = {start, type: PEE};
      state.data = {...state.data, [start]: diaperData};
      updateStorage(diaperData);
    },
    logStollDiaper: (state) => {
        const start = Math.round(Date.now() / 1000);
        const diaperData: DiaperData = {start, type: STOOL};
        state.data = {...state.data, [start]: diaperData};
        updateStorage(diaperData);
    },
    loadData: (state, action: PayloadAction<{[start: number]: DiaperData}>) => {
      state.data = action.payload;
    },
    addDiaperData: (state, action: PayloadAction<DiaperData>) => {
      state.data = {...state.data, [action.payload.start]: action.payload};
      updateStorage(action.payload);
    },
    removeDiaperData: (state, action: PayloadAction<number>) => {
      delete state.data[action.payload];
      deleteDiapersData(action.payload);
    },
    importDiaperData: (state, action: PayloadAction<{[start: number]: DiaperData}>) => {
      state.data = {...state.data, ...migrateTimeToStartKey(action.payload)};
      putManyDiaperData(action.payload);
    },
  },
});

function migrateTimeToStartKey(data: {[start: number]: DiaperData}): any {
  const newData: any = {};
  Object.values(data).forEach((d: any) => {
    if (d.time) {
      d.start = d.time;
      delete d.time;
      newData[d.start] = d;
    } else {
      newData[d.start] = d;
    }
  })
  return newData;
}

export const DiaperActions = diaperSlice.actions;

export const diaperReducer = diaperSlice.reducer;
