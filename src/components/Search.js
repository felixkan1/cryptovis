import React, {Component} from 'react';

//incorporate typing suggestion: https://webdevtrick.com/javascript-typing-suggestions/

export class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const searchTerm = evt.target.value;
    this.props.onSearchChange(searchTerm);
  }


  render() {
    return (
      <div className='search-container'>
        <div className='search-bar'>
        <img src="https://img.icons8.com/android/24/000000/search.png" alt=""/>
                <input
                  type='text'
                  id='searchTerm'
                  className={`search-bar`}
                  placeholder='ie. doge'
                  autoComplete='off'
                  value={this.props.searchTerm}
                  onChange={this.handleChange}
                />
        </div>
      </div>

    )
  }



}