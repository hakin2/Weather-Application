import { useEffect, useState } from "react";

let apiKey = 'Api Key';


function App() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [bigData, setBigData] = useState({});
  const [bigData5, setBigData5] = useState({});

  useEffect(() => {
    async function fetchWeather() {
      // If no country is entered, do nothing
      if (!country) return;

      let locationQuery = city || country; // Default to country if no city

      try {

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${apiKey}&units=imperial`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        setBigData(weatherData);

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationQuery}&appid=${apiKey}&units=imperial`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setBigData5(forecastData);

      } catch (error) {
      }
    }

    fetchWeather();
  }, [country, city]);



  
  return (
    <div className="bodyy">
      <div className="earth-background">
        <video autoPlay loop muted playsInline>
            <source src="./video.mp4" type="video/mp4" />
        </video>
      </div>
      
        <div className="Title">
          <h1>Weather App</h1>
        </div>
      <div className="content2">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <label htmlFor='as'>Enter City</label>
          <input style={{ width: "100px" }} name="as" value={city} type="text" onChange={(e) => setCity(e.target.value)}>
          </input>

          <label htmlFor='ass'>Enter Country</label>
          <input style={{ width: "100px" }} name="ass" value={country} type="text" onChange={(e) => setCountry(e.target.value)}>
          </input>
        </div>
      </div>
      <div className="content">
        <div className="currentWeather">

          <h2>Current Weather</h2>
          <div>
            <p>City: {bigData.name ? bigData.name : 'No name found for these courdinates'}</p>
            <p>Country: {bigData.sys?.country ? bigData.sys.country : 'No country name found for these courdinates'}</p>
            <p>Temperture: {bigData.main?.temp ? bigData.main?.temp : 'Couldnt find the right temperture'}</p>

            <p>Description: {
              bigData?.weather?.length &&
                bigData?.weather[0]?.description ? bigData.weather[0]?.description : 'No description found here'}</p>
          </div>
        </div>

      <div className="content3">          
        <table style={{ border: "1px solid black" }}>

          <thead>
            <tr>
              <th style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>Days</th>
              <th style={{ borderBottom: "1px solid black" }}>Temp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>Day1</td>
              <td style={{ borderBottom: "1px solid black" }}>{bigData5?.list?.length && bigData5?.list[0]?.main?.temp || 0}</td>
            </tr>
          </tbody>
          <tbody>
            <tr >
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>Day2</td>
              <td style={{ borderBottom: "1px solid black" }} >{bigData5?.list?.length && bigData5?.list[1]?.main?.temp || 0}</td>
            </tr>
          </tbody> <tbody>
            <tr >
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>Day3</td>
              <td style={{ borderBottom: "1px solid black" }} >{bigData5?.list?.length && bigData5?.list[2]?.main?.temp || 0}</td>
            </tr>
          </tbody> <tbody>
            <tr >
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>Day4</td>
              <td style={{ borderBottom: "1px solid black" }} >{bigData5?.list?.length && bigData5?.list[3]?.main?.temp || 0}</td>
            </tr>
          </tbody> <tbody>
            <tr>
              <td style={{ borderRight: "1px solid black" }}>Day5</td>
              <td>{bigData5?.list?.length && bigData5?.list[4]?.main?.temp || 0}</td>
            </tr>
          </tbody>

        </table>
      </div>

      </div>
    </div>
  );
}

export default App;