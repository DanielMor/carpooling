import React from 'react';
import Layout from 'components/layout';
import Pages from 'components/router';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Layout>
        <Pages />
      </Layout>
    </Router>
  );
}
