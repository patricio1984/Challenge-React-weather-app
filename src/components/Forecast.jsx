import React from 'react'
import { iconUrlFromCode, generateId } from '../services/weatherService'

const Forecast = ({title, items}) => {
  return (
    <>
        <div className="flex items-center justify-start mt-6">
            <p className="text-white font-medium uppercase">
                {title}
            </p>
        </div>
        <hr className="my-2" />

        <ul className="flex flex-row items-center justify-between text-white">
            {items.map((item) => (
                <li key={generateId()} className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">
                        {item.title}
                    </p>
                    <img 
                        src={iconUrlFromCode(item.icon)} 
                        alt={`${item.title} Weather icon`}
                        aria-hidden="true" 
                        className="w-12 my-1"
                        width="48"
                        height="48"                     
                    />
                    <p className="font-medium">{`${item.temp.toFixed()}º`}</p>
                </li>
            ))}
        </ul>
    </>
  )
}

export default Forecast