/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { historyOptions, formatData } from '../chartConfigs/chartConfigs';
export function HistoryChart({ coin, data }) {
  const { day, week, year } = data;
  console.log('day', day);
  const chartData = formatData(coin, year);
  console.log('chart data', chartData);
  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={historyOptions}
          height={400}
          width={600}
        />
      )}
    </div>
  );
}
