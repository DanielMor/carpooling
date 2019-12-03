import React, { useState, useEffect } from 'react';
import Calendar from 'Calendar';
import { DriversList } from 'Drivers';
import { BalanceGraph } from 'BalanceGraph';
import DriverForm from 'components/drivers/DriverForm';
import AddTripChange from 'components/trips/AddTripChange';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import colorsList from 'data/colors';
import moment from 'moment';
import { getBalances } from './helper';

import api from 'api';

export default function Group({ group }) {
  const [state, setState] = useState({ isLoading: true });
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [addTrip, setAddTrip] = useState({ open: false, day: null });

  useEffect(() => {
    const byGroup = api.groups.by(group.key);

    Promise.all([
      byGroup.drivers.get(),
      byGroup.cycles.get(),
      byGroup.trips.get(),
    ])
    .then(([drivers, cycles, changes]) => {
      cycles = cycles.map((c) => ({
          ...c,
          start: moment(c.start),
          end: c.end ? moment(c.end) : null,
      }));

      drivers = drivers.map((d, i) => {
        return {
          ...d,
          colors: colorsList[i],
        };
      });

      const trips = changes.reduce((res, c) => {
          const day = moment(c.day).format('YYYY-MM-DD');
          res[day] = c;

          return res;
      }, {});

      const colorDomain = drivers.map((_, index) => index);
      const colorRange = drivers.map(d => d.colors[1]);
      const balances = getBalances(trips);
      const graphData = drivers.map((d, index) => {
        return {
          y: index + 1,
          x: balances[d.id] || 0,
          color: index,
        }
      });

      setState({
        isLoading: false,
        drivers,
        cycles,
        trips,
        colorDomain,
        colorRange,
        graphData,
      });
    });
  }, [group.key]);

  function handleOnAddDriver() {
    setShowAddDriver(true)
  }

  function handleOnClose() {
    setShowAddDriver(false)
  }

  function handleOnCalendarClick(day, driver) {
    setAddTrip({ open: true, day, driverTurn: driver });
  }

  function handleOnCloseAddTrip() {
    setAddTrip({ open: false, day: null, driverTurn: null });
  }

  return (
    <div>
      {state.isLoading ? <div>Loading</div> : (
        <>
          <Calendar
            drivers={state.drivers}
            trips={state.trips}
            cycles={state.cycles}
            onClick={handleOnCalendarClick}
          />
          <h3>Drivers</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DriversList
              drivers={state.drivers}
            />
            <Fab onClick={handleOnAddDriver} color="primary" aria-label="add"><AddIcon /></Fab>
          </div>
          <BalanceGraph
            data={state.graphData}
            colorRange={state.colorRange}
            colorDomain={state.colorDomain}
          />
          <Modal
            open={showAddDriver}
            onClose={handleOnClose}
            aria-labelledby="Add Driver"
            aria-describedby="modal-description"
          >
            <div style={{ background: 'white' }}>
              <DriverForm group={group.key} order={state.drivers.length} />
            </div>
          </Modal>
          <Modal
            open={addTrip.open}
            onClose={handleOnCloseAddTrip}
            aria-labelledby="Add Trip Change"
            aria-describedby="modal-description"
          >
            <div style={{ background: 'white' }}>
              <AddTripChange
                group={group.key}
                drivers={state.drivers}
                day={addTrip.day}
                onCancel={handleOnCloseAddTrip}
                driverTurn={addTrip.driverTurn}
              />
            </div>
          </Modal>
        </>
     )}
    </div>
  );
}
