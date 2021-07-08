import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {BreastFeedData, BreastFeedType, LEFT, RIGHT} from '../../interfaces/breastFeed.interfaces';
import { deleteBreastFeedData, putBreastFeedData } from '../../utils';

export enum BreastFeedStatus {
  IDLE, FEEDING_R, FEEDING_L
}

export interface BreastFeedState {
  data: {[start: number]: BreastFeedData};
  status: BreastFeedStatus;
  lastStart: number | undefined;
}

const initialState: BreastFeedState = {
  data: {},
  status: BreastFeedStatus.IDLE,
  lastStart: undefined
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

function updateStorage(data: BreastFeedData) {
  putBreastFeedData(data);
}

export const breastFeedSlice = createSlice({
  name: 'breastFeed',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startRightBreastFeeding: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = BreastFeedStatus.FEEDING_R;
      state.lastStart = Math.round(Date.now() / 1000);
    },
    startLeftBreastFeeding: (state) => {
      state.status = BreastFeedStatus.FEEDING_L;
      state.lastStart = Math.round(Date.now() / 1000);
    },
    stopBreastFeeding: (state, action: PayloadAction<number | undefined>) => {
      const previousStatus = state.status;
      const start = state.lastStart;
      if (start !== undefined && previousStatus !== BreastFeedStatus.IDLE && action.payload !== undefined) {
        const duration = action.payload;
        const breastFeedData: BreastFeedData = {
          start,
          duration,
          type: previousStatus === BreastFeedStatus.FEEDING_R ? RIGHT : LEFT
        };
        state.data = {...state.data, [start]: breastFeedData};
        updateStorage(breastFeedData);
      }

      state.status = BreastFeedStatus.IDLE;
      state.lastStart = undefined;
    },
    loadData: (state, action: PayloadAction<{[start: number]: BreastFeedData}>) => {
      state.data = action.payload;
    },
    addBreastFeedData: (state, action: PayloadAction<BreastFeedData>) => {
      state.data = {...state.data, [action.payload.start]: action.payload};
      updateStorage(action.payload);
    },
    removeBreastFeedData: (state, action: PayloadAction<number>) => {
      delete state.data[action.payload];
      deleteBreastFeedData(action.payload);
    },
    importBreastFeedData: (state, action: PayloadAction<{[start: number]: BreastFeedData}>) => {
      state.data = {...state.data, ...action.payload};
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const breastFeedActions = breastFeedSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export const breastFeedReducer = breastFeedSlice.reducer;
