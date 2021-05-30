/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from './actions/home';
import './App.css';
import { Search } from './components/Search';
import { Currency } from './components/Currency';
import { Nav } from './components/Nav';
import { Bar } from 'react-chartjs-2';
import { About } from './components/About';
import { WatchList } from './components/WatchList';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coins === null);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <LoadingBar showFastActions />
      <div className="container">
        <Nav />
        {loading === true ? null : (
          <div>
            <Route path="/" exact>
              <Search />
            </Route>
            <Route path="/currency/:id" exact>
              <Currency />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/watchlist" exact>
              <WatchList />
            </Route>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
