import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar';
import { DriversList } from '../Drivers';
import { BalanceGraph } from '../BalanceGraph';
import { addTrip } from '../store/app/actions';
import './App.css';

class App extends Component {
  state = {
    modal: false,
    selectedDay: null,
  }

  render() {
    const {
      drivers,
      graphData,
      colorDomain,
      colorRange,
      trips,
      startOrder,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h2>Carpooling</h2>
        </header>

        <main className="App-container">
          <Calendar
            drivers={drivers}
            trips={trips}
            start={startOrder}
            onClick={this.openModal}
          />
          <h3>Drivers</h3>
          <DriversList
            drivers={drivers}
          />
          <BalanceGraph
            data={graphData}
            colorRange={colorRange}
            colorDomain={colorDomain}
         />
        </main>

        {this.state.modal && this.renderModal()}
      </div>
    );
  }

  renderModal() {
    const drivers = this.props.drivers;
    const selectedDay = this.state.selectedDay;

    return (
      <div className="Modal">
        <div className="Modal-container">
          <div>Choose a driver for {selectedDay && selectedDay.format('ll')}</div>
          <DriversList
            drivers={drivers}
            onItemClick={this.changeDriver}
          />
          <button
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  openModal = (day) => {
    this.setState({
      modal: true,
      selectedDay: day,
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
      selectedDay: null,
    })
  }

  changeDriver = (driver) => {
    const selectedDay = this.state.selectedDay;
    const day = selectedDay.format('YYYY-MM-DD');
    const diff = selectedDay.diff(this.props.startOrder, 'days');
    const driverOfWeek = Math.floor(diff / 7) % this.props.drivers.length;

    this.props.addTrip(day, driver.id, driverOfWeek);
    this.closeModal();
  }
}

function mapStateToProps(state) {
  const {
    drivers,
    trips,
    startOrder,
  } = state.app;

  const colorDomain = drivers.map((_, index) => index);
  const colorRange = drivers.map(d => d.colors[1]);
  const driversBalance = Object.keys(trips).reduce((balances, tKey) => {
    const t = trips[tKey];

    if (t.driverOfWeek === t.driverOfDay) {
      return balances;
    }

    if (!balances[t.driverOfDay]) {
      balances[t.driverOfDay] = 0;
    }

    balances[t.driverOfDay]++;

    if (!balances[t.driverOfWeek]) {
      balances[t.driverOfWeek] = 0;
    }

    balances[t.driverOfWeek]--;
    
    return balances;
  }, {});

  const graphData = drivers.map((d, index) => {
    return {
      y: index + 1,
      x: driversBalance[index] || 0,
      color: index,
    }
  });

  return {
    colorDomain,
    colorRange,
    graphData,
    drivers,
    trips,
    startOrder,
  }
}

export default connect(mapStateToProps, { addTrip })(App);
