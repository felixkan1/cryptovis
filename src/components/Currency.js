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
  } else if (action.type === 'change time') {
    return {
      ...state,
      selected: action.selected,
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
    selected: 'day',
  });

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
          day: day.prices,
          week: week.prices,
          year: year.prices,
        },
        loading: false,
      });
    });
  }, []);

  const handleChangeTime = (time) => {
    dispatch({
      type: 'change time',
      selected: time,
    });
  };

  return (
    <React.Fragment>
      <h1>{coin}</h1>
      <div>
        <button
          className={`btn-clear ${state.selected === 'day' ? 'active' : ''}`}
          onClick={() => handleChangeTime('day')}
        >
          1D
        </button>
        <button
          className={`btn-clear ${state.selected === 'week' ? 'active' : ''}`}
          onClick={() => handleChangeTime('week')}
        >
          7D
        </button>
        <button
          className={`btn-clear ${state.selected === 'year' ? 'active' : ''}`}
          onClick={() => handleChangeTime('year')}
        >
          1Y
        </button>
        {state.loading && <Loading text="Loading Chart" />}
        {!state.loading && (
          <HistoryChart
            coin={coin}
            data={state.coinData[state.selected]}
            selected={state.selected}
          />
        )}
      </div>
    </React.Fragment>
  );
}
