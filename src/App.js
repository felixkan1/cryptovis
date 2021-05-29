/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from './actions/home';
import './App.css';
import { Search } from './components/Search';
import { Currency } from './components/Currency';
import { Bar } from 'react-chartjs-2';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coins === null);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <LoadingBar showFastActions />
      {loading === true ? null : (
        <div className="container">
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/currency/:id" exact>
            <Currency />
          </Route>
        </div>
      )}
    </Router>
  );
}

export default App;
