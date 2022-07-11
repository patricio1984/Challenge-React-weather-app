import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons"
import { toast } from 'react-toastify';

const Inputs = ({setQuery, units, setUnits}) => {
  
  const [city, setCity ] = useState("");

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city}) 
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.")  
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!")
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    
    if (units !== selectedUnit) setUnits(selectedUnit);

  }
  
  return (
    <section className="flex flex-col md:flex-row justify-center my-6">
        <div className="w-full md:w-3/4 items-center justify-center">
            <label htmlFor="city" aria-hidden="true" className="hidden">Search for city</label>

            <input
                value={city}
                id="city"
                onChange={(e) => setCity(e.currentTarget.value)}
                onClick={handleSearchClick} 
                type="text" 
                placeholder="Search for city..."
                className="text-xl font-light p-2 w-full shadow-xl capitalize rounded-md placeholder:lowercase" 
            />
        </div>
        <div className="flex w-full md:w-1/4 items-center justify-center md:ml-5 mt-4 md:mt-0">
            <UilSearch 
                size={25} 
                className="text-white cursor-pointer transition ease-out hover:scale-125 mr-3"
                onClick={handleSearchClick}
            />
            <UilLocationPoint 
                size={25} 
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleLocationClick}         
            />

            <button 
                name="metric" 
                className="text-xl text-white font-light ml-4 transition ease-out hover:scale-125"
                onClick={handleUnitsChange}
                >ºC
            </button>
            <p className="text-white text-xl mx-1">|</p>
            <button 
                name="imperial" 
                className="text-xl text-white font-light transition ease-out hover:scale-125"
                onClick={handleUnitsChange}
                >ºF
            </button>
        </div>
    </section>
  )
}

export default Inputs