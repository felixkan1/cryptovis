export const historyOptions = {
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
    x: [
      {
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY',
          },
        },
        distribution: 'linear',
        title: {
          display: true,
          text: 'Date',
        },
      },
    ],
    y: [
      {
        title: {
          display: true,
          text: 'value',
        },
      },
    ],
  },
};
