/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleWatch } from '../actions/watchList';
import { MemoizedHistoryChart } from './HistoryChart';
import { getHistoriacalData, getCoinData, getRedditFeed } from '../Utils/api';
import Loading from './Loading';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { RedditFeed } from './RedditFeed';
import { GoogleNews } from './GoogleNews';

function coinReducer(state, action) {
  if (action.type === 'initial data') {
    return {
      ...state,
      coinData: action.coinData,
      price: action.price,
      priceChange: action.priceChange,
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
    price: null,
    loading: true,
    selected: 'day',
    twitterName: '',
    subRedditUrl: '',
    subRedditFeed: null,
  });
  const [socialFeed, setSocialFeed] = useState('twitter');
  const watchList = useSelector((state) => state.watchList);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    Promise.all([
      getHistoriacalData(id, '1'),
      getHistoriacalData(id, '7'),
      getHistoriacalData(id, '30'),
      getHistoriacalData(id, '365'),
      getCoinData(id),
    ]).then((data) => {
      const [day, week, month, year, coinData] = data;
      const {
        links,
        market_data: {
          current_price: { usd },
          price_change_percentage_24h,
        },
      } = coinData;
      console.log(coinData);
      dispatch({
        type: 'initial data',
        coinData: {
          day: day.prices,
          week: week.prices,
          month: month.prices,
          year: year.prices,
        },
        price: usd,
        priceChange: price_change_percentage_24h,
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

  const handleChangeSocialFeed = (id) => {
    setSocialFeed(id);
  };

  return (
    <div>
      <div className="title">
        <div className="coin-name">
          <h1>{coin}</h1>
          <button
            className={`star-button ${watchList.includes(id)}`}
            onClick={(evt) => handleWatch(evt, id)}
          >
            {watchList.includes(id) ? <AiFillStar /> : <AiOutlineStar />}
          </button>
        </div>
        <div>
          <h2>
            {state.price && `$${numberWithCommas(state.price)}`}&nbsp;&nbsp;
            <span style={{ color: state.priceChange < 0 ? 'red' : 'green' }}>
              {state.priceChange && `${state.priceChange.toFixed(2)}%`}
            </span>
          </h2>
        </div>
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
            className={`btn-clear ${
              state.selected === 'month' ? 'active' : ''
            }`}
            onClick={() => handleChangeTime('month')}
          >
            1M
          </button>
          <button
            className={`btn-clear ${state.selected === 'year' ? 'active' : ''}`}
            onClick={() => handleChangeTime('year')}
          >
            1Y
          </button>
          {state.loading && <Loading text="Loading Chart" />}
          {!state.loading && (
            // Memoize
            <MemoizedHistoryChart
              coin={coin}
              data={state.coinData[state.selected]}
              selected={state.selected}
            />
          )}
        </div>

        <div className="coin-social-feed">
          <div className="social-display">
            <div>Social Feed</div>
            <button
              onClick={() => handleChangeSocialFeed('twitter')}
              className={`btn-clear ${
                socialFeed === 'twitter' ? 'active' : ''
              }`}
            >
              Twitter
            </button>
            <button
              onClick={() => handleChangeSocialFeed('reddit')}
              className={`btn-clear ${socialFeed === 'reddit' ? 'active' : ''}`}
            >
              Reddit
            </button>
            <button
              onClick={() => handleChangeSocialFeed('google')}
              className={`btn-clear ${socialFeed === 'google' ? 'active' : ''}`}
            >
              Google News
            </button>
          </div>
          {state.twitterName && socialFeed === 'twitter' && (
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName={state.twitterName}
              options={{ height: 400 }}
            />
          )}
          {state.subRedditFeed && socialFeed === 'reddit' && (
            <RedditFeed
              feed={state.subRedditFeed}
              subRedditUrl={state.subRedditUrl}
            />
          )}
          {state.subRedditFeed && socialFeed === 'google' && <GoogleNews />}
        </div>
      </div>
    </div>
  );
}

function numberWithCommas(x) {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
