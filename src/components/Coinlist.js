import React, {Component} from 'react';

export class Coinlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: []
    }

  }

  render() {
    return(
      <ul className='coin-list'>
        <li>
          <div className='coin'>
          <div className='coin-meta-data'>
            <img alt='dogecoin' src='https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png'>
            </img>
            <span className='coin-name'>Dogecoin</span>
          </div>  
          <p className='coin-price'>Price</p>
          </div>
        </li>
      </ul>
    )
  }
}

