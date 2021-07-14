import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorkerRegistration';
import { getAllBabyBottleData, getAllBreastFeedData, getAllDiapersData, initDb } from './utils';
import { babyBottleActions, breastFeedActions, DiaperActions } from './features';

const db = window.indexedDB;

setTimeout(() => {
  initDb().then(() => {
    Promise.all([getAllBabyBottleData(), getAllBreastFeedData(), getAllDiapersData()]).then(([babyBottleData, breastFeedData, allDiapersData]) => {
      console.log(babyBottleData, breastFeedData, allDiapersData);
      store.dispatch(babyBottleActions.loadData(arrayToObject(babyBottleData, 'start')));
      store.dispatch(breastFeedActions.loadData(arrayToObject(breastFeedData, 'start')));
      store.dispatch(DiaperActions.loadData(arrayToObject(allDiapersData, 'start')));
    });
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 200);


function arrayToObject(array: any[], key: string) {
  const obj: any = {};
  array.forEach((el: any) => {
    obj[el[key]] = el;
  })
  return obj;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
