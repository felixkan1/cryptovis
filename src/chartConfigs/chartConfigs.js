/* eslint-disable */
export const formatData = (coin, time) => {
  const xValues = [];
  const yValues = [];

  time.map((ele) => {
    xValues.push(ele[0]);
    yValues.push(ele[1]);
  });

  console.log('x,y', xValues, yValues);

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
      displayFormats: {
        quarter: 'MMM YYYY',
      },
    };
  } else if (selected === 'week') {
    return {
      displayFormats: {
        quarter: 'MMM YYYY',
      },
    };
  } else if (selected === 'year') {
    return {
      displayFormats: {
        quarter: 'MMM YYYY',
      },
    };
  }
};

export const historyOptions = (selected) => {
  const timeFormat = selectTimeFormat(selected);

  return {
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
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
  };
};
