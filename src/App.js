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
      try {
        getCoinInfo(this.state.searchTerm)
          .then(resp => console.log(resp))
      } catch(error) {
        console.log(error);
      }
       
    }
  }

  



  handleSearchChange(searchTerm) {
    this.setState({searchTerm});
    console.log(this.state.searchTerm)
  }

  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <h1>Crypto Vis</h1>
          <Search
            onSearchChange={this.handleSearchChange}
          />
        
        </div>
      </React.Fragment>
    )
  }
}

export default App;
