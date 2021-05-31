/* eslint-disable */
export const formatData = (coin, time) => {
  const xValues = [];
  const yValues = [];

  time.map((ele) => {
    xValues.push(ele[0]);
    yValues.push(ele[1]);
  });

  return {
    labels: xValues,
    datasets: [
      {
        label: `${coin}`,
        data: yValues,
        backgroundColor: 'rgba(174,305,194,0.5)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };
};

const selectTimeFormat = (selected) => {
  if (selected === 'day') {
    return {
      unit: 'hour',
      tooltipFormat: 'MMM dd',
    };
  } else if (selected === 'week') {
    return {
      unit: 'day',
      tooltipFormat: 'MMM dd',
    };
  } else if (selected === 'year') {
    return {
      unit: 'month',
      tooltipFormat: 'MMM dd',
    };
  }
};

const numberWithCommas = (x) => {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const historyOptions = (selected) => {
  const timeFormat = selectTimeFormat(selected);

  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },

    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: 'time',
        distribution: 'linear',
        time: timeFormat,
        ticks: {
          callback: function (val, index) {
            return index % 2 === 0 ? val : '';
          },
        },
      },
      y: {
        ticks: {
          callback: function (val, index) {
            return '$' + numberWithCommas(val);
          },
        },
      },
    },
  };
};
