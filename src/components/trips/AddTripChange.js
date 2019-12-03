import React from 'react';
import { DriversList } from 'Drivers';
import Button from '@material-ui/core/Button';
import api from 'api';

export default function AddTripChange({ group, drivers, day, onCancel, driverTurn }) {
  function onSubmit(d) {
    const trip = {
      day: day.toISOString(),
      driver: d.id,
      driverTurn: driverTurn.id,
    };

    api.groups.by(group).trips.post(trip)
      .then(() => {
          window.location.reload();
      });
  }

  return (
    <div>
      <div>Choose a driver for {day && day.format('ll')}</div>
      <DriversList
        drivers={drivers}
        onItemClick={onSubmit}
      />
      <Button
        color="primary"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  )
}