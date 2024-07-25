import { useState, useEffect } from "react"

function App() {
  const [loading, setLoading] = useState(true);
  const [cash, setCash] = useState(0);
  const [cntCoin, setCntCoin] = useState(0);
  const [coin, setCoin] = useState({});
  const [coins, setCoins] = useState([]);
  useEffect(() =>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then((json => {
      setCoins(json);
      setLoading(false);
      setCoin(json[0]);
    }))
  }, []);

  const cal = () => {
    setCntCoin(cash/coin.quotes.USD.price)
  }

  const onChange = (event) => {
    setCash(event.target.value)
    cal();
  };

  const onSelectChange = (event) => {
    setCoin(coins.find(obj => obj.id === event.target.value));
    cal();
  };

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading....</strong>
       ) : ( 
         <select onChange={onSelectChange}>
            {coins.map((coin) => ( 
              <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD value={coin.id}</option>
            ))};
        </select>
    )}
    <hr/> 
    <div>
      <input 
        type="number"
        value={cash}
        placeholder="input your cash.."
        onChange={onChange}/> USD
    </div>
    <p>구매 가능 코인 : {cntCoin}개</p>
    </div>
  );
}

export default App;
