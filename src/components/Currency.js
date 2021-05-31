/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleWatch } from '../actions/watchList';
import { HistoryChart } from './HistoryChart';
import { getHistoriacalData, getCoinData, getRedditFeed } from '../Utils/api';
import Loading from './Loading';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { RedditFeed } from './RedditFeed';
function coinReducer(state, action) {
  if (action.type === 'initial data') {
    return {
      ...state,
      coinData: action.coinData,
      loading: action.loading,
      twitterName: action.twitterName,
      subRedditUrl: action.subRedditUrl,
    };
  } else if (action.type === 'change time') {
    return {
      ...state,
      selected: action.selected,
    };
  } else if (action.type === 'got reddit feed') {
    return {
      ...state,
      subRedditFeed: action.subRedditFeed,
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
    subRedditUrl: '',
    subRedditFeed: null,
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
      dispatch({
        type: 'initial data',
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
        subRedditUrl: links.subreddit_url,
      });
    });
  }, []);

  useEffect(() => {
    if (state.subRedditUrl) {
      getRedditFeed(state.subRedditUrl).then((feed) => {
        dispatch({
          type: 'got reddit feed',
          subRedditFeed: feed,
        });
      });
    }
  }, [state.subRedditUrl]);

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

        <div className="coin-social-feed">
          {state.twitterName && (
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName={state.twitterName}
              options={{ height: 400 }}
            />
          )}
          {state.subRedditFeed && <RedditFeed feed={state.subRedditFeed} />}
        </div>
      </div>
    </div>
  );
}
