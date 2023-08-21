import { Fragment, useState } from "react";

function App() {
  // pending, loading, success, error
  const [fetchAllCountryState, setFetchAllCountryState] = useState("pending");
  const [fetchedData, setFetchedData] = useState(undefined);

  const handleFetchData = () => {
    setFetchAllCountryState("loading");
    fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFetchedData(data);
        setFetchAllCountryState("success");
      })
      .catch((error) => {
        console.log(error);
        setFetchAllCountryState("error");
      });
  };

  return (
    <div className="w-screen min-h-screen flex justify-center p-4">
      <div className="container space-y-4">
        <h1 className="text-2xl font-bold">Countries of the world</h1>
        <div className="space-y-4">
          <button
            className="w-fit bg-blue-700 text-white p-2 text-center hover:bg-blue-800"
            onClick={handleFetchData}
          >
            Fetch countries
          </button>
          {fetchAllCountryState === "loading" && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 animate-spin text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          )}
          {fetchAllCountryState === "success" &&
            fetchedData &&
            Array.isArray(fetchedData) && (
              <div className="grid grid-cols-3 gap-y-2">
                {fetchedData.map((country, index) => (
                  <Row country={country} index={index} key={index} />
                ))}
              </div>
            )}
          {fetchAllCountryState === "error" && (
            <p className="text-red-600">Oh no! Error happened! 😢</p>
          )}
        </div>
      </div>
    </div>
  );
}

const Row = ({ country, index }) => {
  const [fetchCountryState, setFetchCountryState] = useState("pending");
  const [fetchedData, setFetchData] = useState(undefined);
  const handleKnowMore = (country) => {
    // console log country name
    console.log(country);
    setFetchCountryState("loading");
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((data) => {
        const [country] = data;
        console.log(country);
        setFetchData(country);
        setFetchCountryState("success");
      })
      .catch((error) => {
        setFetchCountryState("error");
      });
  };

  return (
    <>
      {fetchCountryState === "success" && fetchedData && (
        <CountryCard
          setFetchCountryState={setFetchCountryState}
          countryData={fetchedData}
        />
      )}
      <span>{index + 1}</span>
      <span>{country.name}</span>
      <button
        className="ml-4 border border-blue-700 p-1 rounded"
        onClick={() => handleKnowMore(country.name)}
      >
        {fetchCountryState === "loading" ? "Fetching" : "More info"}
      </button>
    </>
  );
};

const CountryCard = ({ countryData, setFetchCountryState }) => {
  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-blue-200/50 backdrop-blur-sm">
      <div className="bg-white w-[600px] p-2 border border-gray-200 space-y-2">
        <div className="flex justify-between">
          <span>{countryData?.name?.common}</span>
          <span
            className="underline text-blue-400 cursor-pointer"
            onClick={() => setFetchCountryState("pending")}
          >
            close
          </span>
        </div>
        <img
          className="w-full"
          src={countryData?.flags?.png}
          alt={`Flag of ${countryData?.flags?.alt}`}
        />
      </div>
    </div>
  );
};

export default App;
