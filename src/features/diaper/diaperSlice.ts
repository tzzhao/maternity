import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {DiaperData, PEE, STOOL} from '../../interfaces/diaper.interfaces';
import { deleteDiapersData, putDiapersData } from '../../utils';

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
      const time = Math.round(Date.now() / 1000);
      const diaperData: DiaperData = {time, type: PEE};
      state.data = {...state.data, [time]: diaperData};
      updateStorage(diaperData);
    },
    logStollDiaper: (state) => {
        const time = Math.round(Date.now() / 1000);
        const diaperData: DiaperData = {time, type: STOOL};
        state.data = {...state.data, [time]: diaperData};
        updateStorage(diaperData);
    },
    loadData: (state, action: PayloadAction<{[start: number]: DiaperData}>) => {
      state.data = action.payload;
    },
    addDiaperData: (state, action: PayloadAction<DiaperData>) => {
      state.data = {...state.data, [action.payload.time]: action.payload};
      updateStorage(action.payload);
    },
    removeDiaperData: (state, action: PayloadAction<number>) => {
      delete state.data[action.payload];
      deleteDiapersData(action.payload);
    }
  },
});

export const DiaperActions = diaperSlice.actions;

export const diaperReducer = diaperSlice.reducer;
