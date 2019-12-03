import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import moment from 'moment';
import api from 'api';

import './CreateGroupForm.css';

const keyFormat = (k) => k.replace(/ /g, '-').toLowerCase().trim();

export default function CreateGroupForm() {
  const [state, setState] = useState({ name: '', startDate: moment().format('YYYY-MM-DD') });
  const [errors, setErros] = useState({ name: '' });
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    const key = keyFormat(state.name);

    if (!key) {
      return setErros({ name: 'Required' });
    }

    api.groups.by(key).get()
      .then(() => {
        return setErros({ name: 'Name already taken' });
      })
      .catch(() => {
        return api.groups.post({ ...state, key })
          .then(data => {
            history.push(data.key);
          });
      });
  }

  const handleOnChange = key => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setState(prev => ({ ...prev, [key]: value }))
  }

  return (
    <form
      className="CreateGroupForm"
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
        error={errors.name}
        helperText={errors.name}
      />
      <TextField
        id="date"
        label="Start Date"
        type="date"
        value={state.startDate}
        variant="outlined"
        onChange={handleOnChange('startDate')}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
      >
        Create
      </Button>
    </form>
  )
}