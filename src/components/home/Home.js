import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import api from 'api';
import './Home.css';

const keyFormat = (k) => k.replace(/ /g, '-').toLowerCase().trim();

export default function Home() {
  const [name, setName] = useState({ value: '', error: false });
  const history = useHistory();

  function onChange(e) {
    setName({ value: e.target.value, error: false})
  }

  function handleOnJoinClick(e) {
    e.preventDefault();
    const key = keyFormat(name.value);

    api.groups.by(key).get()
      .then(() => {
        history.push(key)
      })
      .catch(() => {
        setName({ ...name, error: true });
      });
  }

  return (
    <div className="Home">
        <TextField
          id="name"
          label="Group name"
          variant="outlined"
          value={name.value}
          onChange={onChange}
          error={name.error}
          helperText={name.error && 'Group not found.'}
        />
        <Button color="primary" variant="contained" onClick={handleOnJoinClick}>
          Join
        </Button>
        <div className="Separator">
          <span>or</span> 
        </div>
        <Button color="primary" variant="contained">
          <Link to="/create-group">Create group</Link>
        </Button>
    </div>
  )
}