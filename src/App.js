import { useEffect, useState } from "react";
import InputsExchange from "./components/InputsExchange";
import "./App.css";

function App() {
  // Currencies
  const [currencies, setCurrencies] = useState([]);
  //

  // fecth currencies
  useEffect(() => {
    //unlimited fetch attempts
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((response) => response.json())
      .then((currencies) => setCurrencies(currencies));
    //

    // limited fetch attempts
    // fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => setCurrencies(result.symbols));
    // .catch((error) => console.log("error", error));
    //
  }, []);
  //

  return (
    <div className="border-4 border-green-600 flex justify-center items-center h-screen bg-gray-100">
      <div>
        <div className="flex flex-col items-center text-center">
          <p className="text-4xl font-bold text-green-600 mb-4">
            Exchange rate app
          </p>
          <p className="font-bold w-2/4 mb-4 text-xl">
            Pick up any pair of currencies and find out the latest exchange rate
            and historical exchange rates
          </p>
        </div>
        <InputsExchange currencies={currencies} />
      </div>
    </div>
  );
}

export default App;
