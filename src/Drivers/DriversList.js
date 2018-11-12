import React, { Component } from 'react';
import './DriversList.css';

export class DriversList extends Component {
  render() {
    const {
      drivers,
      onItemClick,
    } = this.props;

    return (
      <div className="DriversList">
        {drivers.map(d => (
          <Driver
            key={d.name}
            {...d} 
            onClick={onItemClick && onItemClick.bind(null, d)}
          />
        ))}
      </div>
    );
  }
}

const Driver = ({ colors, name, onClick }) => {
  return (
    <div
      className="Driver-photo"
      onClick={onClick}
      style={{ background: colors[1], borderColor: colors[0] }}
    >
      <span>{name[0]}</span>
    </div>
  );
}