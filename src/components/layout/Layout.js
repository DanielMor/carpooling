import React from 'react';
import Header from '../header';
import './Layout.css';

export default ({ children }) => (
  <div className="Layout">
    <Header />
    <main className="Container">
      {children}
    </main>
  </div>
);
