import React, {useState, useEffect} from 'react';
import TopButtons from "./components/TopButtons"
import Inputs from "./components/Inputs"
import TimeAndLocation from "./components/TimeAndLocation"
import TemperatureAndDetails from "./components/TemperatureAndDetails"
import Forecast from "./components/Forecast"
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const [ query, setQuery ] = useState({q: "Buenos Aires"});
  const [ units, setUnits ] = useState("metric");
  const [ weather, setWeather ] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
        const message = query.q ? query.q : "current location.";

        toast.info("Fetching weather for " + message)

        await getFormattedWeatherData({...query, units}).then(
            (data) => {

                toast.success(`Succesfully fetched for ${data.name}, ${data.country}.`)

                setWeather(data);
            });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if(!weather) return "from-cyan-700 to-blue-700"
    const threshold = units === "metric" ? 20 : 60
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700"

    return "from-yellow-700 to-orange-700"
  }

  return (
    <main className={`mx-auto max-w-screen-md mt-0 md:mt-4 py-5 px-4 md:px-32 md:rounded-md bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery={setQuery} />
        <Inputs  setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
            <section>
                <TimeAndLocation weather={weather} />
                <TemperatureAndDetails weather={weather} />
        
                <Forecast title="hourly forecast" items={weather.hourly} />
                <Forecast title="daily forecast" items={weather.daily} />
            </section>
        )}
        
        <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
    </main>
  );
}

export default App;