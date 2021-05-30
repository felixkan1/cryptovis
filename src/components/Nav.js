/* eslint-disable */

import React from 'react';
import { NavLink } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <NavLink to="/" exact activeClassName="chosen">
        Home
      </NavLink>
      <NavLink to="/about" exact activeClassName="chosen">
        About
      </NavLink>
      <NavLink to="/watchlist" exact activeClassName="chosen">
        Watch List
      </NavLink>
    </nav>
  );
}
