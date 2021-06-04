/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getGoogleNews } from '../Utils/api';
export function GoogleNews({ feed }) {
  return (
    <div className="feed">
      {feed.map((newsArticle) => {
        return (
          <div key={newsArticle.link}>
            <p>
              <p>
                <i>{newsArticle.source}</i>
              </p>
              <a href={newsArticle.link}>{newsArticle.title}</a>
              <p>{newsArticle.time}</p>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export const MemoizedGoogleNews = React.memo(GoogleNews);
