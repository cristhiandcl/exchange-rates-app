import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Calendar from "./DatePicker";

// fetch Variables
let myHeaders = new Headers();
myHeaders.append("apikey", "CAbdWRinM7Ig8pkLOi82YsfhJ8X6Ev8f");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
//

function InputsExchange({ currencies }) {
  // Object to array of objects constant
  const refactorCurrencies = [];
  //

  // Selected currencie
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  //

  // rates object
  const [rates, setRates] = useState({});
  const [isRate, setIsRate] = useState(false);
  //

  // Refactor rates object
  for (let currencie in currencies) {
    refactorCurrencies.push({ id: currencie, name: currencies[currencie] });
  }
  //

  // fetch rates of selected currencies
  useEffect(() => {
    async function getData() {
      // faster render but limited only to USD currencie
      //   const response = await fetch(
      //     `https://openexchangerates.org/api/latest.json?app_id=05697fe41fe64f80ae56cf23e55495b4&base=${value1.id}`
      //   );
      //   const data = await response.json();
      //

      // Only 250 fetch attempts but it allows any currencie exchange rate
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/latest?base=${value1.id}`,
        requestOptions
      );
      const data = await response.json();
      //

      setRates(data.rates);
      setIsRate(true);
    }

    // render only when there is data on value1 (avoid error in first render due to null variable)
    value1 !== null && getData();
    //
  }, [value1]);
  //

  return (
    <div>
      <div className="border-2 p-4 flex space-x-2 justify-center">
        <Autocomplete
          id="Currencies"
          options={refactorCurrencies}
          renderInput={(params) => (
            <TextField {...params} label="Currencie 1" variant="outlined" />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          style={{ width: 270 }}
          value={value1}
          onChange={(_event, newCurrencie) => {
            setValue1(newCurrencie);
          }}
        />
        <Autocomplete
          id="Currencies"
          options={refactorCurrencies}
          renderInput={(params) => (
            <TextField {...params} label="Currencie 2" variant="outlined" />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          style={{ width: 270 }}
          value={value2}
          onChange={(_event, newCurrencie) => {
            setValue2(newCurrencie);
          }}
        />
      </div>

      {/* Display exchange rate  when isRate and value1 and value 2 !== null*/}
      {isRate && value1 !== null && value2 !== null && (
        <div>
          <p className="text-2xl font-bold text-center mt-4 text-green-600">
            1 {value1.name} = {rates[value2.id]} {value2.name}{" "}
          </p>
          <p className="text-xl text-center mt-8 font-bold w-2/4 mx-auto">
            Here you can find some historical exchange rates for the selected
            currencies, just pick a date
          </p>
          <Calendar
            requestOptions={requestOptions}
            value1={value1}
            value2={value2}
          />
        </div>
      )}
      {/**/}
    </div>
  );
}

export default InputsExchange;
