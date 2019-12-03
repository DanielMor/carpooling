import React from 'react';
import { Home, Group, CreateGroup } from './pages';
import {
  Switch,
  Route,
} from 'react-router-dom';

export default function Router() {
  return (
    <Switch>
      <Route path="/about">
        About
      </Route>
      <Route path="/create-group">
        <CreateGroup />
      </Route>
      <Route path="/:key">
        <Group />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}