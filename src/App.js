import React, {Component} from 'react';
import './App.css';
import {Search} from './components/Search';
import {getCoinInfo} from './Utils/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      coin: '',
      theme: 'light'
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.searchTerm !== prevState.searchTerm) {
      getCoinInfo(this.state.searchTerm);
    }
  }

  



  handleSearchChange(searchTerm) {
    this.setState({searchTerm});
    console.log(this.state.searchTerm)
  }

  render() {
    return (
      <Search
        onSearchChange={this.handleSearchChange}
      />
    )
  }
}

export default App;
