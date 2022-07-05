import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ requestOptions, value1, value2, isRate }) {
  // Date, Historical rates and isCliked states
  const [startDate, setStartDate] = useState(new Date());
  const [historical, setHistorical] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
      setIsClicked(true);
      setIsLoaded(false);
    }
    //
    setIsLoaded(true);
    setIsClicked(false);
    getHistoricalRates();
  };
  //

  return (
    <div className="items-center">
      {value1.id !== value2.id && (
        <div className="">
          <p className="text-xl text-center mt-8 font-bold w-2/4 mx-auto">
            Here you can find some historical exchange rates for the selected
            currencies, just pick a date
          </p>
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
              disabled={value1 === null || value2 === null || isLoaded}
            >
              Search
            </button>
          </div>
        </div>
      )}
      {/* loading status*/}
      {isLoaded && isClicked === false && value1 !== null && value2 !== null && (
        <div className="flex justify-center mt-4">
          <ThreeDots
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
          />
        </div>
      )}
      {/**/}
      {/* display historical rates if isClicked and value1 an value2 !== null */}
      {isRate && isClicked && value1 !== null && value2 !== null && (
        <p className="text-2xl font-bold text-center mt-4 text-red-600">
          1 {value1.name} = {historical[value2.id]} {value2.name}{" "}
        </p>
      )}
      {/**/}
    </div>
  );
}

export default Calendar;
