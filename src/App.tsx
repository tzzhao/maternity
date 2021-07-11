import React from 'react';
import './App.css';
import {BreastFeedModal} from './components/breastFeed/BreastFeedModal';
import {DiaperModal} from './components/diaper/DiaperModal';
import { BabyBottleModal } from './components/babyBottle/BabyBottleModal';
import { ActivityTable } from './components/activityTable/activityTable';
import { ManualModal } from './components/manual/ManualModal';
import { ImportModal } from './components/data/ImportModal';
import { ExportModal } from './components/data/ExportModal';
import { SummaryChart } from './components';
import { useState } from 'react';
import { Button, Grid, Switch, Typography } from '@material-ui/core';

enum Mode {
  HISTORY, STATS
}

export function App() {
  const [mode, setMode] = useState(Mode.HISTORY);

  const handleChange = (evt: any, checked: boolean) => {
    setMode(checked ? Mode.HISTORY : Mode.STATS);
  }

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
          <Typography component="div" align='center'>
            <Grid component="label" container alignItems="center" justify='center' spacing={1}>
              <Grid item>Statistiques</Grid>
              <Grid item>
                <Switch checked={Mode.HISTORY === mode} onChange={handleChange} name="checkedC" />
              </Grid>
              <Grid item>Historique</Grid>
            </Grid>
          </Typography>
      </div>
      {mode === Mode.STATS &&
      <div>
        <SummaryChart />
      </div>
      }
      {mode === Mode.HISTORY &&
      <div>
        <ActivityTable />
      </div>
      }
      <a id="downloadAnchorElem" style={{display: 'none'}}></a>
    </div>
  );
}