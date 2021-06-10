/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { RedditFeed } from './RedditFeed';

import { getRedditFeed } from '../Utils/api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const override = css`
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  left: 45%;
  top: 50%;
`;

function socialFeedReducer(state, action) {
  if (action.type === 'got reddit feed data') {
    return {
      ...state,
      subRedditFeed: action.subRedditFeed,
      redditLoading: false,
    };
  } else if (action.type === 'errer') {
    return {
      ...state,
    };
  } else {
    throw new Error('The action is not supported');
  }
}

export function SocialFeedTwo({ id, twitterName, subRedditUrl }) {
  const [state, dispatch] = useReducer(socialFeedReducer, {
    subRedditFeed: null,
    redditLoading: true,
  });
  useEffect(() => {
    let cancelRequest = false;
    if (subRedditUrl) {
      getRedditFeed(subRedditUrl).then((feed) => {
        if (cancelRequest) return;
        dispatch({
          type: 'got reddit feed data',
          subRedditFeed: feed,
        });
      });
    }
    return function cleanup() {
      cancelRequest = true;
    };
  }, [subRedditUrl]);

  return (
    <div className="row">
      {twitterName && (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={twitterName}
          options={{ height: 400 }}
        />
      )}

      <>
        <ScaleLoader
          color={'rgb(95,158,160)'}
          loading={state.redditLoading}
          css={override}
          size={150}
        />
        {state.subRedditFeed && (
          <RedditFeed feed={state.subRedditFeed} subRedditUrl={subRedditUrl} />
        )}
      </>
    </div>
  );
}
