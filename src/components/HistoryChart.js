/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { historyOptions, formatData } from '../chartConfigs/chartConfigs';
export function HistoryChart({ coin, data, selected }) {
  const chartData = formatData(coin, data);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={historyOptions(selected)}
          height={400}
          width={600}
        />
      )}
    </div>
  );
}
