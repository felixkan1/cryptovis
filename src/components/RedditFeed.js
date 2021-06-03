/* eslint-disable */
import React, { useEffect } from 'react';

export function RedditFeed({ feed, subRedditUrl }) {
  let path = new URL(subRedditUrl).pathname;
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }
  const {
    data: { children },
  } = feed;
  console.log(feed);

  return (
    <div className="reddit-feed">
      <h5>
        links from <a href={subRedditUrl}>{path}</a>
      </h5>
      {children.map((post) => {
        const {
          data: { title, permalink, ups, num_comments },
        } = post;
        return (
          <div key={permalink}>
            <p>
              <a href={`//reddit.com${permalink}`}>{title}</a>
            </p>
            <div>
              <span>
                {ups} points | {num_comments} comments
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
