/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { historyOptions } from '../chartConfigs/chartConfigs';
export function HistoryChart({ data, coin }) {
  console.log('data:', data);
  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              label: `${coin}`,
              data: data,
              backgroundColor: 'rgba(174,305,194,0.5)',
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        }}
        options={historyOptions}
        height={400}
        width={600}
      />
    </div>
  );
}
