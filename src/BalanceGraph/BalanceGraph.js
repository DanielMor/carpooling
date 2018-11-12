import React, { Component } from 'react';
import {
  XYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalBarSeries,
} from 'react-vis';

import 'react-vis/dist/style.css';
import './BalanceGraph.css';

export class BalanceGraph extends Component {
  render() {
    const {
      data,
      colorDomain,
      colorRange,
    } = this.props;

    return (
      <div className="BalanceGraph">
        <XYPlot
          width={300}
          height={150}
          colorDomain={colorDomain}
          colorRange={colorRange}
        >
          <VerticalGridLines />
          <HorizontalBarSeries data={data} />
          <XAxis title="Balance" />
        </XYPlot>
      </div>
    );
  }
}
