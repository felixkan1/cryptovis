//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
export const getCoinInfo = (searchTerm) => {
  if(!searchTerm) return;
  return CoinGeckoClient.coins.fetch(searchTerm)
    .then(response => {
      if(response.success){
        console.log(response) 
      } else if(!response.success) {
        return Promise.reject('error 404')
      } else {
        return Promise.reject('some other reason')
      }
      
    })
    


};


