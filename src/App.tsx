import React from 'react';
import './App.css';
import {BreastFeedModal} from './components/breastFeed/BreastFeedModal';
import {DiaperModal} from './components/diaper/DiaperModal';
import {BreastFeedActivity} from './components/breastFeed/BreastFeedActivity';
import {DiaperActivity} from './components/diaper/DiaperActivity';
import { BabyBottleModal } from './components/babyBottle/BabyBottleModal';
import { BabyBottleActivity } from './components/babyBottle/BabyBottleActivity';
import { ActivityTable } from './components/activityTable/activityTable';
import { ManualModal } from './components/manual/ManualModal';
import { ImportModal } from './components/data/ImportModal';
import { ExportModal } from './components/data/ExportModal';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='action-wrapper'>
        <div className='actions'>
          <BreastFeedModal type='l' />
          <BreastFeedModal type='r' />
          <BabyBottleModal />
          <DiaperModal />
          <ManualModal modalTitle='Ajouter'></ManualModal>
        </div>
        <div className='actions'>
          <ExportModal />
          <ImportModal />
        </div>
      </div>
      <div>
        <ActivityTable />
      </div>
    </div>
  );
}