/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { handleInitialData } from './actions/home';
import './App.css';
import { Search } from './components/Search';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <LoadingBar showFastActions />
      <div className="container">
        <h1>Crypto Vis</h1>
        <Search />
      </div>
    </React.Fragment>
  );
}

export default App;
