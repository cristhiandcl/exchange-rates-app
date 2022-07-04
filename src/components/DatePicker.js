import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ requestOptions, value1, value2 }) {
  // Date, Historical rates and isCliked states
  const [startDate, setStartDate] = useState(new Date());
  const [historical, setHistorical] = useState({});
  const [isClicked, SetIsClicked] = useState(false);
  //

  // fecth every time search button is clicked
  const handleClick = () => {
    // Only 250 fetch attempts but it allows any currencie historical exchange rate
    async function getHistoricalRates() {
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/${`${startDate.getFullYear()}-${(
          "0" +
          (startDate.getMonth() + 1)
        ).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`}?base=${
          value1.id
        }`,
        requestOptions
      );
      const data = await response.json();
      setHistorical(data.rates);
    }
    //
    getHistoricalRates();
    SetIsClicked(true);
  };
  //

  return (
    <div className="items-center">
      <div className="flex justify-center space-x-4 my-4">
        <div className="border-2 p-2">
          <DatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <button
          className={`border-none rounded-md px-3 py-2 bg-green-900 text-white text-[1.2em] hover:scale-110 ${
            (value1 === null || value2 === null) &&
            "cursor-not-allowed opacity-50"
          }`}
          onClick={handleClick}
          disabled={value1 === null || value2 === null}
        >
          Search
        </button>
      </div>

      {/* display historical rates if isClicked and value1 an value2 !== null */}
      {isClicked && value1 !== null && value2 !== null && (
        <p className="text-2xl font-bold text-center mt-4 text-red-600">
          1 {value1.name} = {historical[value2.id]} {value2.name}{" "}
        </p>
      )}
      {/**/}

      <p className="text-red-900 w-2/4 mx-auto text-center mt-4 font-bold">
        Note: If you changed the currencie 1, Please click again the search
        button to refresh the historical rates
      </p>
    </div>
  );
}

export default Calendar;
