import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { DataContext } from './Data/DataContext';

export default function Timer({ center }) {
  const { tasks, jobs } = React.useContext(DataContext);
  const [hour, sethour] = useState(moment().format('H'))
  const [minute, setminute] = useState(moment().format('mm'))
  const [second, setsecond] = useState(moment().format('ss'))

  const updateTime = () => {
    setTimeout(() => {
      sethour(moment().format('H'))
      setminute(moment().format('mm'))
      setsecond(moment().format('ss'))
      updateTime()
    }, 100);
  }

  useEffect(() => {
    updateTime()
  }, [])

  return (
    <div className={`text-center flex items-center justify-center ${!center && (tasks.length > 0 || jobs.length > 0) ? 'mt-5' : 'mt-10 lg:mt-[14vw]'} transition-all duration-1000`}>
      <p className='font-extrabold text-7xl md:text-[12vw] text-slate-900 dark:text-gray-200 transition-all duration-300 ease-in-out'>
        {hour}:{minute}
        <span className='text-gray-400'>
          :
          {second}
        </span>
      </p>
    </div>
  )
}