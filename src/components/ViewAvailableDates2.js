import React, { useState } from 'react';
import Calendar from './CalView';

import '../App.Sync.css'
// import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

function GetDate() {
    return (
        <div className="App">
          <Calendar month={7} year={2023} />
        </div>
      );
}

export default GetDate;
