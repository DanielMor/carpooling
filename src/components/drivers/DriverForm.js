import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import api from 'api';

export default function DriverForm({ group, order }) {
  const [state, setState] = useState({ name: '', order });

  function onSubmit(e) {
    e.preventDefault();

    api.groups.by(group).drivers.post(state)
      .then(() => {
          window.location.reload();
      });
  }

  const handleOnChange = key => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setState(prev => ({ ...prev, [key]: value }))
  }

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={state.name}
        onChange={handleOnChange('name')}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
      >
        Add Driver
      </Button>
    </form>
  )
}