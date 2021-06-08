/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getGoogleNews } from '../Utils/api';
export function GoogleNews({ feed }) {
  return (
    <div className="feed">
      {feed.map((newsArticle) => {
        return (
          <div className="google-post" key={newsArticle.link}>
            <div>
              <h5>
                <i>{newsArticle.source}</i>
              </h5>
              <a className="post-title" href={newsArticle.link}>
                {newsArticle.title}
              </a>
              <p className="post-info">{newsArticle.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const MemoizedGoogleNews = React.memo(GoogleNews);
