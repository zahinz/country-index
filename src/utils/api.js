import axios from "axios";
// export const getAllCountryData = async () => {
//   return fetch(
//     "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
//   )
//     .then((res) => res.json())
//     .then((data) => data);
// };

// export const getCountryData = async (country) => {
//   return fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((res) => res.json())
//     .then((data) => {
//       const [countryData] = data;
//       return countryData;
//     });
// };

export const getAllCountryData = async () => {
  return axios
    .get(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
    .then((res) => res.data);
};

export const getCountryData = async (country) => {
  return axios
    .get(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => {
      const [countryData] = res.data;
      return countryData;
    });
};
