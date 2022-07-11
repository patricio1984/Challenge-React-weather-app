import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

const TimeAndLocation = ({weather: {dt, timezone, name, country}}) => {
  return (
    <>
        <div className="flex items-center justify-center my-6">
            <p className="text-white text-base md:text-xl font-extralight">
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>

        <div className="flex items-center justify-center my-3">
            <h1 className="text-white text-3xl font-medium">
                {`${name}, ${country}`}
            </h1>
        </div>
    </>
  )
}

export default TimeAndLocation