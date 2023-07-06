import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Test = () => {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState(null);
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState(0);
  const [language, setLanguage] = useState([]);
  const [flag, setFlag] = useState();

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((response) => {
          setCountry(response.data.name.common);
          setCapital(response.data.capital);
          setArea(response.data.area);
          setFlag(response.data.flags.png);
          const languages = response.data.languages
          setLanguage(Object.values(languages))
        });
    }
  }, [country]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCountry(value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <label>Enter Country</label>
        <input onChange={handleChange} placeholder="Enter country name" />
        <button type="submit">Submit</button>
      </form>
      <h2>{country}</h2>
      <p>{capital}</p>
      <p>Area {area}</p>

      <h2>Languages</h2>
      <ul>
        {language.map(lang => <li>{lang}</li>)}
      </ul>

      <img src={flag} alt="flag" />
    </div>
  );
};

export default Test;
