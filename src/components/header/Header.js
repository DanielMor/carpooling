import React from 'react';
import Navbar from '../navbar';
import { useHistory } from "react-router-dom";
import './Header.css';

export default function Header() {
  const history = useHistory();
  const hash = window.location.hash;

  function CloseMenu() {
    history.goBack()
  } 

  return (
    <header className="Header">
      <div className="Title">
        <span>Carpooling</span>
      </div>
      {hash ? (
        <button onClick={CloseMenu}>X</button>
        ) : (
        <a href="#Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
        </a>
      )}
      <Navbar />
    </header>
  );
}
