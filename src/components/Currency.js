/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HistoryChart } from './HistoryChart';
import { getHistoriacalData } from '../Utils/api';
import Loading from './Loading';

function coinReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      coinData: action.coinData,
      loading: action.loading,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
    };
  } else {
    throw new Error('The action is not supported');
  }
}

export function Currency() {
  const { id } = useParams();
  const coin = id.charAt(0).toUpperCase() + id.slice(1);
  const [state, dispatch] = useReducer(coinReducer, {
    coinData: {},
    loading: true,
  });

  //takes in prices array [time, price]
  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0].toString(),
        y: el[1],
      };
    });
  };

  useEffect(() => {
    Promise.all([
      getHistoriacalData(id, '1'),
      getHistoriacalData(id, '7'),
      getHistoriacalData(id, '365'),
    ]).then((prices) => {
      const [day, week, year] = prices;
      console.log('day', day);
      dispatch({
        type: 'success',
        coinData: {
          day: formatData(day.prices),
          week: formatData(week.prices),
          year: formatData(year.prices),
        },
        loading: false,
      });
    });
  }, []);
  console.log('coin data', state.coinData);
  return (
    <React.Fragment>
      <h1>{coin}</h1>
      {state.loading && <Loading text="Loading Chart" />}
      {!state.loading && (
        <HistoryChart coin={coin} data={state.coinData.year} />
      )}
    </React.Fragment>
  );
}
