/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleWatch } from '../actions/watchList';
import { HistoryChart } from './HistoryChart';
import { getHistoriacalData, getCoinData } from '../Utils/api';
import Loading from './Loading';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

function coinReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      coinData: action.coinData,
      loading: action.loading,
      twitterName: action.twitterName,
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
    twitterName: '',
  });
  const watchList = useSelector((state) => state.watchList);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    Promise.all([
      getHistoriacalData(id, '1'),
      getHistoriacalData(id, '7'),
      getHistoriacalData(id, '365'),
      getCoinData(id),
    ]).then((data) => {
      const [day, week, year, coinData] = data;
      const { links } = coinData;
      console.log('hi', links.twitter_screen_name);
      dispatch({
        type: 'success',
        coinData: {
          day: day.prices,
          week: week.prices,
          year: year.prices,
        },
        loading: false,
        twitterName:
          links.twitter_screen_name === 'btc'
            ? 'bitcoin'
            : links.twitter_screen_name,
      });
    });
  }, []);

  const handleChangeTime = (time) => {
    dispatch({
      type: 'change time',
      selected: time,
    });
  };

  const handleWatch = (evt, id) => {
    evt.preventDefault();
    dispatchRedux(handleToggleWatch(id));
  };

  return (
    <div>
      <div className="title">
        <h1>{coin}</h1>
        <button
          className={`star-button ${watchList.includes(id)}`}
          onClick={(evt) => handleWatch(evt, id)}
        >
          {watchList.includes(id) ? <AiFillStar /> : <AiOutlineStar />}
        </button>
      </div>
      <div className="coin-info">
        <div className="coin-graph">
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
        {state.twitterName && (
          <div className="coin-social-feed">
            <p>Twitter</p>
            <a
              class="twitter-timeline"
              href={`https://twitter.com/${state.twitterName}?ref_src=twsrc%5Etfw`}
            >
              Tweets by {id}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
